getCategories();
getPosts();

$("#createpost").on('submit', function (e) {
    e.preventDefault();
    axios.post($("#createpost").attr('action'), $("#createpost").serialize())
        .then(res => {
            console.log(res.data);

            getPosts()
        })
        .catch(err => {
            console.log(err);
        })
});

function getCategories() {
    axios.get('/api/v1/categories')
        .then(res => {
            let options = res.data.data;
            let cleanData = "";
            for (let i in options) {
                cleanData += `<option value="${options[i]}">${options[i]}</option>`;
            }
            document.getElementById('category').innerHTML = cleanData;
        })
        .catch(err => {
            console.log(err);
        })
}

function getPosts() {
    axios.get('/api/v1/posts')
        .then(res => {
            let posts = res.data.data;
            let cleanData = "";
            for (let i in posts) {
                cleanData += `
                <div class="col-md-4" style="">
                <div style="background-color: white; margin: 5px; height: 200px; padding: 20px;">
                <h3>${posts[i].title}</h3>
                <p>${posts[i].post}</p>
                </div>
            </div>
                `;
            }
            document.getElementById('posts').innerHTML = cleanData;
        })
        .catch(err => {
            console.log(err);
        })
}