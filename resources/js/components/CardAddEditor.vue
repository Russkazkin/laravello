<template>

</template>

<script>
import CardAdd from "../graphql/CardAdd.gql";
import {EVENT_CARD_ADDED} from "../constants";

export default {
  name: "CardAddEditor",
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
          self.$emit('added', {store, data: cardAdd, type: EVENT_CARD_ADDED});
          self.closeEditor();
        }
      });
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
