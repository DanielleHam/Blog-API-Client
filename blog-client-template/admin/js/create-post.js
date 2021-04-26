window.onload = function() {
    createPostEvent();
}    

function createPostEvent() {
    const form = document.getElementById('create-post-form');
    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        console.log(serializeFormToJSON(e.target));


        try {
            await fetch('http://localhost:5000/posts/', { //Lägga till + postid?
                method: 'POST', // *GET, POST, PATCH, DELETE, etc.
                headers: {
                  'Content-Type': 'application/json'
                  // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: serializeFormToJSON(e.target) // body data type must match "Content-Type" header
            });

            window.location.replace('index.html');
        } catch (error) {
            console.log(error);
        }
    });
}


function serializeFormToJSON(form) {
    let obj = {};
    let formData = new FormData(form);
    
    for (let key of formData.keys()) {
        // console.log(key);
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