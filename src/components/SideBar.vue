<script setup lang="ts">
import { Motion } from "@oku-ui/motion";

import LogoSvg from './icons/LogoSvg.vue';
import SignOutSvg from './icons/SignOutSvg.vue';
import MenuSvg from './icons/MenuSvg.vue';


const variants = {
  initial: {
    opacity: 0,
    scale: 0
  },
  animate: {
    opacity: 1,
    scale: 1
  },
  transition: {
    duration: 0.7,
  }
}
</script>
<template>
  <aside class="flex flex-col w-min h-full gap-28">
    <Motion 
      :initial="variants.initial" 
      :animate="variants.animate" 
      :transition="variants.transition"
    >
      <LogoSvg />
    </Motion>

    <div class="flex h-full w-min justify-between flex-col ">
      <Motion 
        :initial="variants.initial" 
        :animate="variants.animate" 
        :transition="variants.transition" 
      >
        <div class="cursor-pointer">
          <MenuSvg />
        </div>
      </Motion>

      <Motion 
        :initial="variants.initial"
        :animate="variants.animate" 
        :transition="variants.transition"
       >
        <div>
          <button
            class="flex group w-14 h-14 items-center justify-center rounded-full bg-white hover:bg-black transition-all duration-300">
            <SignOutSvg class="fill-black group-hover:fill-white" />
          </button>
        </div>
      </Motion>
    </div>
  </aside>
</template>