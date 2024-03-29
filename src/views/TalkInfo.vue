<template>
  <section class="info">
    <div class="head">
      <div>
        <span class="time">
          {{ start }} - {{ end }}
        </span>
        <Category :category="talk.metadata.topic.label"/>
      </div>
      <div>
        <span class="room" v-if="talk.room">
          {{ talk.room }}
        </span>
        <Level :level="talk.metadata.level"/>
      </div>
    </div>
    <h1>{{ talk.title }}</h1>
    <VueMarkdown class="summary">
      {{ talk.summary || 'No talk summary.' }}
    </VueMarkdown>
    <a
      class="speaker"
      v-for="speaker in speakersWithUsername"
      :key="speaker.id"
      target="_blank"
      :href="`https://blog.engineering.publicissapient.fr/author/${speaker.username}/`">
      {{ speaker.name }}
    </a>
    <a
      class="rate"
      target="_blank"
      :href="`https://conf-companion.firebaseapp.com/rate/${talk.conferenceId}#${talk.id}`">
      Leave a comment
    </a>
    <router-link class="back" to="/" replace>Back to the planning</router-link>
  </section>
</template>

<script>
import moment from 'moment';
import VueMarkdown from 'vue-markdown'
import Category from "@/components/Category";
import Level from "@/components/Level";

export default {
  name: 'Details',
  props: ['schedule'],
  components: {
    Level,
    Category,
    VueMarkdown
  },
  computed: {
    talk() {
      return this.schedule.find(talk => talk.id === this.$route.params.id);
    },
    start() {
      return moment(this.talk.fromTime).format('HH:mm');
    },
    end() {
      return moment(this.talk.toTime).format('HH:mm');
    },
    speakersWithUsername() {
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
  @extend %body-shared;
  padding: 10px;
}

.head {
  display: flex;
  justify-content: space-between;
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

.rate {
  background-color: $primary;
  color: #FFFFFF;
  padding: 10px 0;
  border-radius: $radius;
  margin-top: 10px;
  text-transform: uppercase;
  text-align: center;
  font-size: .8em;

  &:hover {
    background-color: darken($primary, 5);
  }
}

.meet {
  background-color: #00E6C3;
  padding: 10px 0;
  border-radius: $radius;
  margin-top: 30px;
  text-transform: uppercase;
  text-align: center;
  font-size: .8em;

  &:hover {
    background-color: darken(#00E6C3, 5);
  }
}

.summary {
  color: #2B2B2B;
  font-size: .9em;
  margin-top: 30px;
  margin-bottom: 40px;
}

.time {
  display: block;
  font-size: .8em;
  background-color: $primary;
  padding: 3px 5px 0 5px;
  color: #FFFFFF;
  border-radius: $radius;
}

.room {
  font-size: .8em;
  background-color: $primary;
  padding: 3px 5px 0 5px;
  color: #FFFFFF;
  border-radius: $radius;
  width: fit-content;
}

.speaker {
  background-color: $tertiary;
  color: #FFFFFF;
  padding: 10px;
  font-size: .8em;
  border-radius: $radius;
  margin-bottom: 10px;
  box-sizing: border-box;
}
</style>
