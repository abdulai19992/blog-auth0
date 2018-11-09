window.addEventListener('load', function () {

  function isAuthenticated() {
    var expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  if (isAuthenticated()) {
    window.location.href = 'http://localhost:5000/quiz'
    return;
  }

  handleAuthentication();

  var webAuth = new auth0.WebAuth({
    domain: 'idee.auth0.com',
    clientID: 'pKVfsNmwK9tlcVvSvdK9pL5W1kuWs0sp',
    redirectUri: 'http://localhost:5000/quiz',
    responseType: 'token id_token',
    scope: 'openid',
    leeway: 60
  });


  var loginBtn = document.getElementById('btn-login');

  loginBtn.addEventListener('click', function (e) {
    e.preventDefault();
    webAuth.authorize();
  });

  //logoutBtn.addEventListener('click', logout);

  function setSession(authResult) {
    // Set the time that the access token will expire at
    var expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  // function logout() {
  //   localStorage.removeItem('access_token');
  //   localStorage.removeItem('id_token');
  //   localStorage.removeItem('expires_at');
  //   displayButtons();
  // }



  function handleAuthentication() {
    if (isAuthenticated) {
      window.location.href = 'http://localhost:5000/quiz'
    } else {

      webAuth.parseHash(function (err, authResult) {
        if (authResult && authResult.accessToken && authResult.idToken) {
          window.location.hash = '';
          setSession(authResult);
          window.location.href = 'http://localhost:5000/quiz'
          //loginBtn.style.display = 'none';
          //homeView.style.display = 'inline-block';
        } else if (err) {
          //   homeView.style.display = 'inline-block';
          //   console.log(err);
          //   alert(
          //     'Error: ' + err.error + '. Check the console for further details.'
          //   );
        }
        //displayButtons();
      });
    }

  }

  function displayButtons() {

  }


});