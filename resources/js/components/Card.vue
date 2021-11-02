<template>
  <div>
    <div v-if="!editing" class="group bg-white rounded-sm p-2 cursor-pointer text-sm hover:bg-gray-100 mb-2 shadow-card flex justify-between">
      <div>{{ card.title }}</div>
      <div class="flex font-bold opacity-0 group-hover:opacity-100 transition-opacity ease-in-out">
        <div class="text-gray-400 mr-2 p-1 hover:text-purple-700" @click="editing = true" v-if="card.owner.id == userId">E</div>
        <div class="text-gray-400 p-1 hover:text-red-700" @click="cardDelete" v-if="card.owner.id == userId">D</div>
      </div>
    </div>
    <CardEditor v-model="title" v-else class="mb-2" label="Save Card" @stopEditing="editing = false" @saved="cardUpdate"></CardEditor>
  </div>
</template>

<script>
import CardDelete from '../graphql/CardDelete.gql';
import CardUpdate from '../graphql/CardUpdate.gql';
import {EVENT_CARD_DELETED, EVENT_CARD_UPDATED} from "../constants";
import CardEditor from "./CardEditor";
import {mapState} from "vuex";

export default {
  name: "Card",
  components: {CardEditor},
  props: {
    card: Object,
  },
  data() {
    return {
      editing: false,
      title: this.card.title,
    }
  },
  computed: mapState({
    userId: state => state.user.id,
  }),
  methods: {
    async cardDelete() {
      const self = this;
      try {
        await this.$apollo.mutate({
          mutation: CardDelete,
          variables: {
            id: this.card.id,
          },
          update(store, {data: {cardDelete}}) {
            self.$emit('deleted', {store, data: cardDelete, type: EVENT_CARD_DELETED});
          }
        });
      } catch (e) {}
    },
    async cardUpdate() {
      const self = this;
      try {
        await this.$apollo.mutate({
          mutation: CardUpdate,
          variables: {
            id: this.card.id,
            title: this.title,
          },
          update(store, {data: {cardUpdate}}) {
            self.$emit('updated', {
              store,
              data: cardUpdate,
              type: EVENT_CARD_UPDATED
            });
            self.editing = false;
          },
        });
      } catch (e) {}
    }
  }
}
</script>

<style lang="sass" scoped>

</style>
