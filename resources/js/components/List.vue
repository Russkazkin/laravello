<template>
  <div class="bg-gray-300 rounded-sm p-2 mr-2 list">
    <div class="flex justify-between">
      <div class="text-gray-800 pl-2 pb-2 font-bold">List title</div>
    </div>
    <Card />
    <Card />
    <Card />
    <Card />
    <Card />
    <CardAddButton />
  </div>
</template>

<script>
import CardAddButton from "./CardAddButton";
import Card from "./Card";

export default {
  name: "List",
  components: {CardAddButton, Card},
}
</script>

<style lang="sass" scoped>
.list
  width: 250px
  min-width: 250px
</style>
