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
