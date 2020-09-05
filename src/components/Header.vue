<template>
  <header class="header">
    KED ⧖ {{theDay}}
  </header>
</template>

<script>
  import moment from 'moment';

  export default {
    name: 'Header',
    props: ['day'],
    computed: {
      theDay: function () {
        moment.locale('fr');
        return moment(this.day).format('D MMMM YYYY')
      }
    }
  }
</script>

<style scoped lang="scss">
  .header {
    background-color: #000000;
    height: 105px;
    width: 100%;
    color: #FFFFFF;
    text-transform: uppercase;
    text-align: center;
    font-weight: bold;
    padding-top: 40px;
  }
</style>
