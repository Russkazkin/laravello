<template>
<Modal height="250" width="400" :show="show" @closed="$emit('closed')">
  <div class="flex">
    <div class="rounded-sm p-4 text-black w-full mr-2" :class="[colors[color]]">
      <input type="text" placeholder="Add board title" class="title rounded-sm text-white outline-none py-1 px-2 font-bold w-full hover:opacity-50 placeholder-gray-100">
    </div>
    <div>
      <div class="flex justify-between mf-2" v-for="(row, i) in colorGrid" :key="i">
        <BoardColor v-for="(c, i) in row" :key="i" :color="c" :active-color="color" @changed="color = $event"></BoardColor>
      </div>
    </div>
  </div>
  <div class="mt-4">
    <button class="rounded-sm py-2 px-4 text-white hover:opacity-75" :class="colors[color]">
      Create
    </button>
  </div>
</Modal>
</template>

<script>
import Modal from "./Modal";
import {colorGrid, colorMap500} from "../utils";
import BoardColor from "./BoardColor";
export default {
  name: "BoardAddModal",
  components: {BoardColor, Modal},
  props: {
    show: Boolean,
  },
  data() {
    return {
      color: "green",
      title: null,
    }
  },
  computed: {
    colors: () => colorMap500,
    colorGrid: () => colorGrid,
  }
}
</script>

<style scoped lang="sass">
  .title
    background-color: hsla(0, 0%, 100%, 0)
    &:hover, &:focus
      background-color: hsla(0, 0%, 100%, 0.2)
</style>
