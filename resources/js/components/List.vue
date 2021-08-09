<template>
  <div class="bg-gray-300 rounded-sm p-2 mr-2 list">
    <div class="flex justify-between">
      <div class="text-gray-800 pl-2 pb-2 font-bold">{{ list.title }}</div>
    </div>
    <Card v-for="card in list.cards"
          :key="card.id"
          :card="card"
          @deleted="$emit('card-deleted', {...$event, listId: list.id})"
          @updated="$emit('card-updated', {...$event, listId: list.id})"
    />
    <CardAddEditor
      v-if="editing"
      @stopEditing="toggleEditing"
      :list="list"
      @added="$emit('card-added', {...$event, listId: list.id})" />
    <CardAddButton v-else @startEditing="toggleEditing"></CardAddButton>
  </div>
</template>

<script>
import CardAddButton from "./CardAddButton";
import Card from "./Card";
import CardAddEditor from "./CardAddEditor";

export default {
  name: "List",
  components: {CardAddEditor, CardAddButton, Card},
  props: {
    list: Object,
  },
  data() {
    return {
      editing: false,
    }
  },
  methods: {
    toggleEditing() {
      this.editing = !this.editing;
    }
  }
}
</script>

<style lang="sass" scoped>
.list
  width: 250px
  min-width: 250px
</style>
