<template>
<div>
  <textarea
    class="rounded-md py-1 px-2 outline-none w-full text-gray-900 text-sm bg-white h-16 resize-none shadow-card border-0"
    placeholder="Enter a title for this card..."
    v-model="title"
    ref="editor"
    @keyup.esc="closeEditor"
    @keyup.enter="addCard"
  >
  </textarea>
  <div class="flex">
    <button @click="addCard" class="rounded-sm mr-1 py-1 px-3 bg-indigo-700 text-white hover:bg-indigo-600">Add Card</button>
    <button @click="closeEditor" class="py-1 px-3 rounded-md hover:bg-gray-400 text-gray-500">Cancel</button>
  </div>
</div>
</template>

<script>
import CardAdd from "../graphql/CardAdd.gql";
import BoardQuery from "../graphql/BoardWIthListsAndCards.gql";

export default {
  name: "CardEditor",
  props: {
    list: Object,
  },
  data() {
    return {
      title: null,
    }
  },
  methods: {
    addCard() {
      const self = this;
      this.$apollo.mutate({
        mutation: CardAdd,
        variables: {
          title: this.title,
          listId: this.list.id,
          order: this.list.cards.length + 1,
        },
        update(store, {data: {cardAdd}}) {
          const data = store.readQuery({
            query: BoardQuery,
            variables: { id: Number(self.list.board_id) }
          });
          data.board.lists.find(list => list.id == self.list.id).cards.push(cardAdd);
          store.writeQuery({ query: BoardQuery, data });
        }
      });
      this.closeEditor();
    },
    closeEditor() {
      this.$emit('stopEditing');
    }
  },
  mounted() {
    this.$refs.editor.focus();
  }
}
</script>

<style scoped>

</style>
