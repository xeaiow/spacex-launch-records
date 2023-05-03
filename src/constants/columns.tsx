import {
  BsFillRocketTakeoffFill,
  BsCheckAll,
  BsFillCalendar2EventFill,
  BsBookmarksFill,
} from 'react-icons/bs';

export const columns = [
  {
    name: 'mission_name',
    label: 'Mission',
    icon: <BsCheckAll />,
    width: '120px',
  },
  {
    name: 'launch_date_utc',
    label: 'Date',
    icon: <BsFillCalendar2EventFill />,
    width: '100px',
  },
  {
    name: 'rocket_name',
    label: 'Rocket Name',
    icon: <BsFillRocketTakeoffFill />,
    width: '100px',
  },
  {
    name: 'rocket_type',
    label: 'Rocket Type',
    icon: <BsBookmarksFill />,
    width: '50px',
  }
];
