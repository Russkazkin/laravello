<template>
  <div>
    <button @click="showBoards = !showBoards" class="header-btn">
      Boards
    </button>
    <DropdownMenu :show="showBoards" @closed="showBoards = false">
      <div class="uppercase text-gray-600 text-xs font-semibold mb-2 ml-1">Boards</div>
      <router-link
        v-for="board in userBoards"
        :key="board.id"
        :to="{name: 'board', params: {id: board.id}}"
        @click.native="showBoards = false"
        :class="colorMap100[board.color]"
        class="rounded-sm opacity-100 hover:opacity-75 text-gray-700 font-bold cursor-pointer flex mb-1">
        <div class="w-10 rounded-sm rounded-r-none" :class="colorMap200[board.color]"></div>
        <div class="p-2">{{ board.title }}</div>
      </router-link>
      <div class="rounded-sm hover:bg-gray-200 p-2 underline cursor-pointer mt-2" @click="showModal = true">
        Create new board...
      </div>
      <Modal width="300" height="250" :show="showModal" @closed="showModal = false">
        Hello! I'm modal!
      </Modal>
    </DropdownMenu>
  </div>
</template>

<script>
import DropdownMenu from "./DropdownMenu";
import {mapState} from "vuex";
import UserBoards from "../graphql/UserBoards.gql";
import { colorMap100, colorMap200 } from "../utils";
import Modal from "./Modal";

export default {
  name: "UserBoardsDropdown",
  components: {Modal, DropdownMenu },
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
      showModal: false,
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
