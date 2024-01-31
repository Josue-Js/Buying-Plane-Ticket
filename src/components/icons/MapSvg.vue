<script setup lang="ts">
defineProps<{
  class?: string;
}>()
</script>
<template>
  <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_2_15)">
      <path :class="class"
        d="M0 6.98582V21.4158C0 21.8875 0.47625 22.21 0.914167 22.035L6.66667 19.4167V3.41666L0.838333 5.74791C0.590908 5.84687 0.378804 6.01769 0.229379 6.23834C0.0799536 6.45899 5.92587e-05 6.71934 0 6.98582ZM8 19.4167L16 22.0833V6.08332L8 3.41666V19.4167ZM23.0858 3.46499L17.3333 6.08332V22.0833L23.1617 19.7521C23.4091 19.6532 23.6213 19.4823 23.7707 19.2617C23.9201 19.041 24 18.7807 24 18.5142V4.08416C24 3.61249 23.5238 3.28999 23.0858 3.46499Z" />
    </g>
    <defs>
      <clipPath id="clip0_2_15">
        <rect width="24" height="24" fill="white" transform="translate(0 0.75)" />
      </clipPath>
    </defs>
  </svg>
</template>