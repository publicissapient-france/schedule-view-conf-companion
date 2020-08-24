<template>
  <footer class="footer">
    © {{new Date().getFullYear()}} Publicis Sapient Engineering. All right reserved. Questions?
  </footer>
</template>

<script>
  export default {
    name: 'Footer'
  }
</script>

<style scoped lang="scss">
  .footer {
    font-size: .8em;
    color: #2B2B2B;
    text-align: center;
    margin: 30px 0;
  }
</style>
