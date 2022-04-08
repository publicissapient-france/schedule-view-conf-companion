<template>
  <header class="header">
    <img class="header__logo" src="./unlocked.svg"/>
    <div class="header__banner">
      <div class="header__inner-banner">{{theDay}}<a href="https://click.engineering.publicissapient.fr/unlocked" class="header__banner__register">inscription</a></div>
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
        moment.locale('fr');
        return moment(this.day).format('D MMMM YYYY')
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../styles/variables";
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

    &__inner-banner {
      width: 100%;
      max-width: 930px;
      margin: auto;
      display: flex;
      align-items: center;
      padding: 0 10px;
      justify-content: space-between;
      height: 100%;
    }

    &__banner {
      margin-top: 20px;
      height: 60px;
      background-color: #b2b2b2;
      font-weight: 600;
      color: #FFFFFF;

      &__register {
        height: 30px;
        background: $primary;
        border: none;
        text-transform: uppercase;
        color: #FFFFFF;
        padding: 0 20px;
        cursor: pointer;
        width: fit-content;
        border-radius: $radius;
        font-weight: normal;
        line-height: 32px;
        &:hover {
          background: darken($primary, 10);
        }
      }
    }
  }
</style>
