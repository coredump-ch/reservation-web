var app = angular.module('reservationsApp');

app.controller('ReservationListCtrl', function($scope, ReservationList) {
    $scope.reservationList = ReservationList.getReservations();
    ReservationList.update();
});

app.controller('ReservationAddCtrl', function($scope, $timeout, Reservation, ReservationList) {
    // Initialize scope with empty reservation
    $scope.reservation = new Reservation();
    $scope.showSuccessMessage = false;

    // Add a reservation
    $scope.addReservation = function() {

        // Save resevation to server
        $scope.reservation.$save(function() {

            // When done, clear current form
            $scope.reservation = new Reservation();

            // Show message
            $scope.showSuccessMessage = true;
            $timeout(function() {
                $scope.showSuccessMessage = false;
            }, 3000);

            // Update reservation list
            ReservationList.update();

        });

    };
});
