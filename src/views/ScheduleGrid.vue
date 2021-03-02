<template>
  <div
    class="schedule"
    aria-labelledby="schedule-heading"
    :class="[`schedule--${rooms().length}-rooms`]"
  >
    <span v-for="(room, index) in rooms()"
          class="track-slot"
          :key="index"
          v-bind:style="{ gridColumn: 'track-' + (++index), gridRow: 'tracks' }"
          aria-hidden="true">{{ room }}</span>
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
import Talk2 from '@/components/Talk2.vue';
import {
  computeSlotStyle,
  getAllSlotsRooms,
  SlotStyle,
} from '@/schedule/schedule-grid';

export type SlotRoom =
  'Auditorium'
  | 'Avenir Book'
  | 'Avenir Light'
  | 'Avenir Roman'
  | 'Arial'
  | 'Avenir Black'
  | 'Avenir Medium'

export type SlotType = 'talk' | 'handson' | 'break' | 'lunch' | 'keynote'

export type SlotSpeaker = { id: string, name: string }

export type SlotKind = 'keynote'

export type Slot = {
  conferenceId: string;
  conferenceUrl: string;
  fromTime: string
  id: string
  room: SlotRoom
  speakers: SlotSpeaker[]
  summary: string
  title: string
  toTime: string
  type: SlotType
  kind?: SlotKind
}

const SLOT_TYPE_TO_EXCLUDE = ['lunch', 'break', 'keynote'];

export default Vue.extend({
  name: 'Schedule2',
  components: { Talk2 },
  props: ['schedule'],
  data() {
    return {
      ratio: 2.6,
      width: 195,
      nowBarOffset: 49,
      nowBarUpdaterInterval: null,
    };
  },
  methods: {
    rooms() {
      return getAllSlotsRooms(this.schedule);
    },
    talkStyle(slot: Slot): SlotStyle {
      return computeSlotStyle(slot, this.rooms(), SLOT_TYPE_TO_EXCLUDE);
    },
  },
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

@media screen and (min-width: 700px) {
  .schedule {
    display: grid;
    grid-gap: 10px;
    grid-template-rows:
			[tracks] auto
			[time-0845] 0.5fr
      [time-0855] 0
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
  }

  .schedule--1-rooms {
    grid-template-columns:
			[track-1-start] 1fr
			[track-2-end];
  }

  .schedule--2-rooms {
    grid-template-columns:
			[track-1-start] 1fr
			[track-1-end track-2-start] 1fr
			[track-2-end];
  }

  .schedule--3-rooms {
    grid-template-columns:
			[track-1-start] 1fr
			[track-1-end track-2-start] 1fr
			[track-2-end track-3-start] 1fr
			[track-3-end];
  }

  .schedule--4-rooms {
    grid-template-columns:
			[track-1-start] 1fr
			[track-1-end track-2-start] 1fr
			[track-2-end track-3-start] 1fr
			[track-3-end track-4-start] 1fr
			[track-4-end];
  }

  .schedule--5-rooms {
    grid-template-columns:
			[track-1-start] 1fr
			[track-1-end track-2-start] 1fr
			[track-2-end track-3-start] 1fr
			[track-3-end track-4-start] 1fr
			[track-4-end track-5-start] 1fr
			[track-5-end];
  }

  .schedule--6-rooms {
    grid-template-columns:
			[track-1-start] 1fr
			[track-1-end track-2-start] 1fr
			[track-2-end track-3-start] 1fr
			[track-3-end track-4-start] 1fr
			[track-4-end track-5-start] 1fr
			[track-5-end track-6-start] 1fr
			[track-6-end];
  }

  .schedule--7-rooms {
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

  .schedule--8-rooms {
    grid-template-columns:
			[track-1-start] 1fr
			[track-1-end track-2-start] 1fr
			[track-2-end track-3-start] 1fr
			[track-3-end track-4-start] 1fr
			[track-4-end track-5-start] 1fr
			[track-5-end track-6-start] 1fr
			[track-6-end track-7-start] 1fr
			[track-7-end track-8-start] 1fr
			[track-8-end];
  }

  .schedule--9-rooms {
    grid-template-columns:
			[track-1-start] 1fr
			[track-1-end track-2-start] 1fr
			[track-2-end track-3-start] 1fr
			[track-3-end track-4-start] 1fr
			[track-4-end track-5-start] 1fr
			[track-5-end track-6-start] 1fr
			[track-6-end track-7-start] 1fr
			[track-7-end track-8-start] 1fr
			[track-8-end track-9-start] 1fr
			[track-9-end];
  }
}

.time-slot {
  grid-column: times;
}

.track-slot {
  display: none;
}

@supports (display:grid) {
  @media screen and (min-width: 700px) {
    .track-slot {
      display: block;
      padding: 10px 5px 5px;
      position: sticky;
      top: 0;
      z-index: 1000;
      background-color: rgba(255, 255, 255, .9);
    }
  }
}

.track-slot {
  font-weight: bold;
  font-size: .75em;
}
</style>
