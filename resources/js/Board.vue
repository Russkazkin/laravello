<template>
<div class="h-full flex-col flex-column items-stretch bg-purple-500">
  <div class="header text-white flex justify-between items-center mb-2 bg-purple-600">
    <div class="ml-2 w-1/3">x</div>
    <div class="text-lg opacity-50 cursor-pointer hover:opacity-75">Laravello</div>
    <div class="mr-2 w-1/3 flex justify-end">x</div>
  </div>
  <div class="h-full flex flex-col items-stretch">
    <div class="mx-4 mb-2 text-white font-bold text-lg">
      <span v-if="$apollo.queries.board.loading">Loading...</span>
      <span v-else>{{ board.title }}</span>
    </div>
    <div class="flex flex-1 items-start overflow-x-auto mx-2" v-if="board">
      <List v-for="list in board.lists" :key="list.id" :list="list" />
    </div>
  </div>
</div>
</template>

<script>
import BoardQuery from "./graphql/BoardWIthListsAndCards.gql";
import List from "./components/List";

export default {
  name: "Board",
  components: {List},
  apollo: {
    board: {
      query: BoardQuery,
      variables: {
        id: 1,
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.header
  height: 40px
</style>
