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
      let content = post.content;
      let hundred = content.substring(0, 100);

      postsHTML += `
                   <li class="list-group-item">
                    <h3> ${post.title}</h3>
                    <p> ${post.author} | <span class="date"> ${formatDate(
        dateObj
      )}</span></p>
                    <p><strong>Tags: </strong>${
                      post.tags
                    }</p>                    
                    <p> ${hundred}...</p>
            
                    <div class="d-flex justify-content-end">
                      <button class="btn btn-success"><a href="post.html?id=${
                        post["_id"]
                      }" "data-id="${post["_id"]}"
                      >Read More</a></button>
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
