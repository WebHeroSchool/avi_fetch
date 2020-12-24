window.setTimeout(function () {
  document.body.classList.add('loaded');
  let body = document.body;
  let newUser;
  let url = window.location.toString();

  const getUserUrl= (url) => {
    let getUrl = url.split('=');
    let userName = getUrl[1]; //
    if (userName == undefined) {
      userName = 'lucas';
    }
    console.log(userName);
    return userName;
  }

  let getUrl = getUserUrl(url);

  const date = new Date();

  const getDate = new Promise((resolve, reject) => {
    setTimeout(() => date ? resolve(date) : reject('Ошибка'), 200)
  });


  const renderUserCard = function (obj) {
    let avatar = document.createElement('img'),
        userName = document.createElement('h2'),
        userDesc = document.createElement('p'),
        userLink = document.createElement('a');
        userDate = document.createElement('p');

    avatar.src = obj.avatar_url;
    userLink.href = obj.html_url;
    userLink.innerText = 'my github';

    if (obj.login != null) {
      userName.innerHTML = obj.login;
      } else {
        userName.innerHTML = 'Информация о пользователе недоступна';
    }
    
    if (obj.bio != null) {
      userDesc.innerHTML = obj.bio;
      } else {
        userDesc.innerHTML = 'Информация о пользователе недоступна';
    }

    userDate.innerHTML = date;
    body.prepend(avatar, userName, userDesc, userLink, userDate);
  }

  fetch(getUrl)
  Promise.all([getDate])
    .then(() => fetch(getUrl))
    .then(res => res.json())
    .then(obj => newUser = Object.assign({}, obj))
    .then(newUser => renderUserCard(newUser))
    .catch(err => console.log('Информация о пользователе недоступна'));
 }, 3000);
