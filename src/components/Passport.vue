<script setup lang="ts">
import { Motion, Presence} from "@oku-ui/motion";

defineProps<{
  visible: boolean;
  index: number;
  passport: {
    avatar: string;
    firstName: string;
    lastName: string;
    DateOfBirth: string;
    genre: string;
    DocumentNumber: string;
    CountryOfIssues: string;
    DocumentExpires: string;
}
}>();

const animation = [
  {
    initial: {
      opacity: 0,
      scale: 0,
      x: -200,
      y: -150,
    },
    animate: {
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
    },
    exit: {
      opacity: 0,
      scale: 0,
      x: -300,
      y: -150,
    },
  },
  {
    initial: {
      opacity: 0,
      scale: 0,
      x: -220,
      y: -200,
    },
    animate: {
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
    },
    exit: {
      opacity: 0,
      scale: 0,
      x: -220,
      y: -200,
    }
  },
  {
    initial: {
      opacity: 0,
      scale: 0,
      x: -120,
      y: -200,
    },
    animate: {
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
    },
    exit: {
      opacity: 0,
      scale: 0,
      x: -120,
      y: -200,
    }
  }
];

</script>
<template>

    <Presence initial exitBeforeEnter>
      <Motion
        v-show="visible" 
        class="flex w-full" 
        :initial="animation[index].initial"
        :animate="animation[index].animate" 
        :transition="{ duration: 0.7 }"
        :exit="animation[index].exit"
      >
        <div class="flex-1 bg-white rounded-[40px] p-8">
          <div class="flex justify-between">
            <div class="flex flex-col">
              <span class="text-grey font-normal text-lg">
                First Name
              </span>
              <span class="text-black font-medium text-xl">
                {{ passport.firstName }}
              </span>
            </div>

            <div class="flex flex-col">
              <span class="text-grey font-normal text-lg">
                Last Name
              </span>
              <span class="text-black font-medium text-xl">
                {{ passport.lastName }}
              </span>
            </div>

            <div class="flex flex-col flex-2">
              <span class="text-grey font-normal text-lg">
                Date of Birth
              </span>
              <span class="text-black font-medium text-xl">
                {{ passport.DateOfBirth }}
              </span>
            </div>

            <div class="flex">

              <span
                class="flex items-center justify-center text-black font-normal text-2xl w-[60px] h-[60px] rounded-full bg-blue-ice"
                :class="{ '!bg-black text-white': passport.genre === 'M' }">
                M
              </span>
              <span
                class="flex items-center justify-center text-black font-normal text-2xl w-[60px] h-[60px] rounded-full bg-blue-ice"
                :class="{ '!bg-black text-white': passport.genre === 'F' }">
                F
              </span>
            </div>
          </div>

          <div class="w-full h-[2px] bg-ice my-6" />

          <div class="flex justify-between">
            <div class="flex flex-col">
              <span class="text-grey font-normal text-lg">
                Document Number
              </span>
              <span class="text-black font-medium text-xl">
                {{ passport.DocumentNumber }}
              </span>
            </div>
            <div class="flex flex-col">
              <span class="text-grey font-normal text-lg">
                Country of issue
              </span>
              <span class="text-black font-medium text-xl capitalize">
                {{ passport.CountryOfIssues }}
              </span>
            </div>

            <div class="flex flex-col flex-2">
              <span class="text-grey font-normal text-lg">
                Document Expires
              </span>
              <span class="text-black font-medium text-xl">
                {{ passport.DocumentExpires }}
              </span>
            </div>
          </div>
        </div>
      </Motion>
    </Presence> 
</template>