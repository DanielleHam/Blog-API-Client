window.onload = function () {
  fetchAllPosts();
};

async function fetchAllPosts() {
  try {
    const response = await fetch("http://localhost:5000/posts");
    const posts = await response.json();
    console.log(posts);

    let postsHTML = "";
    for (let post of posts) {
      let dateObj = new Date(post.date);

      postsHTML += `
                   <li class="list-group-item">
                        <h3> ${post.title}</h3>
                        <p> ${post.author} | <span class="date"> ${formatDate(dateObj)}</span></p>                     
                        <p> ${post.content}</p>
                   </li>
              `;
    }

    document.getElementById("post-list").innerHTML = postsHTML;
  } catch (error) {
    console.log(error);
  }
}

function formatDate(dateObj) {
  return `${dateObj.getFullYear()}-${dateObj.getMonth()}-${dateObj.getDate()} ${dateObj.getHours()}:${dateObj.getMinutes()}`;
}
