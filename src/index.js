import "./styles.css";

async function getData(url) {
  let data = await fetch(url);
  let json = await data.json();
  return json;
}

function createElementRepoList(repoData) {
  const ulList = document.createElement("ul");
  if (Array.isArray(repoData)) {
    repoData.forEach(repoItem => {
      const listItem = document.createElement("li");
      const listItemTextNode = document.createTextNode(repoItem.name);

      listItem.appendChild(listItemTextNode);
      ulList.appendChild(listItem);
    });
    document.querySelector("#app").appendChild(ulList);
  } else {
    return;
  }
}

function createProfilePicture(profileData) {
  if (profileData.avatar_url && profileData.name) {
    const heading = document.createElement("h1");
    const headingTextNode = document.createTextNode(
      `Github profile: ${profileData.name}`
    );
    heading.appendChild(headingTextNode);
    document.querySelector("#app").appendChild(heading);

    let image = document.createElement("img");
    image.src = profileData.avatar_url;
    image.width = 100;
    document.querySelector("#app").appendChild(image);
  } else {
    return;
  }
}

getData("https://api.github.com/users/raymonschouwenaar").then(data => {
  createProfilePicture(data);
});

getData("https://api.github.com/users/raymonschouwenaar/repos").then(data => {
  createElementRepoList(data);
});
