<template>
<Modal height="250" width="400" :show="show" @closed="$emit('closed')">
  <div class="flex">
    <div class="rounded-sm p-4 text-black w-full mr-2" :class="[colors[color]]">
      <input v-model="title" type="text" placeholder="Add board title" class="title rounded-sm text-white outline-none py-1 px-2 font-bold w-full hover:opacity-50 placeholder-gray-100">
    </div>
    <div>
      <div class="flex justify-between mf-2" v-for="(row, i) in colorGrid" :key="i">
        <BoardColor v-for="(c, i) in row" :key="i" :color="c" :active-color="color" @changed="color = $event"></BoardColor>
      </div>
    </div>
  </div>
  <div class="mt-4">
    <button
      @click="addBoard"
      :disabled="cannotCreate"
      class="rounded-sm py-2 px-4 text-white hover:opacity-75 disabled:opacity-25"
      :class="colors[color]">
      Create
    </button>
  </div>
</Modal>
</template>

<script>
import Modal from "./Modal";
import {colorGrid, colorMap500} from "../utils";
import BoardColor from "./BoardColor";
import BoardAdd from "../graphql/BoardAdd.gql";
import UserBoards from "../graphql/UserBoards.gql";
import {mapState} from "vuex";
export default {
  name: "BoardAddModal",
  components: {BoardColor, Modal},
  props: {
    show: Boolean,
  },
  data() {
    return {
      color: "green",
      title: null,
    }
  },
  computed: {
    ...mapState({
      userId: state => state.user.id,
    }),
    colors: () => colorMap500,
    colorGrid: () => colorGrid,
    cannotCreate() {
      return this.title === null || this.title.length < 3;
    }
  },
  methods: {
    addBoard() {
      const self = this;
      this.$apollo.mutate({
        mutation: BoardAdd,
        variables: {
          title: this.title,
          color: this.color,
        },
        update(store, {data: BoardAdd}) {
          const data = store.readQuery({
            query: UserBoards,
            variables: {userId: self.userId},
          });
          data.userBoards.push(BoardAdd)
          store.writeQuery({
            query: UserBoards,
            data,
            variables: {userId: self.userId}
          });
          self.$emit('closed');
        }
      });
    }
  }
}
</script>

<style scoped lang="sass">
  .title
    background-color: hsla(0, 0%, 100%, 0)
    &:hover, &:focus
      background-color: hsla(0, 0%, 100%, 0.2)
</style>
