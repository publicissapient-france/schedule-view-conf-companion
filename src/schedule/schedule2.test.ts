import { computeSchedule } from '@/schedule/schedule2';

describe('Schedule2', () => {
  it('should calculate height and top based on duration and fromTime', () => {
    // GIVEN
    const schedule = [
      {
        fromTime: '2020-07-06 09:00',
        toTime: '2020-07-06 09:30',
        room: 'a'
      },
      {
        fromTime: '2020-07-06 10:00',
        toTime: '2020-07-06 11:00',
        room: 'a'
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
        room: 'a'
      },
      {
        fromTime: '2020-07-06 10:00',
        toTime: '2020-07-06 11:00',
        room: 'b'
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
});
