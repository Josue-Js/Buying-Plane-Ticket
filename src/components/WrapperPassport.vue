<script setup lang="ts">
import { ref, watch } from 'vue';
import { Motion, Presence } from "@oku-ui/motion";

import AddSvg from "./icons/AddSvg.vue";
import EffectSvg from "./icons/EffectSvg.vue";
import personInfo from '../../passportInfo.json';
import Passport from './Passport.vue';

const isPassportVisible = ref(true);
const props = defineProps<{
  personSelectedIndex: number
}>();
const personIndex = ref(0);

watch([() => props.personSelectedIndex], () => {

  isPassportVisible.value = !isPassportVisible.value
  setTimeout(() => {
    personIndex.value = props.personSelectedIndex
    isPassportVisible.value = !isPassportVisible.value
  }, 800);

})
</script>

<template>
  <div>
    <div class="flex mb-4 z-10" >
      <Motion 
        v-for="(person, index) in personInfo.data"
        :initial="{opacity: 0.1, scale: 0}" 
        :animate="{opacity: 1, scale: 1}"
        :transition="{ duration: 0.7, delay:  index * 0.2 }"
      >
        <figure 
          class="flex items-center justify-center w-[85px] h-[85px] rounded-full bg-white "
        >
          <div 
            class="relative bg-blue-ice rounded-full transition-colors duration-300"
            v-bind:class="{ 'bg-blue-sky': index === personIndex }"
          >
            <img :src="person.avatar" alt="avatar smiling" />
            <Presence exitBeforeEnter initial>
              <Motion 
                v-show="isPassportVisible" 
                class="absolute right-[4px] bottom-[-27px] overflow-hidden origin-[50%_0%]"
                :initial="{scale: 0}"
                :animate="{ scale: 1}" 
                :exit="{ scale: 0 }" 
                :transition="{ duration: 0.6 }"
              >
                <EffectSvg v-if="index === personIndex" />
              </Motion>
            </Presence>
          </div>
        </figure>
      </Motion>
    

      <Motion 
        :initial="{opacity: 0.1, scale: 0}" 
        :animate="{opacity: 1, scale: 1}"
        :transition="{ duration: 0.7, delay: 0.4 }"
      >
        <figure class="flex items-center justify-center w-[85px] h-[85px] rounded-full bg-white">
          <AddSvg />
        </figure>
      </Motion>
    </div>

    <Passport 
      :visible="isPassportVisible" 
      :passport="personInfo.data[personSelectedIndex]" 
      :index="personIndex"
    />
  </div>
</template>