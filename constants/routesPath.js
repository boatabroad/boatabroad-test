import { HomeIcon } from '@heroicons/react/solid';

// LateralMenu menu paths
export const sharePath = [
  {
    name: 'Rent new Boat',
    href: '/dashboard',
    Icon: (props) => (
      <HomeIcon style={{ color: props.color }} className={props.className} />
    ),
  },
  {
    name: 'My Boats',
    href: '/myBoats',
    Icon: (props) => (
      <HomeIcon style={{ color: props.color }} className={props.className} />
    ),
  },
  {
    name: 'Insight',
    href: '/insight',
    Icon: (props) => (
      <HomeIcon style={{ color: props.color }} className={props.className} />
    ),
  },
];

export const supportPath = [
  {
    name: 'Messages',
    href: '/messages',
    Icon: (props) => (
      <HomeIcon style={{ color: props.color }} className={props.className} />
    ),
  },
  {
    name: 'Invoices',
    href: '/invoices',
    Icon: (props) => (
      <HomeIcon style={{ color: props.color }} className={props.className} />
    ),
  },
];

export const myAccountPath = [
  {
    name: 'My profile',
    href: '/myProfile',
    Icon: (props) => (
      <HomeIcon style={{ color: props.color }} className={props.className} />
    ),
  },
  {
    name: 'Log out',
    href: '/logOut',
    Icon: (props) => (
      <HomeIcon style={{ color: props.color }} className={props.className} />
    ),
  },
];
