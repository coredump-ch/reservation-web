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


// Error registry
app.factory('ErrorList', function() {
    const errors = {};

    return function(category) {

        // Initialize category
        if (errors[category] === undefined) {
            errors[category] = {}
        }

        return {
            getErrors: function() {
                return errors[category];
            },
            insert: function(key, value) {
                errors[category][key] = value;
            },
            clear: function() {
                for (key in errors[category]) {
                    delete(errors[category][key]);
                }
            }
        }
    }
});


// The reservation resource
app.factory('Reservation', ['$resource', 'config', 'moment', function($resource, config, moment) {
    return $resource(config.API_URL + 'reservations/:id', {}, {
        query: {
            isArray: true,
            method: 'GET',
            transformResponse: function(data, headers) {
                const parsed = JSON.parse(data);
                return parsed === null ? null : parsed.results;
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
                const duration = moment.duration({'hours': reservation.duration});
                reservation.end = moment(reservation.start).add(duration).toDate();

                // Serialize to JSON
                return JSON.stringify(reservation);
            }
        }
    });
}]);


// Manage the list of future reservations
app.factory('ReservationList', ['Reservation', 'ErrorList', function(Reservation, ErrorList) {
    const values = {
        reservations: []
    };

    const errors = ErrorList('active');

    const update = function() {
        values.reservations = Reservation.query({}, function(data, responseHeaders) {
            errors.clear();
            return true;
        }, function(response) {
            let key;
            if (!response.hasOwnProperty('status') || response.status === -1) {
                key = 'Verbindungsfehler';
            } else {
                key = 'HTTP ' + response.status;
            }
            errors.insert(key, 'Konnte Reservationsliste nicht laden');
            return false;
        });
    };

    return {
        getReservations: function() { return values },
        update: update
    }
}]);
