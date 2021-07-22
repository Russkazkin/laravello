<template>
<div>
  <textarea
    class="rounded-md py-1 px-2 outline-none w-full text-gray-900 text-sm bg-white h-16 resize-none"
    placeholder="Enter a title for this card..."
    v-bind="title"
  >
  </textarea>
</div>
</template>

<script>
export default {
  name: "CardEditor",
  data() {
    return {
      title: null,
    }
  }
}
</script>

<style scoped>

</style>
