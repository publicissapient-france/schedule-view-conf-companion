<template>
  <div id="app">
    <Header :day="day"/>
    <router-view
      v-if="schedule"
      :schedule="schedule"
    />
    <Loading v-else-if="loading"/>
    <Error v-else/>
    <Legend/>
    <Footer/>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import axios from 'axios';
  import Header from '@/components/Header/Header.vue';
  import Footer from '@/components/Footer.vue';
  import Error from '@/components/Error.vue';
  import Loading from '@/components/Loading.vue';
  import Legend from '@/components/Legend.vue';
  import { ScheduleEvent } from '@/schedule/schedule';
  const STORAGE_NAME = process.env.VUE_APP_BUCKET_NAME

  export default Vue.extend({
    components: { Loading, Error, Header, Footer, Legend },
    data() {
      return {
        schedule: null as ScheduleEvent[] | null,
        day: null as string | null,
        loading: true
      };
    },
    async mounted() {
      try {
         const response = await axios.get<ScheduleEvent[]>(`https://storage.googleapis.com/storage/v1/b/${STORAGE_NAME}/o/schedule.json?alt=media`);
        if (response.status === 200) {
          this.schedule = response.data;
          this.day = response.data[0].fromTime;
        }
      } catch (e) {
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
    src: url('./styles/FuturaNext_Book.otf');
  }

  *, *:before, *:after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    background-color: #E6E6E6;
    font-family: 'Futura Next', serif;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
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
