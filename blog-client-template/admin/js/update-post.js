window.onload = function () {
  prefillForm();
  updatePostEvent();
};

async function prefillForm() {
  let queryString = window.location.search;
  console.log(queryString);
  let urlParams = new URLSearchParams(window.location.search);
  let postId = urlParams.get("id");
  console.log(postId);

  try {
    const response = await fetch("http://localhost:5000/posts/" + postId);
    const post = await response.json();
    console.log(post);
    
   
    let postHTML = `
    
      <label for="title">Title</label>
      <input type="text" id="title" name="title" value="${post.title}" />
      <br />
      <label for="author">Author</label>
      <input type="text" id="author" name="author" value="${post.author}"/>
      <br />
      <label for="post-content">Content</label>
      <textarea name="content" id="post-content" cols="30" rows="10">${post.content}</textarea>
      <br />
      <button type="submit">Update</button>
    
    `;

    document.getElementById('update-post-form').innerHTML = postHTML;

  
  } catch (error) {
    console.log(error);
  }
}

function updatePostEvent() {
  let form = document.getElementById("update-post-form");
  let urlParams = new URLSearchParams(window.location.search);
  let postId = urlParams.get("id");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    console.log(serializeFormToJSON(e.target));

    try {
      await fetch("http://localhost:5000/posts/" + postId, {
        method: "PATCH", // *GET, POST, PATCH, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: serializeFormToJSON(e.target), // body data type must match "Content-Type" header
      });

     window.location.replace("./index.html");
    } catch (error) {
      console.log(error);
    }
  });
}
console.log("****** function***********");

function serializeFormToJSON(form) {
  let obj = {};
  let formData = new FormData(form);
  
  for (let key of formData.keys()) {
      console.log(key);
      let inputData = formData.getAll(key);
      // console.log(inputData);

      if (inputData.length > 1) {
          obj[key] = inputData;
      } else {
          obj[key] = inputData[0];
      }
  }

  // console.log(obj);
  return JSON.stringify(obj);
}
        
