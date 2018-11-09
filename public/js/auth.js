// import decode from 'jwt-decode';
// import axios from 'axios';
// import auth0 from 'auth0-js';

// const ID_TOKEN_KEY = 'id_token';
// const ACCESS_TOKEN_KEY = 'access_token';

const CLIENT_ID = '5Q3ltYyxhXeDv0dF1kmFIb4Bet79bd9b';
const CLIENT_DOMAIN = 'franky.auth0.com';
const REDIRECT = 'http://localhost:5000/callback';
const SCOPE = '{SCOPE}';
const AUDIENCE = 'AUDIENCE_ATTRIBUTE';
const ACCESS_TOKEN_KEY = 'ACCESS_TOKEN_KEY';
const ID_TOKEN_KEY = 'ID_TOKEN_KEY';

const LOCAL = 'http://localhost:5000/';
const HOME = LOCAL;
const BLOG = LOCAL + 'blog';

var auth = new auth0.WebAuth({
    clientID: CLIENT_ID,
    domain: CLIENT_DOMAIN
});

function login() {
    auth.authorize({
        domain: 'franky.auth0.com',
        clientID: CLIENT_ID,
        redirectUri: 'http://localhost:5000/callback',
        audience: 'https://franky.auth0.com/userinfo',
        responseType: 'token id_token',
        scope: 'openid'
    });
}

function getIdToken() {
    return localStorage.getItem(ID_TOKEN_KEY);
}

function getAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
}

function clearIdToken() {
    localStorage.removeItem(ID_TOKEN_KEY);
}

function clearAccessToken() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
}

// Helper function that will allow us to extract the access_token and id_token
function getParameterByName(name) {
    let match = RegExp('[#&]' + name + '=([^&]*)').exec(window.location.hash);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

// Get and store access_token in local storage
function setAccessToken() {
    let accessToken = getParameterByName('access_token');
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
}

function logout() {
    clearIdToken();
    clearAccessToken();
    window.location.href = HOME;
}

// Get and store id_token in local storage
function setIdToken() {
    let idToken = getParameterByName('id_token');
    localStorage.setItem(ID_TOKEN_KEY, idToken);
}

function isLoggedIn() {
    const idToken = getIdToken();
    return !!idToken && !isTokenExpired(idToken);
}

function getTokenExpirationDate(encodedToken) {
    const token = jwt_decode(encodedToken);
    if (!token.exp) { return null; }

    const date = new Date(0);
    date.setUTCSeconds(token.exp);

    return date;
}

function isTokenExpired(token) {
    const expirationDate = getTokenExpirationDate(token);
    return expirationDate < new Date();
}