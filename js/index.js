document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("search-form");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const searchInput = document.getElementById("search").value;
      searchGitHubUsers(searchInput);
    });
  });
  
  function searchGitHubUsers(query) {
    fetch(`https://api.github.com/search/users?q=${query}`, {
      headers: {
        "Accept": "application/vnd.github.v3+json"
      }
    })
    .then(response => response.json())
    .then(data => displayUsers(data.items))
    .catch(error => console.error('Error:', error));
  }
  
  function displayUsers(users) {
    const userList = document.getElementById("user-list");
    userList.innerHTML = "";
    users.forEach(user => {
      const userDiv = document.createElement("div");
      userDiv.innerHTML = `
        <img src="${user.avatar_url}" alt="${user.login}" width="50" height="50">
        <a href="${user.html_url}" target="_blank">${user.login}</a>
        <button data-username="${user.login}">Show Repos</button>
      `;
      userDiv.querySelector("button").addEventListener("click", () => {
        fetchUserRepos(user.login);
      });
      userList.appendChild(userDiv);
    });
  }
  
  function fetchUserRepos(username) {
    fetch(`https://api.github.com/users/${username}/repos`, {
      headers: {
        "Accept": "application/vnd.github.v3+json"
      }
    })
    .then(response => response.json())
    .then(data => displayRepos(data))
    .catch(error => console.error('Error:', error));
  }
  
  function displayRepos(repos) {
    const reposList = document.getElementById("repos-list");
    reposList.innerHTML = `<h2>Repositories</h2>`;
    repos.forEach(repo => {
      const repoDiv = document.createElement("div");
      repoDiv.innerHTML = `
        <a href="${repo.html_url}" target="_blank">${repo.name}</a>
        <p>${repo.description || "No description available"}</p>
      `;
      reposList.appendChild(repoDiv);
    });
  }
  