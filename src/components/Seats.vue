<script setup lang="ts">
import {reactive } from 'vue';


const props = defineProps<{
  handleSeatsSelected: (seat: ISeat) => void; 
}>();


export type ISeat = {
  id: string;
  status: ISeatStatus;
}
type ISeatStatus = 'Available' | 'Reserved' | 'Selected';


function randomSeatStatus() {
  const seatStatus: ISeatStatus[] = ['Available', 'Reserved', 'Selected'];
  const randomNumber = Math.floor(Math.random() * 2)

  return seatStatus[randomNumber]
}

const seatsMap = reactive([
  Array.from({length: 10}, (_, i) => 
  ({id: `${i + 4}a`, status: randomSeatStatus()})),
  Array.from({length: 10}, (_, i) => 
  ({id: `${i + 4}b`, status: randomSeatStatus()})),
  [],
  Array.from({length: 10}, (_, i) => 
  ({id: `${i + 4}c`, status: randomSeatStatus()})),
  Array.from({length: 10}, (_, i) => 
  ({id: `${i + 4}d`, status: randomSeatStatus()})),
]);


function handleSetSeat(col: number, row: number) {

  const seat = seatsMap[col][row];
  const seatStatus = seat.status;
  
  if(seatStatus === 'Reserved'){
    return
  }

  seatsMap[col][row].status = seatStatus === 'Available' ? 'Selected' : 'Selected';


  props.handleSeatsSelected(seat);
}


</script>
<template>
  <div class="flex gap-x-3">
    <div class="flex flex-col gap-2" v-for="(seats, col) in seatsMap" 
      :class="{'w-[28px]': seats.length == 0}"
    >
      <span 
        v-for="(seat, row) in seats"
        class="flex items-center justify-center  w-[92px] h-[92px] rounded-[32px] font-medium text-base transition-all duration-300 select-none" 
        :class="{
          'bg-white cursor-pointer': seat.status == 'Available',
          'bg-platinum': seat.status == 'Reserved',
          'bg-black text-white': seat.status == 'Selected',
        }"
        @click="() => handleSetSeat(col, row)"
      >
        {{ seat.id }}
      </span>
    </div>
  </div>
</template>