var app = angular.module('reservationsApp');

app.controller('ReservationListCtrl', function($scope, Reservation) {
    $scope.reservations = Reservation.query({}, function(data, responseHeaders) {
        console.log(data)
    });
});

app.controller('ReservationAddCtrl', function($scope, Reservation) {
    // Initialize scope with empty reservation
    $scope.reservation = new Reservation();

    // Add a reservation
    $scope.addReservation = function() {

        // Save resevation to server
        $scope.reservation.$save(function() {

            // When done, clear current form
            $scope.reservation = new Reservation();

            // Show an alert
            alert('Saved');

        });

    };
});
