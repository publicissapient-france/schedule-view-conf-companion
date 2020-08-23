<template>
  <div class="schedule">
    <Details
      v-if="talk"
      :talk="talk"
      @detailsClick="onDetailsClick"
    />
    <div
      v-for="(firstLevel, index) in schedule"
      :key="index"
      class="line"
    >
      <Talk
        @talkClick="onTalkClick"
        v-if="firstLevel.id"
        :talk="firstLevel"/>
      <template
        v-else
        v-for="(secondLevel, index) in firstLevel"
      >
        <Talk
          @talkClick="onTalkClick"
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
            @talkClick="onTalkClick"
            :talk="item"
            v-for="item in secondLevel"
            class="item"
            :key="item.id"/>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Talk from '@/components/Talk.vue';
  import Details from '@/components/Details.vue';
  import { ScheduleEvent } from '@/schedule/schedule';

  export default Vue.extend({
    name: 'Schedule',
    components: { Details, Talk },
    props: ['schedule'],
    data() {
      return {
        talk: null as ScheduleEvent | null
      };
    },
    methods: {
      onTalkClick(talk: ScheduleEvent) {
        console.log(talk);
        this.talk = talk;
      },
      onDetailsClick() {
        this.talk = null;
      }
    }
  });
</script>

<style scoped lang="scss">
  .schedule {
    padding-bottom: 10px;
  }

  .line {
    display: flex;
    margin-right: 10px;
  }

  .col {
    display: flex;
    flex-direction: column-reverse;
  }
</style>
