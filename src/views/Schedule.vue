<template>
  <div class="schedule"
       :style="{width: combinedSchedule.length * width + 10 + 'px'}">
    <div
      class="wrapper"
      :style="{height: containerHeight + 'px', width: combinedSchedule.length * width + 10 + 'px'}"
    >
      <div class="now-bar" :style="{top: nowBarOffset + 'px'}"></div>
      <template v-for="(column, index) in combinedSchedule">
        <Talk
          class="talk"
          :class="item.kind"
          v-for="item in column"
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
import { computeSchedule, UiScheduleEvent } from '@/schedule/schedule';
import Talk from '@/components/Talk.vue';

export default Vue.extend({
  name: 'Schedule',
  components: { Talk },
  props: ['schedule'],
  data() {
    return {
      ratio: 2.6,
      width: 230,
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

      var result = moment().diff(startOfDayAtTodayDate, 'minute') * v.ratio + 10;
      if (firstTalkStartDateTime.dayOfYear() != moment().dayOfYear()) {
        result = 0;
      }

      if (result < 0) {
        v.nowBarOffset = 10;
      } else if (result > v.containerHeight) {
        v.nowBarOffset = v.containerHeight;
      } else {
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
  max-width: 100vw;
  padding-bottom: 20px;

  &::-webkit-scrollbar {
    display: none;
  }
}

.wrapper {
  position: relative;
  background-color: lighten($background, 2);
}

.talk {
  background-color: white;
  position: absolute;
  width: 220px;

  &.keynote {
    width: calc(100% - 20px);
  }
}

.now-bar {
  position: absolute;
  width: 100%;
  border-top: 2px dashed $accent;
  z-index: 2;
}
</style>
