window.onload = function () {
  fetchAllPosts();
};

async function fetchAllPosts() {
  try {
    const response = await fetch("http://localhost:5000/posts/");
    const posts = await response.json();
    console.log(posts);

    let postsHTML = "";
    for (let post of posts) {
      let dateObj = new Date(post.date);

      postsHTML += `
                   <tr class="">
                        <th scope="row">${post.title} </th>
                        <td>${post.author}</td>
                        <td> <span class="date"> ${formatDate(
                          dateObj
                        )}</span> </td>
                        <td>${post.tags}</td>
                        <td>
                              <button class="btn btn-warning btnJSclass"><a href="update-post.html?id=${
                                post["_id"]
                              }">Update</a></button>
                              <button class="btn btn-danger btnJSclass"><a href="#" class="delete-link" data-id="${
                                post["_id"]
                              }">Delete</a></button>
                              
                        </td>
                   </tr>
                   
              `;
    }
    document.getElementById("admin-posts").innerHTML = postsHTML;
  } catch (error) {
    console.log(error);
  }
  deletePostEvent();
}

function formatDate(dateObj) {
  return `${dateObj.getFullYear()}-${dateObj.getMonth()}-${dateObj.getDate()} ${dateObj.getHours()}:${dateObj.getMinutes()}`;
}

function deletePostEvent() {
  let deletePostLinks = document.getElementsByClassName("delete-link");

  for (deleteLink of deletePostLinks) {
    deleteLink.addEventListener("click", async function (e) {
      e.preventDefault();

      let theClickedLink = e.target;
      let postId = theClickedLink.dataset.id;
      console.log(postId);

      try {
        await fetch("http://localhost:5000/posts/" + postId, {
          method: "DELETE",
        });

        theClickedLink.parentNode.parentNode.remove();
        window.location.replace("./index.html");
      } catch (error) {
        console.log(error);
      }
    });
  }
}
