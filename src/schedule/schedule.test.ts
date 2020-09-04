import { prepareScheduleForDomPrint, ScheduleEvent } from '@/schedule/schedule';

describe('schedule', () => {
  it('should group by for everyone event', () => {
    // GIVEN
    const e1 = {
      title: 'Keynote A',
      fromTime: '2020-07-06 09:00',
      kind: 'keynote'
    } as {} as ScheduleEvent;
    const e2 = {
      title: 'Talk A',
      fromTime: '2020-07-06 09:30',
      kind: 'talk',
      room: 'a'
    } as {} as ScheduleEvent;
    const e3 = {
      title: 'Talk B',
      fromTime: '2020-07-06 09:30',
      kind: 'talk',
      room: 'b'
    } as {} as ScheduleEvent;
    const e4 = {
      title: 'Talk C',
      fromTime: '2020-07-06 10:00',
      kind: 'talk',
      room: 'b'
    } as {} as ScheduleEvent;
    const e5 = {
      title: 'Keynote B',
      fromTime: '2020-07-06 10:30',
      kind: 'keynote'
    } as {} as ScheduleEvent;
    const e6 = {
      title: 'Keynote C',
      fromTime: '2020-07-06 11:30',
      kind: 'keynote'
    } as {} as ScheduleEvent;
    const e7 = {
      title: 'Talk D',
      fromTime: '2020-07-06 11:00',
      kind: 'talk',
      room: 'b'
    } as {} as ScheduleEvent;
    // WHEN
    const result = prepareScheduleForDomPrint([e1, e2, e4, e3, e5, e6, e7]);
    // THEN
    expect(result).toEqual([
      e1,
      [e2, [e3, e4]],
      e5,
      e7,
      e6
    ]);
  });
  it('should allow events at the end without everyone event', () => {
    // GIVEN
    const e0 = {
      title: 'Keynote A',
      fromTime: '2020-07-06 08:30',
      kind: 'keynote'
    } as {} as ScheduleEvent;
    const e1 = {
      title: 'Talk A',
      fromTime: '2020-07-06 09:00',
      kind: 'talk',
      room: 'a'
    } as {} as ScheduleEvent;
    const e2 = {
      title: 'Talk B',
      fromTime: '2020-07-06 09:00',
      kind: 'talk',
      room: 'c'
    } as {} as ScheduleEvent;
    const e3 = {
      title: 'Talk C',
      fromTime: '2020-07-06 09:00',
      kind: 'talk',
      room: 'b'
    } as {} as ScheduleEvent;
    // WHEN
    const result = prepareScheduleForDomPrint([e0, e1, e2, e3]);
    // THEN
    expect(result).toEqual([
      e0,
      [e1, e3, e2]
    ]);
  });

  it('should allow events at the beginning without everyone event', () => {
    // GIVEN
    const e1 = {
      title: 'Talk A',
      fromTime: '2020-07-06 09:00',
      kind: 'talk',
      room: 'a'
    } as {} as ScheduleEvent;
    const e2 = {
      title: 'Talk B',
      fromTime: '2020-07-06 09:00',
      kind: 'talk',
      room: 'c'
    } as {} as ScheduleEvent;
    const e3 = {
      title: 'Talk C',
      fromTime: '2020-07-06 09:00',
      kind: 'talk',
      room: 'b'
    } as {} as ScheduleEvent;
    // WHEN
    const result = prepareScheduleForDomPrint([e1, e2, e3]);
    // THEN
    expect(result).toEqual([
      [e1, e3, e2]
    ]);
  });
});
