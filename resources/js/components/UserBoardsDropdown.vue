<template>
  <div>
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
</template>

<script>
import DropdownMenu from "./DropdownMenu";
import {mapState} from "vuex";
import UserBoards from "../graphql/UserBoards.gql";
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
  }
}
</script>

<style scoped>

</style>
