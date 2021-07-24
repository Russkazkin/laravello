<template>
<div>
  <textarea
    class="rounded-md py-1 px-2 outline-none w-full text-gray-900 text-sm bg-white h-16 resize-none shadow-card border-0"
    placeholder="Enter a title for this card..."
    v-bind="title"
    ref="editor"
    @keyup.esc="$emit('stopEditing')"
    @keyup.enter="$emit('stopEditing')"
  >
  </textarea>
  <div class="flex">
    <button class="rounded-sm mr-1 py-1 px-3 bg-indigo-700 text-white hover:bg-indigo-600">Add Card</button>
    <button class="py-1 px-3 rounded-md hover:bg-gray-400 text-gray-500">Cancel</button>
  </div>
</div>
</template>

<script>
export default {
  name: "CardEditor",
  data() {
    return {
      title: null,
    }
  },
  mounted() {
    this.$refs.editor.focus();
  }
}
</script>

<style scoped>

</style>
