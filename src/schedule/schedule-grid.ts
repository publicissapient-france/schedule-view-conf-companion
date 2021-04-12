import moment from 'moment';

export type SlotRoom =
  'Auditorium'
  | 'Avenir Book'
  | 'Avenir Light'
  | 'Avenir Roman'
  | 'Arial'
  | 'Avenir Black'
  | 'Avenir Medium'

export type SlotType = 'talk' | 'handson' | 'break' | 'lunch' | 'keynote' | 'party'

export type SlotSpeaker = { id: string, name: string }

export type SlotKind = 'keynote'

export type Slot = {
  conferenceId: string;
  conferenceUrl: string;
  fromTime: string
  id: string
  room: SlotRoom
  speakers: SlotSpeaker[]
  summary: string
  title: string
  toTime: string
  type: SlotType
  kind?: SlotKind
}

export type SlotStyle = {
  'grid-column': string;
  'grid-row': string;
}

export function getAllSlotsRooms(slots: Slot[]): SlotRoom[] {
  return slots.reduce((accumulator: SlotRoom[], { room }) => {
    !accumulator.includes(room) && accumulator.push(room);
    return accumulator;
  }, []);
}

function computeSlotStartTime(fromTime: moment.Moment, threshold: number): moment.Moment {
  if (
    fromTime.minutes() + threshold === 30
    || fromTime.minutes() - threshold === 30
    || fromTime.minutes() === 30
  ) {
    return fromTime.set('minute', 30);
  }
  if (
    fromTime.minutes() + threshold === 60
    || fromTime.minutes() - threshold === 0
    || fromTime.minutes() === 0
  ) {
    return fromTime.set('minute', 0);
  }
  return fromTime;
}

function computeSlotEndTime(toTime: moment.Moment, threshold: number): moment.Moment {
  if (
    toTime.minutes() + threshold === 30
    || toTime.minutes() - threshold === 30
  ) {
    return toTime.set('minute', 30);
  }
  if (toTime.minutes() + threshold === 60) {
    return toTime.add('hour', 1).set('minute', 0);
  }
  if (toTime.minutes() - threshold === 0) {
    return toTime.set('minute', 0);
  }
  return toTime;
}

export function computeSlotStyle(
  { type, room, fromTime, toTime }: Slot,
  availableSlotRooms: SlotRoom[],
  slotTypeToExclude: SlotType[] = ['lunch', 'break', 'keynote', 'party'],
  slotTimeThreshold = 5,
): SlotStyle {
  const gridColumn = (!slotTypeToExclude.includes(type))
    ? `track-${availableSlotRooms.findIndex(slotRoom => slotRoom === room) + 1}`
    : `track-1-start / track-${availableSlotRooms.length}-end`;

  const startAt = computeSlotStartTime(moment(fromTime, 'YYYY-MM-DD HH:mm'), slotTimeThreshold).format('HHmm');
  const endAt = computeSlotEndTime(moment(toTime, 'YYYY-MM-DD HH:mm'), slotTimeThreshold).format('HHmm');

  return {
    'grid-column': gridColumn,
    'grid-row': `time-${startAt} / time-${endAt}`,
  };
}
