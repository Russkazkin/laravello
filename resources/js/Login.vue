<template>
<div class="bg-white sm:bg-gray-100 h-full flex justify-center">
  <div class="container mt-2 sm:mt-10 flex flex-col items-center">
    <div class="text-3xl text-blue-700 font-bold mb-10">
      <span>Laravello</span>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "Login"
}
</script>

<style lang="sass" scoped>
.container
  width: 300px
  max-width: 300px
@media (min-width: 640px)
  .container
    width: 400px
    max-width: 400px
</style>
