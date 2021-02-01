import moment from 'moment';

export type SlotRoom =
  'Auditorium'
  | 'Avenir Book'
  | 'Avenir Light'
  | 'Avenir Roman'
  | 'Arial'
  | 'Avenir Black'
  | 'Avenir Medium'

export type SlotType = 'talk' | 'handson' | 'break' | 'lunch' | 'keynote'

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

// TODO: Beurk
export function computeSlotStyle(slot: Slot, rooms: SlotRoom[], toExclude: string[]) {
  const threshold = 5;
  let gridColumn = `track-1-start / track-${rooms.length}-end`;

  if (!toExclude.includes(slot.type)) {
    const roomIndex = rooms.findIndex(value => value === slot.room);
    gridColumn = `track-${roomIndex + 1}`;
  }

  const startInHourMinutes = moment(slot.fromTime, 'YYYY-MM-DD HH:mm')
    .subtract('minutes', 5)
    .format('HHmm');

  let endInHourMinutes = moment(slot.toTime, 'YYYY-MM-DD HH:mm')
    .format('HHmm');

  const endInMinute = endInHourMinutes.slice(0, -2);

  // TODO
  if (Number(endInMinute) % 10 === threshold) {
    endInHourMinutes = endInHourMinutes.slice(0, -1) + '0';
  }

  return {
    'grid-column': gridColumn,
    'grid-row': `time-${startInHourMinutes} / time-${endInHourMinutes}`,
  };
}
