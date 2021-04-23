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
                        <p>${
                          post.content
                        }<br> <span class="date">- ${formatDate(
        dateObj
      )}</span> 
                        </p>
                        
                        <div>
                             <a href="update-pun.html?id=${
                               post["_id"]
                             }">Update</a> |
                             <a href="#" class="delete-link" data-id="${
                               post["_id"]
                             }">Delete</a> 
                        </div>
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
