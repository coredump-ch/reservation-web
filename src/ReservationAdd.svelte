<script>
</script>

<style>
</style>

<h2>Neue Reservation</h2>

<div class="alert alert-success fade" ng-show="showSuccessMessage">Reservation gespeichert!</div>

<div ng-include="'templates/errors.html'"></div>

<form class="form" role="form" ng-submit="addReservation()">
    <div class="form-group">
        <label for="owner" class="control-label">Name</label>
        <input id="owner" ng-model="reservation.owner" class="form-control" placeholder="Dein Name">
    </div>
    <div class="form-group">
        <label for="start" class="control-label">Beginn</label>
        <input id="start" ng-model="reservation.start" class="form-control" type="datetime-local">
    </div>
    <div class="form-group">
        <label for="end" class="control-label">Dauer (h)</label>
        <input id="end" ng-model="reservation.duration"  class="form-control" type="number" min="0" max="48" step="0.25" value="1">
    </div>
    <div class="form-group">
        <button class="btn btn-primary">Go!</button>
    </div>
</form>
