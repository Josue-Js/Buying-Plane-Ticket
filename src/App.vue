<script setup lang="ts">
import {  reactive, ref } from 'vue';

import Box from "./components/Box.vue";
import { ICountry } from './components/TripSearch.vue';
import Flights from './components/Flights.vue';

export type ILocation = {
  origin?: {
    placeId: string;
    cityName: string;
    latitude: number;
    longitude: number;
    countryId: string;
  },
  destination?: {
    placeId: string;
    cityName: string;
    latitude: number,
    longitude: number;
    countryId: string;
  }
}


const personSelectedIndex = ref(ref(0));
const location = reactive<ILocation>({});


function setLocation(value: 'origem' | 'destination', country: ICountry) {
  const [latitude, longitude] = country.Location.split(',');

  if (value === 'origem') {
    location.origin = {
      placeId: country.PlaceId,
      cityName: country.CityName,
      latitude: Number(latitude),
      longitude: Number(longitude),
      countryId: country.CountryId,
    }
  } else if (value === 'destination') {
    location.destination = {
      placeId: country.PlaceId,
      cityName: country.CityName,
      latitude: Number(latitude),
      longitude: Number(longitude),
      countryId: country.CountryId,
    }
  }
}

function setPersonSelectedIndex(index: number) {
  personSelectedIndex.value = index;
}


</script>
<template>
 <div class="relative flex min-h-screen  max-h-[1080px]  mx-auto">
    <Box 
      :setLocation="setLocation" 
      :personSelectedIndex="personSelectedIndex"
    />
    <Flights 
      :location="location"
      :setPersonSelectedIndex="setPersonSelectedIndex" 
    />
  </div>
</template>

