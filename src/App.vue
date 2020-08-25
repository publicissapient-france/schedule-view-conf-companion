<template>
  <div id="app">
    <Header/>
    <Body>
    <router-view v-if="schedule" :schedule="schedule"/>
    <Error v-else/>
    </Body>
    <Footer/>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import axios from 'axios';
  import { ScheduleEvent } from '@/schedule/schedule';
  import Body from '@/components/Body.vue';
  import Header from '@/components/Header.vue';
  import Footer from '@/components/Footer.vue';
  import Error from '@/components/Error.vue';

  export default Vue.extend({
    components: { Error, Body, Header, Footer },
    data() {
      return {
        schedule: null as ScheduleEvent[] | null
      };
    },
    async mounted() {
      try {
        const response = await axios.get<ScheduleEvent[]>('https://s3.eu-central-1.amazonaws.com/blacroix-conf-companion/xke/schedule.json');
        if (response.status === 200) {
          this.schedule = response.data;
        }
      } catch (e) {
        console.error(e);
      }
    }
  });
</script>

<style lang="scss">
  @font-face {
    font-family: 'Futura Next';
    font-style: normal;
    font-weight: normal;
    src: url('https://static.engineering.publicissapient.fr/fonts/FuturaNext_Book.otf');
  }

  body {
    margin: 0;
    padding: 0;
    background-color: #E6E6E6;
    font-family: 'Futura Next', serif;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    min-width: 950px;
  }

  pre {
    white-space: normal;
  }

  a {
    color: inherit;
    display: inherit;
    text-decoration: none;
    width: 100%;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
</style>
