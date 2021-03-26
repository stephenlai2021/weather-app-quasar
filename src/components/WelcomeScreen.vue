<template>
  <div class="col column text-center text-white">
    <div class="col text-h3 text-weight-thin">Weather Forcasting</div>
    <q-btn @click="getLocation" class="col" flat>
      <q-icon left size="3em" name="my_location" />
      <div>Find my location</div>
    </q-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lat: null,
      lon: null
    };
  },
  methods: {
    getLocation() {
      this.$q.loading.show();

      if (this.$q.platform.is.electron) {
        fetch("https://freegeoip.app/json/")
          .then(res => res.json())
          .then(data => {
            // console.log(data)
            this.lat = data.latitude;
            this.lon = data.longitude;
            this.getWeatherByCoords();
          });
      } else {
        navigator.geolocation.getCurrentPosition(postion => {
          this.lat = postion.coords.latitude;
          this.lon = postion.coords.longitude;
          console.log(`latitude: ${this.lat}, longitude: ${this.lon}`);
          this.getWeatherByCoords();
        });
      }
    },
    getWeatherByCoords() {
      this.$q.loading.show();
      fetch(
        `${this.apiUrl}?lat=${this.lat}&lon=${this.lon}&appid=${this.apiKey}&units=metric`
      )
        .then(res => res.json())
        .then(data => {
          this.weatherData = data;
          console.log(this.weatherData);
          this.$q.loading.hide();
        });
    }
  }
};
</script>

<style scoped></style>
