var app = angular.module('reservationsApp');

app.controller('ReservationListCtrl', function($scope, ReservationList, ErrorList) {
    // Register reservations
    $scope.reservationList = ReservationList.getReservations();

    // Register error messages
    $scope.errors = ErrorList('active').getErrors();

    // Fetch reservations
    ReservationList.update();
});

app.controller('ReservationAddCtrl', function($scope, $timeout, $cookies, Reservation, ReservationList, ErrorList) {

    // Ensure that session and csrf cookies are gone to prevent
    // session authentication from being used in Django REST Framework.
    // We're using token auth instead, which doesn't need CSRF verification.
    $cookies.remove('sessionid');
    $cookies.remove('csrftoken');

    // Initialize scope with empty reservation
    $scope.reservation = new Reservation();
    $scope.showSuccessMessage = false;

    // Register error messages
    $scope.errors = ErrorList('new').getErrors();

    // Add a reservation
    $scope.addReservation = function() {

        // Clear error messages
        ErrorList('new').clear();

        // Save resevation to server
        var promise = $scope.reservation.$save();
        promise.then(function() {

            // When done, clear current form
            $scope.reservation = new Reservation();

            // Show message
            $scope.showSuccessMessage = true;
            $timeout(function() {
                $scope.showSuccessMessage = false;
            }, 3000);

            // Update reservation list
            ReservationList.update();

        }, function(response) {
            if (response.hasOwnProperty('data') && response.data !== null) {
                for (field in response.data) {
                    ErrorList('new').insert(field, response.data[field].join(" "));
                }
            } else {
                if (response.status === -1) {
                    var msg = 'Konnte Reservation nicht speichern (Verbindungsfehler)';
                } else {
                    var msg = 'Konnte Reservation nicht speichern (HTTP ' + response.status + ')';
                }
                ErrorList('new').insert('Fehler', msg);
            }
        });

    };
});
