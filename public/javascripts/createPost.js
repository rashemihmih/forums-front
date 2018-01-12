let request = require("./request");

window.createPost = function (form) {
    if (form.noValidate) {
        form.noValidate = false;
        form.elements['post'].style = 'display: block';
        form.elements['parent'].style = 'display: block';
        form.elements['send'].innerHTML = 'Отправить';
        return;
    }
    let parent = form.elements['parent'].value.trim();
    let post = {
        message: form.elements['post'].value.trim(),
        threadId: document.getElementById('id').innerHTML,
        parent: parent
    };
    let response = request.post('/api/post', post);
    if (response === undefined) {
        alert('Не удалось получить ответ от сервера');
        return;
    }
    response = JSON.parse(response);
    if (response.code === 0) {
        location.reload();
    } else {
        alert(response.content);
    }
};

window.reply = function (id) {
    let form = document.getElementById('reply_form');
    if (form.noValidate) {
        form.noValidate = false;
        form.elements['post'].style = 'display: block';
        form.elements['parent'].style = 'display: block';
        form.elements['send'].innerHTML = 'Отправить';
    }
    form.elements['parent'].value = id;
    location.hash = '#reply_form';
    location.hash = '';
};