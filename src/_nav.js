import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilDrop, cilSpeedometer } from '@coreui/icons'
import { CNavItem, CNavGroup } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Claims & Dispatches',
    to: '/claims-and-dispatches',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Tagcoin Market & Report',
    to: '/market-report',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Staking',
    to: '/staking',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Existing claim & dispatches',
        to: '/staking/existing-claim-dispatch',
      },
      {
        component: CNavItem,
        name: 'Staked items as per api',
        to: '/staking/staked-item-per-API',
      },
      {
        component: CNavItem,
        name: 'Staked items as per contract',
        to: '/staking/staked-item-per-contract',
      },
    ],
  },
]

export default _nav
