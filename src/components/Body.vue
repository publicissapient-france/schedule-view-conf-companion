<template>
  <section class="body">
    <slot/>
  </section>
</template>

<script>
  export default {
    name: 'Body'
  }
</script>

<style scoped lang="scss">
  @import "../styles/variables";

  .body {
    width: fit-content;
    background-color: #F2F2F2;
    margin: -50px auto 50px;
    border-top: solid 10px $primary;
    box-shadow: $shadow;
    border-radius: $radius;
  }
</style>
