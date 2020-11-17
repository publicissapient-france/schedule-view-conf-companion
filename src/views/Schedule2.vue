<template>
  <div class="schedule"
       :style="{width: combinedSchedule.length * width + 10 + 'px'}">
    <div
      class="wrapper"
      :style="{height: containerHeight + 'px', width: combinedSchedule.length * width + 10 + 'px'}"
    >
      <div class="now-bar" :style="{top: nowBarOffset + 'px'}"></div>
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
      nowBarOffset: 10,
      nowBarUpdaterInterval: null
    };
  },
  created() {
    const v = this as any;
    v.nowBarUpdaterInterval = setInterval(v.updateNowBarOffset, 5 * 60 * 1000);
    v.updateNowBarOffset();
  },
  destroyed() {
    const v = this as any;
    clearInterval(v.nowBarUpdaterInterval);
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
      const firstTalkStartDateTime = moment(firstTalk.fromTime, 'YYYY-MM-DD HH:mm');
      const startOfDayAtTodayDate = moment()
        .set('hour', firstTalkStartDateTime.hour())
        .set('minute', firstTalkStartDateTime.minute());
      const result = moment().diff(startOfDayAtTodayDate, 'minute') * v.ratio + 10;
      if (result < 0) {
        v.nowBarOffset = 10;
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
  border-top: 2px dashed $tertiary;
  z-index: 2;
}

.now-bar:before {
  content: "▶";
  position: absolute;
  top: -10px;
  left: -2px;
  color: $tertiary;
}

.now-bar:after {
  content: "◀";
  position: absolute;
  top: -13px;
  right: -4px;
  color: $tertiary;
}
</style>
