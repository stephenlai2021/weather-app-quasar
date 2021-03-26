<template>
  <div class="col q-pt-lg q-px-md">
    <q-input
      v-model="search"
      placeholder="Search"
      @keyup.enter="getWeatherBySearch"
      dark
      borderless
    >
      <template v-slot:before>
        <!-- <q-icon @click="getLocation" name="my_location" /> -->
        <q-icon name="my_location" />
      </template>

      <template v-slot:append>
        <q-btn round dense flat @click="getWeatherBySearch" icon="search" />
      </template>
    </q-input>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      weatherData: null,
      lat: null,
      lon: null,
      apiKey: "4d6518a119bdca2651f98d1ca0e63f84",
      apiUrl: "https://api.openweathermap.org/data/2.5/weather"
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
    getWeatherBySearch() {
      this.$q.loading.show();
      fetch(`${this.apiUrl}?q=${this.search}&appid=${this.apiKey}&units=metric`)
        .then(res => res.json())
        .then(data => {
          this.weatherData = data;
          console.log(this.weatherData);
          this.search = "";
          this.$q.loading.hide();
        });
    }
  }
};
</script>

<style scoped></style>
