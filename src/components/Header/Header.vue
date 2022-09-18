<template>
  <header class="header">
    <img class="header__logo" alt="ked logo" src="./ked.svg"/>
    <div class="header__banner">
      {{theDay}}
    </div>
  </header>
</template>

<script>
  import moment from 'moment';

  export default {
    name: 'Header',
    props: ['day'],
    computed: {
      theDay: function () {
        moment.locale('en');
        return moment(this.day).format('Do MMMM YYYY')
      }
    }
  }
</script>

<style scoped lang="scss">
  .header {
    background-color: #FFFFFF;
    width: 100%;
    text-transform: uppercase;
    text-align: center;
    font-weight: bold;
    padding-top: 40px;

    &__logo {
      max-width: 400px;
      width: 90%;
    }

    &__banner {
      margin-top: 20px;
      height: 40px;
      background-color: #b2b2b2;
      vertical-align: middle;
      text-align: center;
      font-weight: 600;
      line-height: 44px;
      color: #FFFFFF;
    }
  }
</style>
