<template>
  <q-page class="flex column" :class="bgClass">
    <div class="col q-pt-lg q-px-md">
      <q-input v-model="search" placeholder="Search" @keyup.enter="getWeatherBySearch" dark borderless>
        <template v-slot:before>
          <q-icon @click="getLocation" name="my_location" />
        </template>


        <template v-slot:append>
          <q-btn round dense flat @click="getWeatherBySearch" icon="search" />
        </template>
      </q-input>
    </div>
    <!-- <Header /> -->

    <template v-if="weatherData">
      <div class="col text-white text-center">
        <div class="text-h4 text-weight-light">
          {{ weatherData.name }}
        </div>
        <div class="text-h6 text-weight-light">
          {{ weatherData.weather[0].main }}
        </div>
        <div class="text-h1 text-weight-thin q-my-lg relative-position">
          <span>{{ Math.round(weatherData.main.temp) }}</span>
          <span class="text-h4 relative-position degree">&deg;C</span>
        </div>
      </div>

      <div class="col text-center">
        <img
          :src="
            `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
          "
        />
      </div>
    </template>

    <template v-else>
      <div class="col column text-center text-white">
        <div class="col text-h3 text-weight-thin">Weather Forcasting</div>
        <q-btn @click="getLocation" class="col" flat>
          <q-icon left size="3em" name="my_location" />
          <div>Find my location</div>
        </q-btn>
      </div>
    </template>
    <!-- <WelcomeScreen v-if="$store.state.todolist.weatherData" />
    <WeatherScreen v-else /> -->

    <div class="col skyline"></div>
  </q-page>
</template>

<script>
import Header from '../components/Header.vue'
import WelcomeScreen from '../components/WelcomeScreen.vue'
import WeatherScreen from '../components/WeatherScreen.vue'

export default {
  components: {
    // Header,
    // WelcomeScreen,
    // WeatherScreen
  },
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
  computed: {
    bgClass() {
      if (this.weatherData) {
        if (this.weatherData.weather[0].icon.endsWith('n')) {
          return 'bg-night'
        } else {
          return 'bg-day'
        }
      }
    }
  },
  methods: {
    getLocation() {
      this.$q.loading.show()

      if (this.$q.platform.is.electron) {
        fetch('https://freegeoip.app/json/')
        .then(res => res.json())
        .then(data => {
          // console.log(data)
          this.lat = data.latitude
          this.lon = data.longitude
          this.getWeatherByCoords()
        })
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
      this.$q.loading.show()
      fetch(
        `${this.apiUrl}?lat=${this.lat}&lon=${this.lon}&appid=${this.apiKey}&units=metric`
      )
        .then(res => res.json())
        .then(data => {
          this.weatherData = data;
          console.log(this.weatherData);
          this.$q.loading.hide()
        });
    },
    getWeatherBySearch() {
      this.$q.loading.show()
      fetch(
        `${this.apiUrl}?q=${this.search}&appid=${this.apiKey}&units=metric`
      )
        .then(res => res.json())
        .then(data => {
          this.weatherData = data;
          console.log(this.weatherData);
          this.search = ''
          this.$q.loading.hide()
        });
    },
  
  }
};
</script>

<style lang="sass">
.q-page
  background: linear-gradient(to bottom, #136a8a, #267871)
  &.bg-night 
    background: linear-gradient(to bottom, #232526, #414345)
  &.bg-day
    background: linear-gradient(to bottom, #00b4db, #0083b0)
.degree
  top: -44px
.skyline
  flex: 0 0 100px
  background: url(../assets/skyline.png)
  background-size: contain
  background-position: center bottom
</style>
