import { groupByForEveryoneType, ScheduleEvent } from '@/schedule/schedule';

describe('schedule', () => {
  it('should group by for everyone event', () => {
    // GIVEN
    const e1 = {
      title: 'Keynote A',
      fromTime: '2020-07-06 09:00',
      type: 'keynote'
    } as {} as ScheduleEvent;
    const e4 = {
      title: 'Talk C',
      fromTime: '2020-07-06 10:00',
      type: 'talk',
      room: 'b'
    } as {} as ScheduleEvent;
    const e3 = {
      title: 'Talk B',
      fromTime: '2020-07-06 09:30',
      type: 'talk',
      room: 'b'
    } as {} as ScheduleEvent;
    const e2 = {
      title: 'Talk A',
      fromTime: '2020-07-06 09:30',
      type: 'talk',
      room: 'a'
    } as {} as ScheduleEvent;
    const e5 = {
      title: 'Keynote B',
      fromTime: '2020-07-06 10:30',
      type: 'keynote'
    } as {} as ScheduleEvent;
    const e6 = {
      title: 'Keynote C',
      fromTime: '2020-07-06 11:30',
      type: 'keynote'
    } as {} as ScheduleEvent;
    const e7 = {
      title: 'Talk D',
      fromTime: '2020-07-06 11:00',
      type: 'talk',
      room: 'b'
    } as {} as ScheduleEvent;
    // WHEN
    const result = groupByForEveryoneType([e1, e2, e3, e4, e5, e6, e7]);
    // THEN
    expect(result).toEqual([
      e1,
      [e2, [e3, e4]],
      e5,
      e7,
      e6
    ]);
  });
});
