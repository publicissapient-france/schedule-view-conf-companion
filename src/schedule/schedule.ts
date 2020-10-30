import moment, { Moment } from 'moment';

export type ScheduleEvent = {
  fromTime: string;
  start?: Moment;
  id: string;
  room?: string;
  conferenceUrl?: string;
  summary: string;
  title: string;
  toTime: string;
  type: string;
  kind: string;
  speakers: {
    name: string;
    id: string;
  }[];
};

export const prepareScheduleForDomPrint = (events: ScheduleEvent[]) => {

  const theDay = moment(events[0].fromTime);

  events.push({
    fromTime: new Date(
      theDay.year(),
      theDay.month(),
      theDay.date(),
      23,
      59).toISOString(),
    id: 'last-of-the-day',
    kind: 'keynote'
  } as ScheduleEvent);

  events.push({
    fromTime: new Date(
      theDay.year(),
      theDay.month(),
      theDay.date(),
      0,
      1).toISOString(),
    id: 'first-of-the-day',
    kind: 'keynote'
  } as ScheduleEvent);

  const eventsWithEveryone: { [p: string]: ScheduleEvent | ScheduleEvent[] } =
    events
      .filter(e => e.kind && e.kind.match(/keynote|break/))
      .sort((a, b) => moment(a.fromTime).diff(moment(b.fromTime)))
      .reduce<{ [key: string]: ScheduleEvent }>((result, item) => {
        result[item.fromTime] = item;
        return result;
      }, {});

  const result = { ...eventsWithEveryone };

  const eventsForGroup = events.filter(e => !e.kind || !e.kind.match(/keynote|break/));

  const roomDefined = eventsForGroup.filter(event => !event.room).length === 0;

  for (const ev of eventsForGroup) {
    for (let i = 0; i < Object.keys(eventsWithEveryone).length; i++) {
      if (moment(ev.fromTime).isBetween(Object.keys(eventsWithEveryone)[i], Object.keys(eventsWithEveryone)[i + 1])) {
        if (Array.isArray(result[`${Object.keys(eventsWithEveryone)[i]} 1`])) {
          (result[`${Object.keys(eventsWithEveryone)[i]} 1`] as ScheduleEvent[]).push(ev);
        } else if (result[`${Object.keys(eventsWithEveryone)[i]} 1`]) {
          result[`${Object.keys(eventsWithEveryone)[i]} 1`] = [result[`${Object.keys(eventsWithEveryone)[i]} 1`] as ScheduleEvent, ev];
        } else {
          result[`${Object.keys(eventsWithEveryone)[i]} 1`] = ev;
        }
      }
    }
  }

  return Object
    .keys(result)
    .sort((a, b) => a.localeCompare(b))
    .reduce<any[]>((arr: any, item) => {
      arr.push(result[item]);
      return arr;
    }, [])
    .filter(item =>
      item.id !== 'last-of-the-day'
      && item.id !== 'first-of-the-day')
    .map(item => {
      if (Array.isArray(item)) {
        if (!roomDefined) {
          const columns: string[] = [];
          item.forEach(event => {
            const column = columns.findIndex((e: string) =>
              moment(e).isSameOrBefore(event.fromTime));
            if (column >= 0) {
              columns[column] = event.toTime;
              event.room = `Room ${column}`;
            } else {
              const length = columns.length;
              columns[length] = event.toTime;
              event.room = `Room ${length}`;
            }
          });
        }
        return Object.values(
          item
            .sort((a, b) => a.room.localeCompare(b.room))
            .reduce((obj, it) => {
              if (Array.isArray(obj[it.room])) {
                obj[it.room].push(it);
              } else if (obj[it.room]) {
                obj[it.room] = [obj[it.room], it];
              } else {
                obj[it.room] = it;
              }
              if (Array.isArray(obj[it.room])) {
                obj[it.room].sort((a: ScheduleEvent, b: ScheduleEvent) =>
                  moment(a.fromTime).diff(moment(b.fromTime)));
              }
              return obj;
            }, {}));
      }
      return item;
    });
};
