<template>
  <div class="error">Une erreur s'est produite, veuillez essayer à nouveau ou <a
    href="https://github.com/xebia-france/schedule-view-conf-companion/issues"
    target="_blank"
    class="issues"
  >
    remonter un bug</a>.
  </div>
</template>

<script>
  export default {
    name: 'Error'
  }
</script>

<style scoped lang="scss">
  .error {
    width: 900px;
    padding: 50px 10px;
    text-align: center;
  }

  .issues {
    width: fit-content;
    display: inline;
    text-decoration: underline;
  }
</style>
