<script setup lang="ts">
import { Motion, Presence} from '@oku-ui/motion';

import AirPlaneSvg from './icons/AirPlaneSvg.vue';
import Seats, { ISeat } from './Seats.vue';
import { ITicketStep } from './Flights.vue';

defineProps<{
  visible: boolean;
  setPersonSelectedIndex: (index: number) => void; 
  changeTicketStep: (step: ITicketStep) => void;
  handleSeatsSelected: (step: ISeat) => void;
}>();




</script>
<template>

    <Presence initial :exitBeforeEnter="true">
      <Motion 
        v-if="visible" 
        class="absolute"
        :initial="{y: 1600, scale: 1}"
        :animate="{y: 1000, scale: 4}"
        :exit="{y: -2000, scale: 0.5}"
        :transition="{duration: 2,  delay: 0.4}"
      >  
        <AirPlaneSvg />
      </Motion>
    </Presence>


    <div class="absolute top-0 bottom-0">
      <Presence initial :exitBeforeEnter="true">
          <Motion
            v-if="visible"
            :initial="{opacity: 0}"
            :animate="{opacity: 1}"
            :exit="{opacity: 0, transition: {delay: 0}}"
            :transition="{duration: 0.4, delay: 2}"
          >
            <Seats 
              :handleSeatsSelected="handleSeatsSelected"
            />
        </Motion>
      </Presence>
    </div>
</template>