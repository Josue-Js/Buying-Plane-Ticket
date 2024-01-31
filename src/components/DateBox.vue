<script setup lang="ts">
import { ref } from 'vue';
import { Motion } from "@oku-ui/motion";

import CalendarSvg from './icons/CalendarSvg.vue';

const  props = defineProps<{
  name: string;
  value: string;
  animationDelay?: number; 
}>()


const date = ref(props.value);

function formatDate(value: string) {
  const newDate = new Date(value + 'T03:24:00').toDateString();
  const [_, month, day, year] = newDate.split(' ');
  return `${month}. ${day}, ${year}`;
}

function handleChangeDate(event: Event) {
  const data = (event.target as HTMLInputElement).value;
  date.value = data;
}
</script>
<template>
    <Motion 
      :initial="{opacity: 0, scale: 0, y: 6}"
      :animate="{ opacity: 1, scale: 1, y: 0}" 
      :transition="{ duration: 0.8, delay: animationDelay}"
    >
      <div class="w-min flex items-center gap-x-6 py-4 pl-4 pr-[50px] rounded-[40px] bg-white">
        <label class="flex items-center justify-center w-16 h-16 rounded-full bg-blue-ice cursor-pointer">
          <CalendarSvg class="fill-blue" />
          <input  
            class="absolute w-[20px] scale-[1.6] opacity-0 outline-none bg-transparent cursor-pointer"
            @change="handleChangeDate" 
            type="date" 
            :value="date"
           />
        </label>

        <div>
          <h4 class="text-grey font-normal text-lg">
            {{name}}
          </h4>
          <span class="text-black font-medium text-2xl whitespace-nowrap">
            {{formatDate(date)}}
          </span>
        </div>
      </div>
    </Motion>
</template>