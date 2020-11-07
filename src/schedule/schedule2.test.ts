import { computeSchedule } from '@/schedule/schedule2';

describe('Schedule2', () => {
  it('should calculate height and top based on duration and fromTime', () => {
    // GIVEN
    const schedule = [
      {
        fromTime: '2020-07-06 09:00',
        toTime: '2020-07-06 09:30',
        room: 'a',
        kind: 'talk'
      },
      {
        fromTime: '2020-07-06 10:00',
        toTime: '2020-07-06 11:00',
        room: 'a',
        kind: 'talk'
      }
    ];
    // WHEN
    const result = computeSchedule(schedule);
    // THEN
    expect(result).toEqual([
      [{ ...schedule[0], top: 0, height: 30 }, { ...schedule[1], top: 60, height: 60 }]
    ]);
  });
  it('should split by room', () => {
    // GIVEN
    const schedule = [
      {
        fromTime: '2020-07-06 09:00',
        toTime: '2020-07-06 09:30',
        room: 'a',
        kind: 'talk'
      },
      {
        fromTime: '2020-07-06 10:00',
        toTime: '2020-07-06 11:00',
        room: 'b',
        kind: 'talk'
      }
    ];
    // WHEN
    const result = computeSchedule(schedule);
    // THEN
    expect(result).toEqual([
      [{ ...schedule[0], top: 0, height: 30 }],
      [{ ...schedule[1], top: 60, height: 60 }]
    ]);
  });
  it('should define room', () => {
    // GIVEN
    const e1 = {
      fromTime: '2020-07-06 09:00',
      toTime: '2020-07-06 09:30',
      kind: 'talk'
    };
    const e2 = {
      fromTime: '2020-07-06 09:30',
      toTime: '2020-07-06 10:00',
      kind: 'talk'
    };
    const e3 = {
      fromTime: '2020-07-06 09:00',
      toTime: '2020-07-06 10:00',
      kind: 'talk'
    };
    // WHEN
    const schedule = computeSchedule([e1, e2, e3]);
    // THEN
    expect(schedule).toEqual([
      [{ ...e1, top: 0, height: 30, room: 'Room 0' }, { ...e2, top: 30, height: 30, room: 'Room 0' }],
      [{ ...e3, top: 0, height: 60, room: 'Room 1' }]
    ]);
  });
});
