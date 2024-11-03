<script>
  import ReservationAdd from './ReservationAdd.svelte';
  import ReservationList from './ReservationList.svelte';
</script>

<div id="wrapper" class="container">
  <h1>Ultimaker Reservationen</h1>

  <p>
    Mit diesem Tool kannst du als Mitglied den 3D-Drucker im
    <a href="https://www.coredump.ch/">Coredump</a> reservieren.
  </p>

  <div class="row">
    <div class="col-sm-8">
      <ReservationList />
    </div>

    <div class="col-sm-4">
      <ReservationAdd />
    </div>
  </div>

  <!-- svelte-ignore missing-declaration -->
  <footer>Version: {__APP_VERSION__} (Built on {__BUILD_DATE__})</footer>
</div>

<style>
  footer {
    font-style: italic;
    color: #777;
    font-size: 0.8em;
  }
</style>
