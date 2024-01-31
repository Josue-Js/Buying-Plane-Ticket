<script setup lang="ts">
import { Motion } from "@oku-ui/motion";

import SideBar from './SideBar.vue';
import DateBox from "./DateBox.vue";
import TripSearch, { ICountry }  from './TripSearch.vue';
import WrapperPassport from "./WrapperPassport.vue";


defineProps<{
  personSelectedIndex: number;
  setLocation: (value: 'origem' | 'destination', country: ICountry) => void;
}>();
</script>
<template>
  <div
    class="flex gap-x-14 w-full max-w-[860px] py-12 px-10 bg-gradient-to-r from-ice from-75% z-50"
  >
      <SideBar />

      <div class="w-full">
        <Motion 
          initial
          :animate="{opacity: [0, 1], scale: [0, 1], x: [40, 0]}"
          :transition="{duration: 1}"
        >
          <h1 class="font-bold text-6xl text-black">
            Find your trip
          </h1>
        </Motion>

        <div class="flex flex-col gap-y-6">
          <TripSearch 
            :setLocation="setLocation" 
          />

          <div class="flex justify-between">
            <DateBox 
              name="Departure" 
              value="2025-12-20" 
            />
            <DateBox 
              name="Arrival" 
              value="2026-01-13" 
              :animation-delay="0.4"
            />
          </div>

          <WrapperPassport :personSelectedIndex="personSelectedIndex"/>
        </div>
      </div>
  </div>
</template>