<template>
  <div
    @click="$emit('talkClick', talk)"
    class="talk"
    :class="[talk.kind]"
  >
    <div class="time">
      {{start}} - {{end}}
    </div>
    <div class="title">
      {{talk.title}}
    </div>
    <div class="room">
      {{talk.room}}
    </div>
  </div>
</template>

<script>
  import moment from 'moment';

  export default {
    name: 'Talk',
    props: ['talk'],
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

  .talk {
    background-color: #FFFFFF;
    padding: 10px;
    margin-left: 10px;
    margin-top: 10px;
    border-radius: $radius;
    box-shadow: $shadow;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    width: 200px;

    &.keynote {
      background-color: $primary;
      color: #FFFFFF;
      flex-grow: 1;
    }

    &:hover {
      background-color: darken(#FFFFFF, 10);

      &.keynote {
        background-color: darken($primary, 10);
      }
    }
  }

  .time {
    font-size: .7em;
    margin-bottom: 10px;
    flex-grow: 1;
    opacity: .8;
  }

  .title {
    flex-grow: 1;
  }

  .room {
    font-size: .7em;
    margin-top: 10px;
    opacity: .8;
  }
</style>
