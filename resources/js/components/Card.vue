<template>
  <div class="bg-white rounded-sm p-2 cursor-pointer text-sm hover:bg-gray-100 mb-2 shadow-card">{{ card.title }}</div>
</template>

<script>
export default {
  name: "Card",
  props: {
    card: Object,
  }
}
</script>

<style lang="sass" scoped>

</style>
