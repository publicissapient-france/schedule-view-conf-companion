<template>
  <div id="app">
    <Header/>
    <Body>
    <Schedule v-if="!loading && !error" :schedule="schedule"/>
    <Loading v-if="loading"/>
    <Error v-if="error"/>
    </Body>
    <Footer/>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import axios from 'axios';
  import Header from '@/components/Header.vue';
  import Schedule from '@/components/Schedule.vue';
  import Body from '@/components/Body.vue';
  import Loading from '@/components/Loading.vue';
  import Error from '@/components/Error.vue';
  import { groupByForEveryoneType, ScheduleEvent } from '@/schedule/schedule';
  import Footer from '@/components/Footer.vue';

  export default Vue.extend({
    name: 'App',
    components: {
      Footer,
      Error,
      Loading,
      Body,
      Header,
      Schedule
    },
    data() {
      return {
        schedule: [] as ScheduleEvent[],
        error: false,
        loading: false
      };
    },
    async mounted() {
      try {
        const response = await axios.get<ScheduleEvent[]>('https://s3.eu-central-1.amazonaws.com/blacroix-conf-companion/xke/schedule.json');
        if (response.status === 200) {
          this.schedule = groupByForEveryoneType(response.data);
        } else {
          this.error = true;
        }
      } catch (e) {
        this.error = true;
        console.error(e);
      } finally {
        this.loading = false;
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
</style>
