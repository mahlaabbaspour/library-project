'use client'

// MUI Imports
// import { title } from 'node:process'

// import path from 'node:path'

import { title } from 'process'

import { useTheme } from '@mui/material/styles'

// Third-party Imports
import PerfectScrollbar from 'react-perfect-scrollbar'

// Type Imports
import type { VerticalMenuContextProps } from '@menu/components/vertical-menu/Menu'

// Component Imports
import { Menu, MenuItem, SubMenu } from '@menu/vertical-menu'

// Hook Imports
import useVerticalNav from '@menu/hooks/useVerticalNav'

// Styled Component Imports
import StyledVerticalNavExpandIcon from '@menu/styles/vertical/StyledVerticalNavExpandIcon'

// Style Imports
import menuItemStyles from '@core/styles/vertical/menuItemStyles'
import menuSectionStyles from '@core/styles/vertical/menuSectionStyles'

type RenderExpandIconProps = {
  open?: boolean
  transitionDuration?: VerticalMenuContextProps['transitionDuration']
}

type Props = {
  scrollMenu: (container: any, isPerfectScrollbar: boolean) => void
  panel: string
}

const RenderExpandIcon = ({ open, transitionDuration }: RenderExpandIconProps) => (
  <StyledVerticalNavExpandIcon open={open} transitionDuration={transitionDuration}>
    <i className='tabler-chevron-right' />
  </StyledVerticalNavExpandIcon>
)

const VerticalMenu = ({ scrollMenu }: Props) => {
  // Hooks
  const theme = useTheme()
  const verticalNavOptions = useVerticalNav()

  // Vars
  const { isBreakpointReached, transitionDuration } = verticalNavOptions

  const ScrollWrapper = isBreakpointReached ? 'div' : PerfectScrollbar

  const navAdmin = [
    // {
    //   title: 'اطلاعات پایه',
    //   icon: '/images/icons/menu/info.png',
    //   children: [
    //     {
    //       title: 'اعضای بازدید مدیریتی ایمنی بیمار',
    //       path: '/admin/MembersOfThePatientSafetyManagementVisit'
    //     },
    //     {
    //       title: 'سوالات بازدید مدیریتی ایمنی بیمار',
    //       path: '/admin/QuestionsForThePatientSafetyManagementVisit'
    //     }
    //   ]
    // },
    {
      title: 'کتاب ها',
      icon: '/images/icons/menu/open-book.png',
      children: [
        {
          title: 'فهرست',
          path: '/admin/Books'
        }
      ]
    },
    {
      title: 'اعضا',
      icon: '/images/icons/menu/team.png',
      children: [
        {
          title: 'فهرست',
          path: '/admin/Membership'
        }
      ]
    },
    {
      title: 'کارمندان',
      icon: '/images/icons/menu/staff.png',
      children: [
        {
          title: 'فهرست',
          path: '/admin/Staff'
        }
      ]
    },
    {
      title: 'امانت ها',
      icon: '/images/icons/menu/book.png',
      children: [
        {
          title: 'فهرست',
          path: '/admin/Borrowing'
        }
      ]
    },
    {
      title: 'صفحه فروشگاه ها',
      icon: '/images/icons/menu/store.png',
      children: [{ title: 'فروشگاه کتاب', path: '/admin/Shop' }]
    }
  ]

  function VerticalItem(item: any) {
    if (item?.children) {
      return (
        <SubMenu label={item.title} key={item.title} icon={item.icon}>
          {item.children.map((chl: any) => VerticalItem(chl))}
        </SubMenu>
      )
    }

    return (
      <MenuItem key={item.title} href={item.path}>
        {item.title}
      </MenuItem>
    )
  }

  return (
    // eslint-disable-next-line lines-around-comment
    /* Custom scrollbar instead of browser scroll, remove if you want browser scroll only */
    <ScrollWrapper
      {...(isBreakpointReached
        ? {
            className: 'bs-full overflow-y-auto overflow-x-hidden',
            onScroll: container => scrollMenu(container, false)
          }
        : {
            options: { wheelPropagation: false, suppressScrollX: true },
            onScrollY: container => scrollMenu(container, true)
          })}
    >
      {/* Incase you also want to scroll NavHeader to scroll with Vertical Menu, remove NavHeader from above and paste it below this comment */}
      {/* Vertical Menu */}
      <Menu
        popoutMenuOffset={{ mainAxis: 23 }}
        menuItemStyles={menuItemStyles(verticalNavOptions, theme)}
        renderExpandIcon={({ open }) => <RenderExpandIcon open={open} transitionDuration={transitionDuration} />}
        renderExpandedMenuItemIcon={{ icon: <i className='tabler-circle text-xs' /> }}
        menuSectionStyles={menuSectionStyles(verticalNavOptions, theme)}
      >
        {/* {
          (panel === 'admin' ? navAdmin : navInstitution).map(
            item => VerticalItem(item)
          )
        } */}

        {navAdmin.map((item: any) => VerticalItem(item))}
      </Menu>
      {/* <Menu
        popoutMenuOffset={{ mainAxis: 23 }}
        menuItemStyles={menuItemStyles(verticalNavOptions, theme)}
        renderExpandIcon={({ open }) => <RenderExpandIcon open={open} transitionDuration={transitionDuration} />}
        renderExpandedMenuItemIcon={{ icon: <i className='tabler-circle text-xs' /> }}
        menuSectionStyles={menuSectionStyles(verticalNavOptions, theme)}
      >
        <GenerateVerticalMenu menuData={menuData(dictionary)} />
      </Menu> */}
    </ScrollWrapper>
  )
}

export default VerticalMenu
