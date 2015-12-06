var app = angular.module('reservationsApp');

app.config(function($resourceProvider, $httpProvider) {
    // Don't strip trailing slashes from calculated URLs
    $resourceProvider.defaults.stripTrailingSlashes = false;
    $httpProvider.defaults.headers.common['Authorization'] = 'Token c3d8b0c98a9d6fba21a3ac0566e37a9b89e3b079';
});

app.factory('Reservation', ['$resource', function($resource) {
    return $resource('https://reservations.coredump.ch/api/v1/reservations/:id', {}, {
        query: {
            isArray: true,
            method: 'GET',
            transformResponse: function(data, headers) {
                return JSON.parse(data).results;
            }
        }
    });
}]);
