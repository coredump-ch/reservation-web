var app = angular.module('reservationsApp');

app.filter('humanizedDiff', function() {
    return function(start, end) {
        return moment.preciseDiff(start, end);
    };
});
