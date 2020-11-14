<template>
  <div class="schedule"
       :style="{width: combinedSchedule.length * width + 10 + 'px'}">
    <div class="now-bar" :style="{top: nowBarOffset + 'px'}">
      <div class="now-indicator"></div>
    </div>
    <div
      class="wrapper"
      :style="{height: containerHeight + 'px', width: combinedSchedule.length * width + 10 + 'px'}"
    >
      <template v-for="(column, index) in combinedSchedule">
        <Talk2
          class="talk"
          :class="item.kind"
          v-for="(item) in column"
          :key="item.id"
          :style="computeStyle(index, item)"
          :talk="item"
        />
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import moment from 'moment';
import { computeSchedule, UiScheduleEvent } from '@/schedule/schedule2';
import Talk2 from '@/components/Talk2.vue';

export default Vue.extend({
  name: 'Schedule2',
  components: { Talk2 },
  props: ['schedule'],
  data() {
    return {
      ratio: 2.6,
      width: 195,
      nowBarOffset: 0
    };
  },
  created() {
    const v = this as any;
    setInterval(v.updateNowBarOffset, 5 * 60 * 1000);
    v.updateNowBarOffset();
  },
  computed: {
    combinedSchedule() {
      return computeSchedule(this.schedule);
    },
    containerHeight() {
      const v = this as any;
      const lastTalk = v.combinedSchedule.flatMap((array: UiScheduleEvent[][]) => array)
        .sort((a: UiScheduleEvent, b: UiScheduleEvent) => -moment(a.toTime).diff(moment(b.toTime)))[0];
      return lastTalk.top * v.ratio + lastTalk.height * v.ratio;
    }
  },
  methods: {
    computeStyle(index: number, item: UiScheduleEvent) {
      return {
        height: item.height * this.ratio + 'px',
        top: item.top * this.ratio + 10 + 'px',
        left: this.width * index + 10 + 'px'
      };
    },
    updateNowBarOffset() {
      const v = this as any;
      const firstTalk = v.combinedSchedule.flatMap((array: UiScheduleEvent[][]) => array)
        .sort((a: UiScheduleEvent, b: UiScheduleEvent) => moment(a.toTime).diff(moment(b.toTime)))[0];
      const now = moment(new Date().toLocaleTimeString(), 'HH:mm');
      const startOfDay = moment(new Date(firstTalk.fromTime).toLocaleTimeString(), 'HH:mm');
      const result = now.diff(startOfDay, 'minute') * v.ratio;
      if (result < 0) {
        v.nowBarOffset = 0;
      }
      else if (result > v.containerHeight) {
        v.nowBarOffset = v.containerHeight;
      }
      else {
        v.nowBarOffset = result;
      }
    }
  }
});
</script>

<style scoped lang="scss">
@import "../styles/variables";

.schedule {
  @extend %body-shared;
  overflow: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  position: relative;
  border-bottom: 10px solid #F2F2F2;
  max-width: 98%;

  &::-webkit-scrollbar {
    display: none;
  }
}

.wrapper {
  position: relative;
}

.talk {
  background-color: #FFFFFF;
  position: absolute;
  width: 185px;

  &.keynote {
    width: calc(100% - 20px);
  }
}

.now-bar {
  position: absolute;
  width: 100%;
  height: 3px;
  background-color: black;
  z-index: 2;
}

.now-indicator {
  display : inline-block;
  height : 0;
  width : 0;
  border-top : 4px solid transparent;
  border-bottom : 6px solid transparent;
  border-left : 10px solid black;
  position: absolute;
  top: -3px;
}
</style>
