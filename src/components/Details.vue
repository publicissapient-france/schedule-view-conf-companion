<template>
  <div
    @click="$emit('detailsClick')"
    class="overlay"
  >
    <div class="body">
      <div class="time">
        {{start}} - {{end}}
      </div>
      <VueMarkdown class="summary">
        {{talk.summary || 'Aucune description.'}}
      </VueMarkdown>
      <div class="room">
        {{talk.room}}
      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment';
  import VueMarkdown from 'vue-markdown'

  export default {
    name: 'Details',
    props: ['talk'],
    components: {
      VueMarkdown
    },
    computed: {
      start: function () {
        return moment(this.talk.fromTime).format('HH:mm');
      },
      end: function () {
        return moment(this.talk.toTime).format('HH:mm');
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../styles/variables";

  .overlay {
    position: fixed;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, .5);
    z-index: 1;
  }

  .body {
    margin: 100px auto;
    background-color: #FFFFFF;
    width: 500px;
    border-radius: $radius;
    box-shadow: $shadow;
    padding: 10px;
  }

  .summary {
    color: #2B2B2B;
    font-size: .9em;
  }

  .time {
    font-size: .8em;
    margin-bottom: 10px;
    opacity: .8;
    background-color: $primary;
    padding: 3px 5px 0 5px;
    color: #FFFFFF;
    border-radius: 2px;
    width: fit-content;
  }

  .room {
    font-size: .8em;
    margin-top: 10px;
    opacity: .8;
    background-color: $primary;
    padding: 3px 5px 0 5px;
    color: #FFFFFF;
    border-radius: 2px;
    width: fit-content;
  }
</style>
