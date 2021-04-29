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

    $("#title").attr("value", post.title);

    $("#author").attr("value", post.author);

    $("#post-content").html(post.content);

    $('#prev-tags').attr('value', post.tags);
    
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
        method: "PATCH", 
        headers: {
          "Content-Type": "application/json",
        },
        body: serializeFormToJSON(e.target),
      });

      window.location.replace("./index.html");
    } catch (error) {
      console.log(error);
    }
  });
}

function serializeFormToJSON(form) {
  let obj = {};
  let formData = new FormData(form);

  for (let key of formData.keys()) {
    console.log(key);
    let inputData = formData.getAll(key);

    if (inputData.length > 1) {
      obj[key] = inputData;
    } else {
      obj[key] = inputData[0];
    }
  }

  return JSON.stringify(obj);
}
