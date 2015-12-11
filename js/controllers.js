var app = angular.module('reservationsApp');

app.controller('ReservationListCtrl', function($scope, Reservation) {
    $scope.reservations = Reservation.query({}, function(data, responseHeaders) {
        console.log(data)
    });
});

app.controller('ReservationAddCtrl', function($scope, Reservation) {
    $scope.reservation = new Reservation();

    $scope.addReservation = function() {
        $scope.reservation.$save(function() {
            alert('Saved');
        });
    };
});
