import moment from 'moment';

export type ScheduleEvent = {
  readonly fromTime: string
  readonly toTime: string
  readonly room?: string
  readonly type: string
}

type ScheduleEventWithRoom = ScheduleEvent & {
  readonly room: string
}

export type UiScheduleEvent = ScheduleEvent & {
  readonly top: number
  readonly height: number
  readonly room: string
}

const computeTopAndHeight = (events: ScheduleEventWithRoom[], earlierEvent: ScheduleEvent) =>
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

function computeRooms(events: ScheduleEvent[]): ScheduleEventWithRoom[] {
  const columns: string[] = [];
  return events.map(event => {
    let pos = columns.findIndex(c => moment(c).isSameOrBefore(event.fromTime));
    if (pos < 0) {
      pos = columns.length;
    }
    columns[pos] = event.toTime;
    return {
      room: `Room ${pos}`,
      ...event
    };
  });
}

export const computeSchedule = (events: ScheduleEvent[]): UiScheduleEvent[][] => {
  const sortedEvents = events.sort((a, b) => moment(a.fromTime).diff(moment(b.fromTime)));
  const roomDefined = sortedEvents.filter(event => !event.room && !event.type.match(/keynote|break/)).length === 0;
  let eventsWithRoom: ScheduleEventWithRoom[];
  if (roomDefined) {
    eventsWithRoom = sortedEvents.map(event => event as ScheduleEventWithRoom);
  } else {
    eventsWithRoom = computeRooms(sortedEvents);
  }
  return Object.values(
    computeTopAndHeight(eventsWithRoom, sortedEvents[0])
      .reduce(splitByRoom, {})
  );
};
