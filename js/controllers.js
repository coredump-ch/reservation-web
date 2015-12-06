var app = angular.module('reservationsApp');

app.controller('ReservationsCtrl', function($scope, Reservation) {
    /*$scope.reservations = [
        {
            'start': new Date(2015, 12, 04, 16, 0, 0),
            'end': new Date(2015, 12, 04, 22, 30, 0),
            'name': 'Danilo',
        },
        {
            'start': new Date(2015, 12, 06, 07, 0, 0),
            'end': new Date(2015, 12, 04, 09, 0, 0),
            'name': 'Axel',
        }
    ];*/
    $scope.reservations = Reservation.query({}, function(data, responseHeaders) {
        console.log(data)
    });
});
