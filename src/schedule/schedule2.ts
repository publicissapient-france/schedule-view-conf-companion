import moment from 'moment';

type ScheduleEvent = {
  readonly fromTime: string
  readonly toTime: string
  readonly room: string
}

export type UiScheduleEvent = ScheduleEvent & {
  readonly top: number
  readonly height: number
  readonly room: string
}

const computeTopAndHeight = (events: ScheduleEvent[], earlierEvent: ScheduleEvent) =>
  events.map(event => ({
    ...event,
    top: moment(moment(event.fromTime)).diff(earlierEvent.fromTime, 'minutes'),
    height: moment(event.toTime).diff(moment(event.fromTime), 'minutes')
  }));

const splitByRoom = (acc: { [k: string]: UiScheduleEvent[] }, event: UiScheduleEvent) => {
  if (!acc[event.room]) {
    acc[event.room] = [];
  }
  acc[event.room].push(event);
  return acc;
};

export const computeSchedule = (events: ScheduleEvent[]): UiScheduleEvent[][] => {
  const earlierEvent = events.sort((a, b) =>
    moment(a.fromTime).diff(moment(b.fromTime)))[0];
  return Object.values(
    computeTopAndHeight(events, earlierEvent)
      .reduce(splitByRoom, {})
  );
};
