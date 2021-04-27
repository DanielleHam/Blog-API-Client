window.onload = function () {
  getPost();
};

async function getPost() {
  let queryString = window.location.search;
  console.log(queryString);
  let urlParams = new URLSearchParams(window.location.search);
  let postId = urlParams.get("id");
  console.log(postId);

  try {
    const response = await fetch("http://localhost:5000/posts/" + postId);
    const post = await response.json();
    console.log(post);
    let dateObj = new Date(post.date);

    let postHTML = `
            <h1>${post.title}</h1>
            <p><em>${post.author} | ${formatDate(dateObj)} </em></p>
            <p><strong>Tags: </strong>${post.tags}</p>
            <p>${post.content}</p
            
    `;

    document.getElementById("main").innerHTML = postHTML;
  } catch (error) {
    console.log(error);
  }
}

function formatDate(dateObj) {
  return `${dateObj.getFullYear()}-${dateObj.getMonth()}-${dateObj.getDate()} ${dateObj.getHours()}:${dateObj.getMinutes()}`;
}
