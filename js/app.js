var app = angular.module('reservationsApp', ['ngResource', 'ngAnimate', 'ngMessages', 'ngCookies', 'angularMoment']);

app.constant('config', {
    API_URL: 'http://localhost:8000/api/v1/',
    API_TOKEN: '4e26d4012f0f2aaf439bf3e92f2cd7cf96b76fce'
});
