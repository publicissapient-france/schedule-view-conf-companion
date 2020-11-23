<template>
  <div class="schedule" aria-labelledby="schedule-heading">
    <span class="track-slot" aria-hidden="true" style="grid-column: track-1; grid-row: tracks;">Auditorium</span>
    <span class="track-slot" aria-hidden="true" style="grid-column: track-2; grid-row: tracks;">Avenir Book</span>
    <span class="track-slot" aria-hidden="true" style="grid-column: track-3; grid-row: tracks;">Avenir Light</span>
    <span class="track-slot" aria-hidden="true" style="grid-column: track-4; grid-row: tracks;">Avenir Roman</span>
    <span class="track-slot" aria-hidden="true" style="grid-column: track-5; grid-row: tracks;">Arial</span>
    <span class="track-slot" aria-hidden="true" style="grid-column: track-6; grid-row: tracks;">Avenir Black</span>
    <span class="track-slot" aria-hidden="true" style="grid-column: track-7; grid-row: tracks;">Avenir Medium</span>
    <div class="now-bar" :style="{top: nowBarOffset + 'px'}"></div>
    <template v-for="slot in schedule">
      <Talk2
        class="talk"
        :style="talkStyle(slot)"
        :key="slot.id"
        :talk="slot"
      />
    </template>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import moment from 'moment';
import { computeSchedule, UiScheduleEvent } from '@/schedule/schedule2';
import Talk2 from '@/components/Talk2.vue';

export type Slot = {
  conferenceId: string;
  conferenceUrl: string;
  fromTime: string
  id: string
  kind: string
  room: string
  speakers: string[]
  summary: string
  title: string
  toTime: string
  type: string
}

export default Vue.extend({
  name: 'Schedule2',
  components: { Talk2 },
  props: ['schedule'],
  data() {
    return {
      ratio: 2.6,
      width: 195,
      nowBarOffset: 49,
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
    talkStyle(slot: Slot) {
      let gridColumn = "track-1-start / track-7-end"

      if (slot.type === "talk") {
        switch (slot.room) {
          case "Auditorium":
            gridColumn = "track-1";
            break;
          case "Avenir Book":
            gridColumn = "track-2";
            break;
          case "Avenir Light":
            gridColumn = "track-3";
            break;
          case "Avenir Roman":
            gridColumn = "track-4";
            break;
          case "Arial":
            gridColumn = "track-5";
            break;
          case "Avenir Black":
            gridColumn = "track-6";
            break;
          case "Avenir Medium":
            gridColumn = "track-7";
            break;
        }
      }

      const gridRowStart = moment(slot.fromTime, "YYYY-MM-DD HH:mm").subtract('minutes', 5).format("HHmm");
      const gridRowEnd = moment(slot.toTime, "YYYY-MM-DD HH:mm").format("HHmm");

      return {
        "grid-column": gridColumn,
        "grid-row": `time-${gridRowStart} / time-${gridRowEnd}`,
      }
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
  position: relative;
  border-bottom: 10px solid #F2F2F2;
  max-width: 1375px;
  padding: 10px;

  &::-webkit-scrollbar {
    display: none;
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

@media screen and (min-width:700px) {
  .schedule {
    display: grid;
    grid-gap: 10px;
    grid-template-rows:
			[tracks] auto
			[time-0900] 0.5fr
			[time-0930] 0.5fr
			[time-1000] 0.5fr
			[time-1030] 0.5fr
			[time-1100] 0.5fr
			[time-1130] 0.5fr
			[time-1200] 0.5fr
			[time-1230] 0.5fr
			[time-1300] 0.5fr
			[time-1330] 0.5fr
			[time-1400] 0.5fr
			[time-1430] 0.5fr
			[time-1500] 0.5fr
			[time-1530] 0.5fr
			[time-1600] 0.5fr
			[time-1630] 0.5fr
			[time-1700] 0.5fr
			[time-1730] 0.5fr
			[time-1800] 0.5fr
			[time-1830] 0.5fr
			[time-1900] 0.5fr
			[time-1930] 0.5fr
			[time-2000];

    grid-template-columns:
			[track-1-start] 1fr
			[track-1-end track-2-start] 1fr
			[track-2-end track-3-start] 1fr
			[track-3-end track-4-start] 1fr
			[track-4-end track-5-start] 1fr
			[track-5-end track-6-start] 1fr
			[track-6-end track-7-start] 1fr
			[track-7-end];
  }
}

.time-slot {
  grid-column: times;
}

.track-slot {
  display: none;
}

@supports( display:grid ) {
  @media screen and (min-width:700px) {
    .track-slot {
      display: block;
      padding: 10px 5px 5px;
      position: sticky;
      top: 0;
      z-index: 1000;
      background-color: rgba(255,255,255,.9);
    }
  }
}

.track-slot {
  font-weight: bold;
  font-size:.75em;
}
</style>
