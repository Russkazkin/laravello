<template>
  <div class="group bg-white rounded-sm p-2 cursor-pointer text-sm hover:bg-gray-100 mb-2 shadow-card flex justify-between">
    <div>{{ card.title }}</div>
    <div class="flex font-bold opacity-0 group-hover:opacity-100 transition-opacity ease-in-out">
      <div class="text-gray-400 mr-2 p-1 hover:text-purple-700">E</div>
      <div class="text-gray-400 p-1 hover:text-red-700" @click="cardDelete">D</div>
    </div>
  </div>
</template>

<script>
import CardDelete from '../graphql/CardDelete.gql';
export default {
  name: "Card",
  props: {
    card: Object,
  },
  methods: {
    cardDelete() {
      this.$apollo.mutate({
        mutation: CardDelete,
        variables: {
          id: this.card.id,
        }
      });
    }
  }
}
</script>

<style lang="sass" scoped>

</style>
