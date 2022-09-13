<template>
  <router-link
    class="talk"
    :class="[talk.kind, talk.metadata.topic.label]"
    :to="`/${talk.id}`"
  >
    <div class="time">
      <span>{{ start }} - {{ end }}</span><span>{{ talk.room }}</span>
    </div>
    <div class="title">
      {{ talk.title }}
    </div>
  </router-link>
</template>

<script lang="ts">
import moment from 'moment';
import Vue from 'vue';

export default Vue.extend({
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
});
</script>

<style scoped lang="scss">
@import "../styles/variables";

.talk {
  padding: 6px;
  border-radius: $radius;
  box-shadow: $shadow;
  display: flex;
  flex-direction: column;
  width: auto;
  flex-grow: 1;

  &.keynote {
    background-color: $primary;
    color: $text-on-primary;
    border-left: none;

    .title {
      height: auto;
    }
  }

  &:hover {
    background-color: darken(white, 10);

    &.keynote {
      background-color: darken($primary, 10);
    }
  }
}

.time {
  font-size: .6em;
  margin-bottom: 5px;
  opacity: .8;
  display: flex;
  justify-content: space-between;
}

.title {
  flex-grow: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  display: flex;
  align-items: center;
  font-size: .9em;
  line-height: 1em;
}

.Stratégie {
  border-left: solid 3px $strategy;
}

.Agile, .Produit, .Green {
  border-left: solid 3px $product;
}

.Experience {
  border-left: solid 3px $experience;
}

.Mobile, .Engineering, .Craft, .Sécurité, .Cloud {
  border-left: solid 3px $engineering;
}

.Data {
  border-left: solid 3px $data;
}

.Other {
  border-left: solid 3px $other;
}
</style>
