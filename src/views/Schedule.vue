<template>
  <div class="schedule">
    <div class="wrapper">
      <div
        v-for="(firstLevel, index) in combinedSchedule"
        :key="index"
        class="line"
      >
        <Talk
          v-if="firstLevel.id"
          :talk="firstLevel"/>
        <template
          v-else
          v-for="(secondLevel, index) in firstLevel"
        >
          <Talk
            v-if="secondLevel.id"
            class="item"
            :key="secondLevel.id"
            :talk="secondLevel"/>
          <div
            v-else
            class="col"
            :key="index"
          >
            <Talk
              :talk="item"
              v-for="item in secondLevel"
              class="item"
              :key="item.id"/>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Talk from '@/components/Talk.vue';
import { prepareScheduleForDomPrint } from '@/schedule/schedule';

export default Vue.extend({
  name: 'Schedule',
  components: { Talk },
  props: ['schedule'],
  computed: {
    combinedSchedule: function () {
      return prepareScheduleForDomPrint(this.schedule);
    }
  }
});
</script>

<style scoped lang="scss">
@import "../styles/variables";

.schedule {
  @extend %body-shared;
  width: 100%;
  overflow: scroll;
  padding-bottom: 10px;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
}

.wrapper {
  min-width: 960px;
}

.line {
  display: flex;
  margin-right: 10px;
}

.col {
  display: flex;
  flex-direction: column;
}
</style>
