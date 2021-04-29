window.onload = function () {
  createPostEvent();
};

function createPostEvent() {
  const form = document.getElementById("create-post-form");
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    console.log(serializeFormToJSON(e.target));

    try {
      await fetch("http://localhost:5000/posts/", {
        method: "POST",
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
    let inputData = formData.getAll(key);

    if (inputData.length > 1) {
      obj[key] = inputData;
    } else {
      obj[key] = inputData[0];
    }
  }

  return JSON.stringify(obj);
}
