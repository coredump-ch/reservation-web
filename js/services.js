var app = angular.module('reservationsApp');

app.config(function($resourceProvider, $httpProvider, config) {

    // Don't strip trailing slashes from calculated URLs
    $resourceProvider.defaults.stripTrailingSlashes = false;

    // Add token authorization header to all requests
    $httpProvider.defaults.headers.common['Authorization'] = 'Token ' + config.API_TOKEN;

});

// Provide MomentJS
app.factory('moment', [function() {
    return moment;
}]);

app.factory('Reservation', ['$resource', 'config', 'moment', function($resource, config, moment) {
    return $resource(config.API_URL + 'reservations/:id', {}, {
        query: {
            isArray: true,
            method: 'GET',
            transformResponse: function(data, headers) {
                return JSON.parse(data).results;
            }
        },
        save: {
            method: 'POST',
            transformRequest: function(reservation, headers) {
                // Validation
                if (reservation === undefined) {
                    return reservation;
                }

                // Convert hours to minutes
                var duration = moment.duration({'hours': reservation.duration});
                reservation.end = moment(reservation.start).add(duration).toDate();

                // Serialize to JSON
                return JSON.stringify(reservation);
            }
        }
    });
}]);
