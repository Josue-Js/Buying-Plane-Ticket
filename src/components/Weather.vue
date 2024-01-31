<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { Motion, Presence,  } from '@oku-ui/motion';
import { queryWeather } from '../services/openmeteo';

import CloudRainSvg from './icons/CloudRainSvg.vue';
import DropSvg from './icons/DropSvg.vue';
import WindSvg from './icons/WindSvg.vue';
import { ILocation } from '../App.vue';


const emit = defineEmits(['handlerStatus']);

const props = defineProps<{
  location: ILocation[keyof ILocation];
  status: 'open' | 'min';
}>();

type IWeather = {
  time: Date;
  temperature2m: number;
  relativeHumidity2m: number;
  rain: number;
  windSpeed10m: number;
}


const weatherData = ref<IWeather>();


const dayList = Array.from({ length: 7 }, (_, index) => {
  const date = new Date();
  date.setDate(date.getDate() + index);
  const [__, ___, day] = date.toDateString().split(' ');

  return {
    day: Number(day),
    traffic: Math.floor(Math.random() * (70 - 20 + 1)) + 20
  }
});



watchEffect(async () => {

  const response = await queryWeather({
    latitude: props.location!.latitude,
    longitude: props.location!.longitude
  });
  weatherData.value = response;
});



function handlerClick() {

  const status = props.status === 'min' ? 'open' : 'min'

  if (props.status == 'open')
    return
  emit('handlerStatus', status);
}



</script>
<template>
  <Presence initial exitBeforeEnter>
    <Motion  
      v-if="weatherData != undefined"
      :initial="{opacity: 0}"
      :animate="{opacity: 1}"
      :exit="{x: 500}"
      :transition="{duration: 0.3, easing: 'ease-in'}"
      @click="handlerClick"

    >
      <div
        class="rounded-[40px] p-8 w-[430px]"
        :class="{
          'bg-black-olive': props.status === 'open', 
          'bg-black cursor-pointer': props.status == 'min'
        }"
      >
        <div class=" flex flex-1 justify-between items-center">
          <h1 class="text-white text-3xl font-normal max-w-[280px] line-clamp-1 ">
            {{ props.location?.placeId }}, {{ props.location?.cityName }}
          </h1>
          <span class="text-white text-3xl font-bold">
            {{ weatherData?.temperature2m }}°F
          </span>
        </div>

        <Presence initial exitBeforeEnter>
          <Motion
            v-show="props.status === 'open' ? true : false"
            :initial="{opacity: 0, height: 0, y: -70}"
            :animate="{opacity: 1, height: '124px', y: 0}"
            :exit="{opacity: 0,  height: 0, y: -70}"
            :transition="{duration: 0.8, easing: 'ease'}"
          >
            <div class="flex justify-between py-8 items-baseline">
            <Motion
              :initial="{opacity: 0, y: -20}"
              :animate="{opacity: 1, y: 0}"
              :transition="{duration: 0.5, delay: 0.4}"
            >
              
              <div class="flex flex-col items-center gap-y-2">
                <div class="flex gap-x-4">
                  <DropSvg />
                  <span class="text-white text-xl font-normal">
                    {{ weatherData?.relativeHumidity2m }}%
                  </span>
                </div>
                <span class="text-grey text-base font-normal">
                  Humidity
                </span>
              </div>
            </Motion>
            <Motion
              :initial="{opacity: 0, y: -20}"
              :animate="{opacity: 1, y: 0}"
              :transition="{duration: 0.5, delay: 0.5}"
            >
              <div class="flex flex-col items-center gap-y-2">
                <div class="flex gap-x-4">
                  <CloudRainSvg />
                  <span class="text-white text-xl font-normal">
                    {{weatherData?.rain}} %
                  </span>
                </div>
                <span class="text-grey text-base font-normal">
                  Chance of rain
                </span>
              </div>
            </Motion>
            <Motion
              :initial="{opacity: 0, y: -20}"
              :animate="{opacity: 1, y: 0}"
              :transition="{duration: 0.5, delay: 0.6}"
            >
              <div class="flex flex-col items-center gap-y-2">
                <div class="flex gap-x-4">
                  <WindSvg />
                  <span class="text-white text-xl font-normal">
                  {{ weatherData?.windSpeed10m }} m/s
                  </span>
                </div>
                <span class="text-grey text-base font-normal">
                  Wind
                </span>
              </div>
              </Motion>
            </div>
          </Motion>
        </Presence>

        <Presence initial exitBeforeEnter>
          <Motion
            v-show="props.status === 'open' ? true : false"
            :initial="{opacity: 0, height: 0, y: -70}"
            :animate="{opacity: 1, height: '149px', y: 0}"
            :exit="{opacity: 0,  height: 0, y: -70}"
            :transition="{duration: 0.8, easing: 'ease'}"
          >
            <div>
              <h3 class="text-grey text-xl font-normal mb-2">
                Dec.20 - low traffic
              </h3>
              <ul class="flex gap-x-2 items-end h-[113px]">
                <li class="flex flex-col items-center" v-for="day in dayList">
                  <div 
                    :class="`w-[45px]  bg-blue-sky rounded-t-[4px]`"
                    :style="{height: `${day.traffic}px`}"
                  ></div>
                  <span class="text-white text-xl font-normal">
                    {{ day.day }}
                  </span>
                </li>
              </ul>
            </div>
          </Motion>
        </Presence>
      </div>
    </Motion>
  </Presence>
</template>