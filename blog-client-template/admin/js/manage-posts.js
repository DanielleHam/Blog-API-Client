window.onload = function() {
    fetchAllPosts();
}    

async function fetchAllPosts() {
    try {
         const response = await fetch('http://localhost:5000/posts/');
         const posts = await response.json();
         console.log(posts);
         
         let postsHTML = '';
         for (let post of posts) {
              let dateObj = new Date(post.date);

              postsHTML += `
                   <tr class="list-group-item">
                        <td>${post.title}<br> </td>
                        <td>${post.author}</td>
                        <td> <span class="date"> ${formatDate(dateObj)}</span> </td>
                        <td>
                             <a href="update-post.html?id=${post['_id']}">Update</a> |
                             <a href="#" class="delete-link" data-id="${post['_id']}">Delete</a> 
                        </td>
                   </tr>
                   
              `;
         }

         document.getElementById('admin-posts').innerHTML = postsHTML;
    } catch (error) {
         console.log(error);
    }
}

function formatDate(dateObj) {
    return `${dateObj.getFullYear()}-${dateObj.getMonth()}-${dateObj.getDate()} ${dateObj.getHours()}:${dateObj.getMinutes()}`;
}
