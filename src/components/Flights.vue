<script setup lang="ts">
import { reactive, watch, ref} from 'vue';
import { Motion, Presence  } from '@oku-ui/motion';

import Map from './Map.vue';
import Weather from './Weather.vue';
import { ILocation } from '../App.vue';
import Button from './Button.vue'
import SelectPlaces from './SelectPlaces.vue';
import TicketSvg from './icons/TicketSvg.vue';
import { ISeat } from './Seats.vue';


const props = defineProps<{ 
  location: ILocation, 
  setPersonSelectedIndex: (index: number) => void; 
}>();
export type ITicketStep = 'choosing_location' | 'selecting_places' | 'tickets';
type IStatusBoxWeather = Array< 'open' | 'min'>


const ticketStep = ref<ITicketStep>('choosing_location');
const statusBoxWeather = reactive<IStatusBoxWeather>(['open', 'open']);
const seatsSelected = ref<ISeat[]>([]);


function handleSeatsSelected(seat: ISeat){

  if(seatsSelected.value.length === 3){
    return
  }
  seatsSelected.value.push(seat);

  const seatsSelectedLen = seatsSelected.value.length;
  if(seatsSelectedLen < 3) {
    props.setPersonSelectedIndex(seatsSelectedLen);
  }
}

watch([() => props.location.origin, () => props.location.destination], () => {
  const keys = Object.keys(props.location);
  const keyLength = keys.length;

  if (keyLength === 2) {
    changeStatusBoxWeather(0, 'min');
  }
});


function changeStatusBoxWeather(index: number, status: 'open' | 'min') {
  statusBoxWeather[index] = status;

  const statusBox = status == 'open' ? 'min' : 'open';
  const indexBox = index == 0 ? 1 : 0;

  statusBoxWeather[indexBox] = statusBox;
}

function changeTicketStep(step: ITicketStep) {
  ticketStep.value = step
}



</script>
<template>
  <div class="absolute top-0 bottom-0 right-0 left-0 flex items-end justify-end">

    <div>
      <Presence initial exitBeforeEnter>
          <Motion
            v-if="ticketStep === 'choosing_location'"
            class="absolute top-0 bottom-0 right-0 left-0 flex items-end justify-end z-10"
            :exit="{y: -1600}"
            :transition="{duration: 1.5, delay: 0.3}"
          >
          <Map :location="props.location" />
        </Motion>
      </Presence>

      <div class="flex flex-col gap-y-6 absolute top-14 right-0 pr-14 z-50 overflow-hidden">
        <div v-for="(value, key, index) in props.location">
          <Presence initial exiteBeforeEnter :key="key">
              <Motion
                v-if="ticketStep === 'choosing_location'"
                :exit="{x: 600}"
                :transition="{duration: 0.5, delay: index * 0.2}"
              >
                <Weather 
                  :location="value" 
                  :status="statusBoxWeather[index]"
                  @handler-status="(status) => changeStatusBoxWeather(index, status)"
                />
              </Motion>
            </Presence>
        </div> 
      </div>
    </div>


    <div 
      v-if="props.location.destination && props.location.origin" 
      class="absolute bottom-16 right-20 z-50"
    >
      <Presence initial exitBeforeEnter>
        <Motion
          v-if="ticketStep != 'tickets'"
          :exit="{scale: 0}"
          :transition="{duration: 0.5}"
        >
          <div v-if="ticketStep === 'choosing_location'">
            <Button 
              :title="'Select Places'" 
              :onClick="() => changeTicketStep('selecting_places')"
            />
          </div>
          <div v-if="seatsSelected.length == 3">
            <Button 
              title="pay $854"
              :onClick="() => changeTicketStep('tickets')"
            />
          </div>
        </Motion>
      </Presence>
    </div>

    <div class="flex flex-1 justify-end h-screen overflow-hidden">
      <div class="relative flex w-[calc(100vw-860px)] items-center justify-center">
        <SelectPlaces 
          :visible="ticketStep === 'selecting_places'" 
          :setPersonSelectedIndex="setPersonSelectedIndex"
          :changeTicketStep="changeTicketStep"
          :handleSeatsSelected="handleSeatsSelected"
        />

        <div 
          v-if="ticketStep === 'tickets'" 
          class="relative flex flex-1 h-screen justify-center items-center"
        >
          <div 
            class="absolute" 
            v-for="(_, index) in seatsSelected"
            :style="`z-index: ${50 - index}`"
          >
            <Motion 
              v-if="ticketStep === 'tickets'" 
              :initial="{y: 1600, rotate: 0}"
              :animate="{y: 0, rotate: [0, 0, 0, 0, 0, `${index * 7}deg`]}"
              :transition="{duration: 1,  delay: 1}"
            >
              <TicketSvg 
                :seat="seatsSelected[0].id"
                :from="props.location.origin"
                :to="props.location.destination"
              /> 
            </Motion>
          </div>
        </div>
      </div>
    </div>
  </div>  
</template>

