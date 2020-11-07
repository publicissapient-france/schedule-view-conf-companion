<template>
  <div class="schedule"
       :style="{width: combinedSchedule.length * width + 10 + 'px'}">
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
      width: 195
    };
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
</style>
