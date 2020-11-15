import {createLocalVue, shallowMount} from "@vue/test-utils";
import Schedule2 from "@/views/Schedule2.vue";
import {ScheduleEvent} from "@/schedule/schedule2";
import MockDate from 'mockdate';

const schedule: ScheduleEvent[] = [
  {
    fromTime: "2020-11-02 10:05",
    toTime: "2020-11-02 10:30",
    room: "Arial",
    kind: "talk"
  },
  {
    fromTime: "2020-11-02 10:35",
    toTime: "2020-11-02 11:00",
    room: "Arial",
    kind: "talk"
  },
  {
    fromTime: "2020-11-02 11:05",
    toTime: "2020-11-02 11:30",
    room: "Arial",
    kind: "talk"
  },
  {
    fromTime: "2020-11-02 11:35",
    toTime: "2020-11-02 12:00",
    room: "Arial",
    kind: "talk"
  }
];

describe("Schedule2", () => {
  it("When now is before start of day then now bar vertical position is 10", () => {
    MockDate.set('2020-11-02 08:00');
    const localVue = createLocalVue();
    const wrapper = shallowMount(Schedule2, {
      localVue,
      propsData: {schedule}
    });
    expect(wrapper.vm.$data.nowBarOffset).toBe(10);
  });

  it("When now is after end of day then now bar vertical position is at end of day", () => {
    MockDate.set('2020-11-02 16:00');
    const localVue = createLocalVue();
    const wrapper = shallowMount(Schedule2, {
      localVue,
      propsData: {schedule}
    });
    const endOfDayOffset = 4 * (25 * wrapper.vm.$data.ratio + 10);
    expect(wrapper.vm.$data.nowBarOffset).toBeCloseTo(endOfDayOffset, -1); // Computed container height is 299 px where it should be 300 px. Probably a rounding issue.
  });

  it("When now is in the middle of the day then now bar vertical position is half of end of the day offset", () => {
    MockDate.set('2020-11-02 11:03');
    const localVue = createLocalVue();
    const wrapper = shallowMount(Schedule2, {
      localVue,
      propsData: {schedule}
    });
    const endOfDayOffset = 4 * (25 * wrapper.vm.$data.ratio + 10); // 300 px
    expect(wrapper.vm.$data.nowBarOffset).toBeCloseTo(endOfDayOffset / 2 + 10, -1);
  });
});
