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

    let allTags = [" Sport", " Beer", " Vacation", " Animals", " Shopping"];

    let selectedTags = post.tags;

    let select = document.querySelector("#tags");

    for (let i = 0; i < allTags.length; i++) {
      var tag = allTags[i];
      var options = document.createElement("option");
      options.value = allTags[i];
      options.text = allTags[i];
      select.appendChild(options);
      for (tag in allTags) {
        if (allTags[i] !== selectedTags[i]) {
          options.setAttribute("selected", false);
        } else {
          options.setAttribute("selected", true);
        }
      }
    }
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

    if (inputData.length > 1) {
      obj[key] = inputData;
    } else {
      obj[key] = inputData[0];
    }
  }

  return JSON.stringify(obj);
}
