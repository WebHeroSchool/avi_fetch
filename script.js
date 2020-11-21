
let body = document.body;
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

fetch(`https://api.github.com/users/${getUserUrl(url)}`)
  .then(res => res.json())
  .then(json => {
    let avatar = document.createElement('img'),
      userName = document.createElement('h2'),
      userDesc = document.createElement('p'),
      userLink = document.createElement('a');

    avatar.src = json.avatar_url;
    userLink.href = json.html_url;
    userLink.innerText = "my github";

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
    body.prepend(avatar, userName, userDesc, userLink);
  })
  .catch(err => alert('Информация о пользователе недоступна'));
