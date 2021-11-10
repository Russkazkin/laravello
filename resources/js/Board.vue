<template>
<div class="h-full flex-col flex-column items-stretch" :class="bgColor">
  <div class="header text-white flex justify-between items-center mb-2">
    <div class="ml-2 w-1/3">
      <button @click="showBoards = !showBoards" class="header-btn">
        Boards
      </button>
      <DropdownMenu :show="showBoards">
        <div class="uppercase text-gray-600 text-xs font-semibold mb-2 ml-2">Boards</div>
        <div v-for="n in 8" :key="n" class="m-2 bg-blue-100 rounded-sm opacity-100 hover:opacity-75 text-gray-700 font-bold cursor-pointer flex">
          <div class="bg-blue-200 w-10 rounded-sm rounded-r-none"></div>
          <div class="p-2">Board name!</div>
        </div>
      </DropdownMenu>
    </div>
    <div class="text-lg opacity-50 cursor-pointer hover:opacity-75">Laravello</div>
    <div class="mr-2 w-1/3 flex justify-end">
      <div v-if="isLoggedIn" class="flex items-center">
        <div class="text-sm mr-2">{{ name }}</div>
        <button @click="logout" class="header-btn">Logout</button>
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
import { mapState } from "vuex";
import BoardQuery from "./graphql/BoardWIthListsAndCards.gql";
import Logout from "./graphql/Logout.gql";
import List from "./components/List";
import {EVENT_CARD_ADDED, EVENT_CARD_DELETED, EVENT_CARD_UPDATED} from "./constants";
import {colorMap500} from "./utils";
import DropdownMenu from "./components/DropdownMenu";

export default {
  name: "Board",
  components: {DropdownMenu, List},
  data() {
    return {
      showBoards: false,
    };
  },
  computed: {
    ...mapState({
      isLoggedIn: 'isLoggedIn',
      name: state => state.user.name,
    }),
    bgColor() {
      return {
        "bg-gray-500": this.$apollo.loading,
      [colorMap500[this.board?.color]]: true,
      }
    }
  },
  apollo: {
    board: {
      query: BoardQuery,
      variables() {
        return {
          id: Number(this.$route.params.id),
        };
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

    },
    async logout() {
      const response = await this.$apollo.mutate({
        mutation: Logout,
      });
      if (response.data?.logout?.id) {
        await this.$store.dispatch("logout");
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.header
  height: 40px
  background-color: rgba(0,0,0,.2)
</style>
