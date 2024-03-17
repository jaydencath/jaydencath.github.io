// Fetch repository languages for myself
// I added my token in a header for my first commit to allow higher rate limits but Github flagged me so I removed them to allow my code to work on Github.
function getRepos() {
    // This is used to get my own repositories
    const apiURL = "https://api.github.com/users/jaydencath/repos";

    fetch(apiURL)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Not Found");
            }
            return response.json();
        })
        .then((repoData) => {
            const repoList = document.getElementById('repos');
            // Make sure the ul is empty by clearing it.
            repoList.innerHTML = "";

            repoData.forEach(repo => {
                // Fetch the languages from my repositories.
                fetch("https://api.github.com/repos/jaydencath/" + repo.name + "/languages")
                    
                    .then(response => {
                        if (!response.ok) {
                            throw new Error("Error loading languages");
                        }
                        return response.json();
                    })
                    .then(languages => {
                        // Gather the language object array and join them together in a string then separate with commas.
                        const languagesArray = Object.keys(languages);
                        const languageSplit = languagesArray.join(", ");
                        // Create the link to the repo.
                        const repoL = document.createElement('a');
                        repoL.href = repo.html_url;
                        repoL.textContent = repo.name;

                        // Make a div for the commits
                        const divCom = document.createElement('div');
                        divCom.id = "commits";

                        fetch("https://api.github.com/repos/jaydencath/" + repo.name + "/commits")
                            .then(response => response.json())
                            .then(commits => {

                                // Get total number of commits
                                const totalCommits = commits.length;
                                divCom.textContent = "Commits: " + totalCommits;

                                // Create the list item to display the repositories within the ul.
                                const list = document.createElement('li');
                                list.innerHTML = '<i class = "fa fa-github" style = "font-size:36px"></i>' + "&nbsp &nbsp" +
                                    repoL.outerHTML + "<br><br>" + repo.description + "<br><br>" + "Created: " + new Date(repo.created_at).toLocaleDateString() +
                                    "<br>" + "Updated: " + new Date(repo.updated_at).toLocaleDateString() + divCom.outerHTML +
                                    "Languages: " + languageSplit + "<br>Watchers: " + repo.watchers_count;
                                // Append the list item to repository list
                                repoList.appendChild(list);

                            })
                            .catch((error) => {
                                console.error("Error:", error);
                            });
                    })
                    .catch((error) => {
                        console.error("Error:", error);
                    });
            });
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}
getRepos();

// Search function for searching other users repositories
function search(e) {
    // Clear the list of repos
    document.getElementById('repos').innerHTML = "";
    // Get user's username from search box
    const user = document.getElementById('gitbox').value;
    const apiURL = 'https://api.github.com/users/' + user + '/repos';
    fetch(apiURL)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Not Found");
            }
            return response.json();
        })
        .then((repoData) => {
            const repoList = document.getElementById('repos');
            repoList.innerHTML = "";

            repoData.forEach(repo => {
                // Fetch the languages from my repositories.
                fetch("https://api.github.com/repos/" + user + "/" + repo.name + "/languages")
                    
                    .then(response => {
                        if (!response.ok) {
                            throw new Error("Error loading languages");
                        }
                        return response.json();
                    })
                    .then(languages => {
                        // Gather the language object array and join them together in a string then separate with commas.
                        const languagesArray = Object.keys(languages);
                        const languageSplit = languagesArray.join(", ");

                        // Create the link to the repo.
                        const repoL = document.createElement('a');
                        repoL.href = repo.html_url;
                        repoL.textContent = repo.name;
                        // Make a div for the commits
                        const divCom = document.createElement('div');
                        divCom.id = "commits";
                        fetch("https://api.github.com/repos/" + user + "/" + repo.name + "/commits")
                        
                            .then(response => response.json())
                            .then(commits => {
                                // Get total number of commits
                                const totalCommits = commits.length;
                                divCom.textContent = "Commits: " + totalCommits;

                                // Create the list item to display the repositories within the ul.
                                const list = document.createElement('li');
                                list.innerHTML = '<i class = "fa fa-github" style = "font-size:36px"></i>' + "&nbsp &nbsp" +
                                    repoL.outerHTML + "<br><br>" + repo.description + "<br>" + 
                                    "Created: " + new Date(repo.created_at).toLocaleDateString() +"<br>" + 
                                    "Updated: " + new Date(repo.updated_at).toLocaleDateString() + divCom.outerHTML +
                                    "Languages: " + languageSplit + "<br>Watchers: " + repo.watchers_count;
                                // Append the list item to repository list
                                repoList.appendChild(list);

                            })
                            .catch((error) => {
                                console.error("Error:", error);
                            });
                    })
                    .catch((error) => {
                        console.error("Error:", error);
                    });
            });
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}
search();

// Add event listener to search button
window.onload = function () {
    document.getElementById('searcher').addEventListener('submit', search);
}
