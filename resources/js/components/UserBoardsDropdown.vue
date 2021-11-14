<template>
  <div>
    <button @click="showBoards = !showBoards" class="header-btn">
      Boards
    </button>
    <DropdownMenu :show="showBoards" @closed="showBoards = false">
      <div class="uppercase text-gray-600 text-xs font-semibold mb-2 ml-2">Boards</div>
      <router-link
        v-for="board in userBoards"
        :key="board.id"
        :to="{name: 'board', params: {id: board.id}}"
        @click.native="showBoards = false"
        :class="colorMap100[board.color]"
        class="m-2 rounded-sm opacity-100 hover:opacity-75 text-gray-700 font-bold cursor-pointer flex">
        <div class="w-10 rounded-sm rounded-r-none" :class="colorMap200[board.color]"></div>
        <div class="p-2">{{ board.title }}</div>
      </router-link>
    </DropdownMenu>
  </div>
</template>

<script>
import DropdownMenu from "./DropdownMenu";
import {mapState} from "vuex";
import UserBoards from "../graphql/UserBoards.gql";
import { colorMap100, colorMap200 } from "../utils";

export default {
  name: "UserBoardsDropdown",
  components: { DropdownMenu },
  apollo: {
    userBoards: {
      query: UserBoards,
      variables() {
        return {
          userId: this.userId
        }
      },
      skip() {
        return !this.userId
      }
    }
  },
  data() {
    return {
      showBoards: false,
    };
  },
  computed: {
    ...mapState({
      userId: state => state.user.id
    }),
    colorMap100: () => colorMap100,
    colorMap200: () => colorMap200,
  }
}
</script>

<style scoped>

</style>
