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

    function show_Values() {
      var tag = document.querySelectorAll("select");
      var values = "";
      for (var i = 1; i < 4; i++) {
        if (tag[i].options.length > 0)
          for (var option of tag[i].selectedOptions) {
            values += i + "(multiple)=" + option.value + ",";
          }
        else values += i + "=" + tag[i].value + ",";
      }
      return values;
      console.log(values);
    }
    show_Values();

    /*
    var tags = document.getElementById("tags");
    var option;

    for (var i = 0; i < tags.options.length; i++) {
      option = tags.options[i];

      if (option.value == post.tags) {
        option.selected = true;
        return;
        //option.tags = true;
        //return;
      }
    }*/

    let postHTML = `
        <div class="mb-3 form-group">
          <label for="title" class="form-label">Title</label>
          <input type="text" id="title" name="title" class="form-control" value="${post.title}"/>
        </div>

        <div class="mb-3 form-group">
          <label for="author" class="form-label">Author</label>
          <input type="text" id="author" name="author" class="form-control" value="${post.author}"/>
        </div>

        <div class="mb-3 form-group">
          <label for="tags" class="form-label">Tags</label>
          <small class="text-muted"
            >(Hold down CTRL when selecting multiple options)</small>
          <select multiple='multiple' class="form-control" id="tags" name="tags">
            <option value="sport">Sport</option>
            <option value="beer">Beer</option>
            <option value="vacation">Vacation</option>
            <option value="animals">Animals</option>
            <option value="shopping">Shopping</option>
          </select>
        </div>

        <div class="md-3 form-group">
          <label for="post-content" class="form-label">Content</label>
          <textarea
            class="form-control"
            name="content"
            id="post-content"
            rows="3"
          >${post.content}</textarea>
        </div>

       
    
    `;

    document.getElementById("update-post-form").innerHTML = postHTML;
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
