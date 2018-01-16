let request = require("./request");

window.logout = function () {
  let response = request.delete('/admin/session', {});
  if (response === undefined) {
    alert('Не удалось получить ответ от сервера');
    return;
  }
  response = JSON.parse(response);
  if (response.code === 0) {
    location.href = '/admin/login';
  } else {
    alert(response.content);
  }
};

window.showUsers = function () {
  let users = request.get('/admin/user/list');
  if (users === undefined) {
    alert('Не удалось загрузить пользователей');
    return;
  }
  users = JSON.parse(users);
  if (users.code !== 0){
    alert(users.content);
    return;
  }
  let html = '';
  if (users.content.length === 0){
    html = 'Пользователей нет'
  } else {
    users.content.forEach(user => {
      html += `<p>${user.login}<button class="button button-clear" onclick="deleteUser('${user.login}');">Удалить</button><br><button class="button button-clear" onclick="makeModer('${user.login}');">Дать права модератора</button><br><button class="button button-clear" onclick="unmakeModer('${user.login}');">Лишить прав модератора</button><br></p>\n`;
    });
  }
  document.getElementById('userlist').innerHTML = html;
};

window.deleteUser = function (login) {
  let data = {
      login: login
  };
  let response = request.delete('/admin/user', data);
  if (response === undefined) {
    alert('Не удалось получить ответ от сервера');
    return;
  }
  response = JSON.parse(response);
  if (response.code === 0) {
    alert('Пользователь удален');
  } else {
    alert(response.content);
  }
};

window.makeModer = function (login) {
    let data = {
        login: login,
        mod: true
    };
    let response = request.post('/admin/user/mod', data);
    if (response === undefined) {
        alert('Не удалось получить ответ от сервера');
        return;
    }
    response = JSON.parse(response);
    if (response.code === 0) {
        alert('Пользователь получил права модератора');
    } else {
        alert(response.content);
    }
};

window.unmakeModer = function (login) {
    let data = {
        login: login,
        mod: false
    };
    let response = request.post('/admin/user/mod', data);
    if (response === undefined) {
        alert('Не удалось получить ответ от сервера');
        return;
    }
    response = JSON.parse(response);
    if (response.code === 0) {
        alert('Пользователь лишился прав модератора');
    } else {
        alert(response.content);
    }
};

// window.deleteUser = function (form) {
//
//
//   let payload = {
//     login: form.elements['login'].value.trim()
//   };
//   let response = request.delete('/admin/user', payload);
//   if (response === undefined) {
//     alert('Не удалось получить ответ от сервера');
//     return;
//   }
//   response = JSON.parse(response);
//   form.reset();
//   if (response.code === 0) {
//     document.getElementById('deleteUserStatus').innerHTML = `Пользователь удален: ${response.content}`;
//   } else {
//     document.getElementById('deleteUserStatus').innerHTML = response.content;
//   }
// };

window.createForum = function (form) {
  let payload = {
    title: form.elements['title'].value.trim()
  };
  let response = request.post('/admin/forum', payload);
  if (response === undefined) {
    alert('Не удалось получить ответ от сервера');
    return;
  }
  response = JSON.parse(response);
  form.reset();
  if (response.code === 0) {
    document.getElementById('createForumStatus').innerHTML = `Раздел создан: ${response.content}`;
  } else {
    document.getElementById('createForumStatus').innerHTML = response.content;
  }
};

window.deleteForum = function (form) {
  let payload = {
    title: form.elements['title'].value.trim()
  };
  let response = request.delete('/admin/forum', payload);
  if (response === undefined) {
    alert('Не удалось получить ответ от сервера');
    return;
  }
  response = JSON.parse(response);
  form.reset();
  if (response.code === 0) {
    document.getElementById('deleteForumStatus').innerHTML = `Раздел удален: ${response.content}`;
  } else {
    document.getElementById('deleteForumStatus').innerHTML = response.content;
  }
};

window.renameForum = function (form) {
  let payload = {
    oldTitle: form.elements['oldTitle'].value.trim(),
    newTitle: form.elements['newTitle'].value.trim()
  };
  let response = request.post('/admin/forum/rename', payload);
  if (response === undefined) {
    alert('Не удалось получить ответ от сервера');
    return;
  }
  response = JSON.parse(response);
  form.reset();
  if (response.code === 0) {
    document.getElementById('renameForumStatus').innerHTML = `Раздел переименован: ${response.content}`;
  } else {
    document.getElementById('renameForumStatus').innerHTML = response.content;
  }
};

window.deleteThread = function (form) {
  let payload = {
    _id: form.elements['id'].value.trim(),
  };
  let response = request.delete('/admin/thread', payload);
  if (response === undefined) {
    alert('Не удалось получить ответ от сервера');
    return;
  }
  response = JSON.parse(response);
  form.reset();
  if (response.code === 0) {
    document.getElementById('deleteThreadStatus').innerHTML = `Тема удалена: №${response.content}`;
  } else {
    document.getElementById('deleteThreadStatus').innerHTML = response.content;
  }
};

window.deletePost = function (form) {
  let payload = {
      _id: form.elements['id'].value.trim(),
  };
  let response = request.delete('/admin/post', payload);
  if (response === undefined) {
    alert('Не удалось получить ответ от сервера');
    return;
  }
  response = JSON.parse(response);
  form.reset();
  if (response.code === 0) {
    document.getElementById('deletePostStatus').innerHTML = `Пост удален: №${response.content}`;
  } else {
    document.getElementById('deletePostStatus').innerHTML = response.content;
  }
};