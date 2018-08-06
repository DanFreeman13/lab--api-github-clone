request = superagent;

// API END POINT Construction

var BASE_API = "https://api.github.com/users/"
var ACCESS_TOKEN = "?access_token="
var USER_NAME = "";
var API_ENDPOINT = "";

// LEFT BAR

var pageTitle = document.querySelector('title')

var userInput = document.querySelector('#username');
var userName = document.querySelector('.left__complete-name')
var profPic = document.querySelector('.left__photo__bigImage')
var loginName = document.querySelector('.left__user-github')
var workPlace = document.querySelector('.left__workplace');
var locationRes = document.querySelector('.left__location');
var eMail = document.querySelector('.left__email');
var blogURL = document.querySelector('.left__web');

// CENTRAL REPO ZONE

var repoList = document.querySelector('.repoList')

// CODE

userInput.addEventListener('keydown', function(e) {

  var ENTER_KEY = 13;

  if (e.keyCode === ENTER_KEY) {
    USER_NAME = e.target.value;
    API_ENDPOINT = BASE_API + USER_NAME + ACCESS_TOKEN + GITHUB_ACCESS
    request
    .get(API_ENDPOINT)
    .then(function(response) {
      profPic.setAttribute("src", response.body.avatar_url);
      console.log(response.body.name);
      pageTitle.textContent = response.body.name;
      userName.textContent = response.body.name;
      loginName.textContent = response.body.login;
      workPlace.textContent = response.body.company;
      locationRes.textContent = response.body.location;
      eMail.textContent = response.body.email;
      blogURL.textContent = response.body.blog;

      var reposList = response.body.repos_url

      request
      .get(reposList)
      .then(function(repo) {
        var eachRepo = repo.body;

        repoList.innerHTML = "";

        eachRepo.forEach(function(theRepo) {
          var article = document.createElement('article');
          var therepoDesc = "";

          if (theRepo.description === null) {
            therepoDesc = "";
          } else {
            therepoDesc = theRepo.description;
          }

          article.innerHTML = '<article class="repoList__container"><h3 class="repoList__container__title"><a class="repoList__container__title__linkRepo" href="' + theRepo.svn_url + '">' + theRepo.name +'</a></h3><p class="repoList__container__description">' + therepoDesc + '</p><div class="repoList__container__details"><p class="repoList__container__details__language">' + theRepo.language + '</p><p class="repoList__container__details__forks">' + '<i class="fas fa-code-branch"></i> ' + theRepo.forks_count + '</p><p class="repoList__container__details__date">' + "Updated at " + theRepo.updated_at + '</p></div></article>';
          repoList.appendChild(article);

        })
      })

    })
  }



});
