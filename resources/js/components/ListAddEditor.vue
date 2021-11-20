<template>
  <div>
    <div @click="startEditing" v-if="!editing" class="list bg-white hover:bg-gray-500 rounded-sm p-2 mr-2 opacity-75 text-black cursor-pointer">
      +&nbsp;Add another list
    </div>
    <div v-else class="bg-gray-300 rounded-sm p-2 list" v-on-click-away="hideEditor">
      <input
        type="text"
        ref="title"
        placeholder="Enter list title..."
        @keyup.esc="hideEditor"
        @keypress.enter="addList"
        v-model="title"
        class="rounded-sm border-blue-600 border-2 py-1 px-2 outline-none w-full text-gray-800 text-sm">
      <div class="flex">
        <button @click="addList" class="rounded-sm mt-2 py-1 px-3 bg-blue-700 text-white hover:bg-blue-500 outline-none">Add List</button>
        <button @click="hideEditor" class="rounded-sm mt-2 ml-1 py-1 px-3 rounded-md bg-gray-400 hover:bg-gray-500 text-gray-600">✕</button>
      </div>
    </div>
  </div>
</template>

<script>
import {directive as onClickAway} from "vue-clickaway";
import ListAdd from "../graphql/ListAdd.gql";
import {EVENT_LIST_ADDED} from "../constants";
export default {
  name: "ListAddEditor",
  directives: {onClickAway},
  props: ['board'],
  data() {
    return {
      editing: false,
      title: null,
    }
  },
  methods: {
    hideEditor() {
      this.editing = false;
    },
    startEditing() {
      this.editing = true;
      this.$nextTick(() => this.$refs.title.focus());
    },
    addList() {
      const self = this;
      this.$apollo.mutate({
        mutation: ListAdd,
        variables: {
          title: this.title,
          board: this.board,
        },
        update(store, {data: {listAdd}}){
          self.$emit("added", {store, data: listAdd, type: EVENT_LIST_ADDED});
          self.hideEditor();
        }
      });
    }
  }
}
</script>

<style scoped lang="sass">
.list
  width: 250px
</style>
