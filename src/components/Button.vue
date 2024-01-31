<script setup lang="ts">
import { Motion, } from '@oku-ui/motion';
import CaretRight from './icons/CaretRight.vue';


defineProps<{
  title: string;
  onClick?: () => void;
}>();
</script>
<template>
  <button 
  type="button"
  class="flex items-center bg-blue px-[55px] py-[28px] rounded-[32px] text-white text-base capitalize"
    @click="onClick"
  >
    {{ title }}

    <div class="flex relative w-8 h-6">
      <Motion 
      :initial="true"
      class="absolute"
      :animate="{x: [-10, 20, 30], opacity: [0, 1, 0]}"
      :transition="{ repeat: Infinity, duration: 2}"
      >
        <CaretRight/>
      </Motion>

      <Motion 
        class="absolute"
        :initial="true"
        :animate="{x: [-10, 20, 30], opacity: [0, 1, 0]}"
        :transition="{ repeat: Infinity, duration: 2, delay: 0.5}"
      >
        <CaretRight/>
      </Motion>
      <Motion 
        class="absolute"
        :initial="true"
        :animate="{x: [-10, 20, 30], opacity: [0, 1, 0]}"
        :transition="{ repeat: Infinity, duration: 2, delay: 0.7}"
      >
        <CaretRight/>
      </Motion>
    </div>
  </button>
</template>