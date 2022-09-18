<template>
  <div class="error">An error occurred, please try again or <a
    href="https://github.com/xebia-france/schedule-view-conf-companion/issues"
    target="_blank"
    class="issues"
  >
    send a bug report</a>.
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
    margin: auto;
  }

  .issues {
    width: fit-content;
    display: inline;
    text-decoration: underline;
  }
</style>
