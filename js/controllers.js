var app = angular.module('reservationsApp');

app.controller('ReservationListCtrl', function($scope, ReservationList) {
    $scope.reservationList = ReservationList.getReservations();
    ReservationList.update();
});

app.controller('ReservationAddCtrl', function($scope, Reservation, ReservationList) {
    // Initialize scope with empty reservation
    $scope.reservation = new Reservation();

    // Add a reservation
    $scope.addReservation = function() {

        // Save resevation to server
        $scope.reservation.$save(function() {

            // When done, clear current form
            $scope.reservation = new Reservation();

            // Update reservation list
            ReservationList.update();

            // Show an alert
            alert('Saved');

        });

    };
});
