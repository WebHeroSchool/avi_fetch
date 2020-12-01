window.setTimeout(function () {
  document.body.classList.add('loaded');
  let body = document.body;
  let url = 'https://api.github.com/users/vigolajnen';
  const date = new Date();
  const getDate = new Promise((resolve, reject) => {
    setTimeout(() => date ? resolve(date) : reject('Ошибка'), 200)
  })
  const getUrl = new Promise((resolve, reject) => {
    setTimeout(() => url ? resolve(url) : reject('URL не найден!'), 200)
  })

   Promise.all([getUrl, getDate])
      .then(([url, date]) => fetch(url))
      .then(res => res.json())
      .then(json => {
        let avatar = document.createElement('img'),
          userName = document.createElement('h2'),
          userDesc = document.createElement('p'),
          userLink = document.createElement('a');
          userDate = document.createElement('p');

        avatar.src = json.avatar_url;
        userLink.href = json.html_url;
        userLink.innerText = 'my github';

        if (json.login != null) {
          userName.innerHTML = json.login;
          } else {
            userName.innerHTML = 'Информация о пользователе недоступна';
        }
        
        if (json.bio != null) {
          userDesc.innerHTML = json.bio;
          } else {
            userDesc.innerHTML = 'Информация о пользователе недоступна';
        }

        userDate.innerHTML = date;
        body.prepend(avatar, userName, userDesc, userLink, userDate);
    })

    .catch(err => console.log('Информация о пользователе недоступна'));
 }, 3000);
