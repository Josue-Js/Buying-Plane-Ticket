<script setup lang="ts">
defineProps<{
  class?: string;
}>()
</script>
<template>
  <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_2_105)">
      <path :class="class" fill="currentColor"
        d="M2.0625 9.75H21.9375C22.2469 9.75 22.5 10.0031 22.5 10.3125V22.5C22.5 23.7422 21.4922 24.75 20.25 24.75H3.75C2.50781 24.75 1.5 23.7422 1.5 22.5V10.3125C1.5 10.0031 1.75313 9.75 2.0625 9.75ZM22.5 7.6875V6C22.5 4.75781 21.4922 3.75 20.25 3.75H18V1.3125C18 1.00313 17.7469 0.75 17.4375 0.75H15.5625C15.2531 0.75 15 1.00313 15 1.3125V3.75H9V1.3125C9 1.00313 8.74687 0.75 8.4375 0.75H6.5625C6.25313 0.75 6 1.00313 6 1.3125V3.75H3.75C2.50781 3.75 1.5 4.75781 1.5 6V7.6875C1.5 7.99687 1.75313 8.25 2.0625 8.25H21.9375C22.2469 8.25 22.5 7.99687 22.5 7.6875Z" />
    </g>
    <defs>
      <clipPath id="clip0_2_105">
        <rect width="24" height="24" fill="white" transform="translate(0 0.75)" />
      </clipPath>
    </defs>
  </svg>
</template>