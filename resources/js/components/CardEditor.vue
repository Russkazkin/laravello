<template>
<div>
  <textarea
    class="rounded-md py-1 px-2 outline-none w-full text-gray-900 text-sm bg-white h-16 resize-none shadow-card border-0"
    placeholder="Enter a title for this card..."
    v-model="title"
    ref="editor"
    @keyup.esc="closeEditor"
    @keyup.enter="saved"
  >
  </textarea>
  <div class="flex">
    <button @click="saved" class="rounded-sm mr-1 py-1 px-3 bg-indigo-700 text-white hover:bg-indigo-600">Add Card</button>
    <button @click="closeEditor" class="py-1 px-3 rounded-md hover:bg-gray-400 text-gray-500">Cancel</button>
  </div>
</div>
</template>

<script>

export default {
  name: "CardEditor",
  props: {},
  data() {
    return {}
  },
  methods: {
    closeEditor() {
      this.$emit('stopEditing');
    },
    saved() {
      this.$emit('saved');
      this.closeEditor();
    }
  },
  mounted() {
    this.$refs.editor.focus();
  }
}
</script>

<style scoped>

</style>
