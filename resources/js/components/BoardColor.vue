<template>
  <div
    @click="$emit('changed', color)"
    :class="[colors[color]]"
    class="w-6 h-6 md:w-8 md:h-8 md:m-2 rounded-sm cursor-pointer flex justify-center items-center text-white text-xl">
    <span v-if="color === activeColor">✓</span>
  </div>
</template>

<script>
import {colorMap500} from "../utils";

export default {
  name: "BoardColor",
  props: {
    color: String,
    activeColor: String,
  },
  computed: {
    colors: () => colorMap500,
  },
}
</script>

<style scoped>

</style>
