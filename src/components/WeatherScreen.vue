<template>
  <div class="col text-white text-center">
    <div class="text-h4 text-weight-light">
      {{ $store.state.todolist.weatherData.name }}
    </div>
    <div class="text-h6 text-weight-light">
      {{ $store.state.todolist.weather[0].main }}
    </div>
    <div class="text-h1 text-weight-thin q-my-lg relative-position">
      <span>{{ Math.round($store.state.todolist.main.temp) }}</span>
      <span class="text-h4 relative-position degree">&deg;C</span>
    </div>
    <div class="col text-center">
      <img
        src="`http://openweathermap.org/img/wn/${$store.state.todolist.weather[0].icon}@2x.png`"
      />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped></style>
