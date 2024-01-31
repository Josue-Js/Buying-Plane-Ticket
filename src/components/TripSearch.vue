<script setup lang="ts">
import { ref } from 'vue';
import { Motion } from "@oku-ui/motion";

import RepeatSvg from './icons/RepeatSvg.vue';
import ArrowRightSvg from './icons/ArrowRightSvg.vue';
import PowerSvg from './icons/PowerSvg.vue';


const props = defineProps<{
  setLocation: (value: 'origem' | 'destination', country: ICountry) => void;
}>();


export type ICountry = {
  CityId: string;
  CityName: string;
  CityNameEn?: string;
  CountryId: string;
  CountryName: string;
  GeoContainerId: string;
  GeoId: string;
  Highlighting: Array<number>;
  IataCode?: string;
  LocalizedPlaceName?: string;
  Location: string;
  PlaceId: string;
  PlaceName: string;
  PlaceNameEn?: string;
  RegionId: string;
  ResultingPhrase: string;
  UntransliteratedResultingPhrase: string;
}



const origin = ref('');
const destination = ref('');


async function searchLocation(event: Event) {

  let country: ICountry;
  const field = (event.target as HTMLInputElement).id;
  const value = field == 'origem' ? origin.value : destination.value;

  if (value === '' || value.length < 2) {
    return
  }

  const response = await fetch(`https://www.skyscanner.com.br/g/autosuggest-search/api/v1/search-flight/BR/pt-BR/${value}`);
  const data: ICountry[] = await response.json();

  data.some(item => {
    if (item.CityName) {
      country = item
      return true
    }
  });

  if (country! != undefined) {
    if (field === 'origem') {
      origin.value = `${country.CityName}, ${country.CountryName}`
      props.setLocation('origem', country)
    } else {
      destination.value = `${country.CityName}, ${country.CountryName}`
      props.setLocation('destination', country)
    }
  }
}



</script>
<template>
  <div class="flex flex-col gap-y-6 ">
    <div class="flex items-center gap-x-6 mt-7">
      <Motion 
        initial 
        :animate="{opacity: [0.1, 1], scale: [0, 1]}" 
        :transition="{ duration: 1, delay: 0.1 }"
      >
        <label 
          for="Round-Trip"
          class="flex items-center justify-center px-3 py-[6px] bg-white has-[:checked]:bg-blue rounded-2xl text-grey text-xl font-normal has-[:checked]:text-white gap-x-1 transition-all duration-300"
          >

          <RepeatSvg class="mr-1" />
          Round Trip
          <input 
            class="checked:border-blue hidden w-0 h-0" 
            name="options" 
            id="Round-Trip" 
            type="radio" 
            checked 
          />
        </label>
      </Motion>

      <Motion 
        initial 
        :animate="{opacity: [0.1, 1], scale: [0, 1]}" 
        :transition="{ duration: 1, delay: 0.2 }"
       >
        <label 
          for="One-Way"
          class="flex items-center justify-center px-3 py-[6px] bg-white has-[:checked]:bg-blue rounded-2xl text-grey text-xl font-normal has-[:checked]:text-white gap-x-1 transition-all duration-300"
          >

          <ArrowRightSvg class="mr-1" />
          One Way
          <input 
            name="options" 
            id="One-Way" 
            type="radio" 
            class="checked:border-blue hidden w-0 h-0 " 
          />
        </label>
      </Motion>

      <Motion 
        initial 
        :animate="{opacity: [0.1, 1], scale: [0, 1]}" 
        :transition="{ duration: 1, delay: 0.4 }"
      >
        <label 
          for="Multi-City"
          class="flex items-center justify-center px-3 py-[6px] bg-white has-[:checked]:bg-blue rounded-2xl text-grey text-xl font-normal has-[:checked]:text-white gap-x-1 transition-all duration-300"
        >

          <PowerSvg class="mr-1" />
          Multi City
          <input 
            name="options" 
            id="Multi-City" 
            type="radio"
            class="checked:border-blue hidden w-0 h-0 "
          />
        </label>
      </Motion>
    </div>

    <Motion 
      :initial="{opacity: 0.1}" 
      :animate="{opacity: 1, scale: [0, 1]}" 
      :transition="{ duration: 1}"
    >
      <div class="w-full px-8 py-8 bg-white rounded-[40px]">
        <div class="group flex flex-col">
          <label 
            for="origem" 
            class="text-grey group-focus-within:text-blue"
          >
            from
          </label>
          <input 
            v-model="origin" 
            @input="event => origin = (event.target as HTMLInputElement).value" 
            @blur="searchLocation" 
            id="origem"
            class="w-full outline-none py-2 text-black text-2xl font-normal capitalize" 
            type="text"
            placeholder="Country or city" 
            autocomplete="off"
           
          />
        </div>

        <div class="flex items-center gap-x-4">
          <span class="flex h-1 bg-ice flex-1" />
          <button 
            class="group"
          >
            <RepeatSvg class="fill-grey group-hover:fill-blue" />
          </button>
        </div>

        <div class="group flex flex-col">
          <label 
            for="destination" 
            class="text-grey group-focus-within:text-blue"
          >
            to
          </label>
          <input 
            v-model="destination" 
            class="w-full outline-none py-2 text-black text-2xl font-normal capitalize" type="text"
            @input="event => 
            destination = (event.target as HTMLInputElement). value" 
            id="destination"
            @blur="searchLocation" 
            placeholder="Country or city" 
            autocomplete="off"
          />
        </div>
      </div>
    </Motion>
  </div>
</template>