<template>
<div class="h-full flex-col flex-column items-stretch bg-purple-500">
  <div class="header text-white flex justify-between items-center mb-2 bg-purple-600">
    <div class="ml-2 w-1/3">x</div>
    <div class="text-lg opacity-50 cursor-pointer hover:opacity-75">Laravello</div>
    <div class="mr-2 w-1/3 flex justify-end">
      <div v-if="isLoggedIn">
        <button class="header-btn">Logout</button>
      </div>
      <div v-else>
        <button class="header-btn" @click="$router.push({name: 'login'})">Sign In</button>
        <button class="header-btn">Register</button>
      </div>
    </div>
  </div>
  <div class="h-full flex flex-col items-stretch">
    <div class="mx-4 mb-2 text-white font-bold text-lg">
      <span v-if="$apollo.queries.board.loading">Loading...</span>
      <span v-else>{{ board.title }}</span>
    </div>
    <div class="flex flex-1 items-start overflow-x-auto mx-2" v-if="board">
      <List v-for="list in board.lists"
            :key="list.id" :list="list"
            @card-added="updateQueryCache($event)"
            @card-deleted="updateQueryCache($event)"
            @card-updated="updateQueryCache($event)"
      />
    </div>
  </div>
</div>
</template>

<script>
import BoardQuery from "./graphql/BoardWIthListsAndCards.gql";
import List from "./components/List";
import {EVENT_CARD_ADDED, EVENT_CARD_DELETED, EVENT_CARD_UPDATED} from "./constants";

export default {
  name: "Board",
  components: {List},
  computed: {
    isLoggedIn() {
      return this.$store.state.isLoggedIn;
    }
  },
  apollo: {
    board: {
      query: BoardQuery,
      variables: {
        id: 1,
      }
    }
  },
  methods: {
    updateQueryCache(event) {
      const data = event.store.readQuery({
        query: BoardQuery,
        variables: { id: Number(this.board.id) }
      });
      const listById = () => data.board.lists.find(list => list.id == event.listId);
      switch (event.type) {
        case EVENT_CARD_ADDED:
          listById().cards.push(event.data);
          break;
        case EVENT_CARD_UPDATED:
          listById().cards.filter(card => card.id == event.data.id)
          break;
        case EVENT_CARD_DELETED:
          listById().cards = listById().cards.filter(card => card.id != event.data.id).title = event.data.title;
          break;
      }

      event.store.writeQuery({ query: BoardQuery, data });

    }
  }
}
</script>

<style lang="sass" scoped>
.header
  height: 40px
</style>
