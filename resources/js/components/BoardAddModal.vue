<template>
<Modal height="250" width="300" :show="show" @closed="$emit('closed')">
  <div class="flex">
    <div class="rounded-sm p-4 text-black w-full mr-2 bg-green-700">
      <input type="text" placeholder="Add board title" class="title rounded-sm text-white outline-none py-1 px-2 font-bold w-full hover:opacity-50 placeholder-gray-100">
    </div>
  </div>
  <div class="mt-4">
    <button class="rounded-sm py-2 px-4 text-black bg-green-300 hover:bg-green-500">
      Create
    </button>
  </div>
</Modal>
</template>

<script>
import Modal from "./Modal";
export default {
  name: "BoardAddModal",
  components: {Modal},
  props: {
    show: Boolean,
  }
}
</script>

<style scoped lang="sass">
  .title
    background-color: hsla(0, 0%, 100%, 0)
    &:hover, &:focus
      background-color: hsla(0, 0%, 100%, 0.2)
</style>
