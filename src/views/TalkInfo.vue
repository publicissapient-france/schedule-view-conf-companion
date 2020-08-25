<template>
  <div class="info">
    <div class="time">
      {{start}} - {{end}}
    </div>
    <h1>{{talk.title}}</h1>
    <a
      class="speaker"
      v-for="speaker in speakersWithUsername"
      :key="speaker.id"
      target="_blank"
      :href="`https://blog.engineering.publicissapient.fr/author/${speaker.username}/`">
      {{speaker.name}}
    </a>
    <VueMarkdown class="summary">
      {{talk.summary || 'Aucune description.'}}
    </VueMarkdown>
    <div class="room">
      {{talk.room}}
    </div>
    <router-link class="back" to="/" replace>Retour au planning</router-link>
  </div>
</template>

<script>
  import moment from 'moment';
  import VueMarkdown from 'vue-markdown'

  export default {
    name: 'Details',
    props: ['schedule'],
    components: {
      VueMarkdown
    },
    computed: {
      talk: function () {
        return this.schedule.find(talk => talk.id === this.$route.params.id);
      },
      start: function () {
        return moment(this.talk.fromTime).format('HH:mm');
      },
      end: function () {
        return moment(this.talk.toTime).format('HH:mm');
      },
      speakersWithUsername: function () {
        return this.talk.speakers.map(s => ({
          username: s.id.split('@')[0],
          ...s
        }));
      }
    },
  }
</script>

<style scoped lang="scss">
  @import "../styles/variables";

  .info {
    width: 930px;
    padding: 10px;
  }

  .back {
    background-color: #B2B2B2;
    padding: 10px 0;
    color: #FFFFFF;
    font-size: .8em;
    border-radius: $radius;
    margin-top: 30px;
    text-transform: uppercase;
    text-align: center;

    &:hover {
      background-color: darken(#B2B2B2, 5);
    }
  }

  .summary {
    color: #2B2B2B;
    font-size: .9em;
  }

  .time {
    font-size: .8em;
    margin-bottom: 10px;
    background-color: $primary;
    padding: 3px 5px 0 5px;
    color: #FFFFFF;
    border-radius: $radius;
    width: fit-content;
  }

  .room {
    font-size: .8em;
    margin-top: 10px;
    background-color: $primary;
    padding: 3px 5px 0 5px;
    color: #FFFFFF;
    border-radius: $radius;
    width: fit-content;
  }

  .speaker {
    background-color: $tertiary;
    color: #FFFFFF;
    width: 100%;
    padding: 10px;
    font-size: .8em;
    border-radius: $radius;
    margin-bottom: 10px;
    box-sizing: border-box;
  }
</style>
