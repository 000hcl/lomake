import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Dropdown, Icon, Label, Menu } from 'semantic-ui-react'
import { images } from 'Utilities/common'
import { logoutAction } from 'Utilities/redux/currentUserReducer'
import { setLanguage } from 'Utilities/redux/languageReducer'
import { useTranslation } from 'react-i18next'

export default () => {
  const dispatch = useDispatch()
  const { t, i18n } = useTranslation()
  const user = useSelector(state => state.currentUser.data)
  const lang = useSelector(state => state.language)

  const setLanguageCode = code => {
    dispatch(setLanguage(code))
    i18n.changeLanguage(code)
  }

  const handleLogout = () => {
    dispatch(logoutAction())
  }

  const handleUnhijack = () => {
    window.localStorage.removeItem('adminLoggedInAs')
    window.location.reload()
  }

  const unHijackButton = () => {
    return (
      <Menu.Item data-cy="sign-in-as" onClick={handleUnhijack}>
        <Label color="green" horizontal>
          Unhijack
        </Label>
      </Menu.Item>
    )
  }

  const GoToAdminPageButton = () => {
    return (
      <Menu.Item data-cy="nav-admin" as={Link} to="/admin" name="adminControls">
        {t('adminPage')}
      </Menu.Item>
    )
  }

  if (!user) return null
  return (
    <Menu id="navBar-wrapper" stackable compact fluid>
      <Menu.Item as={Link} to="/">
        <img style={{ width: '75px', height: 'auto' }} src={images.toska_color} alt="tosca" />
      </Menu.Item>
      {user.admin ? <GoToAdminPageButton /> : null}
      <Menu.Item>
        <a href="mailto:ospa@helsinki.fi">
          <Icon name="mail outline" />
          ospa@helsinki.fi
        </a>
      </Menu.Item>
      <Menu.Menu>
        <Dropdown data-cy="navBar-localeDropdown" item text={`${t('chosenLanguage')} (${lang.toUpperCase()}) `} simple>
          <Dropdown.Menu>
            <Dropdown.Item data-cy="navBar-localeOption-fi" value="fi" onClick={() => setLanguageCode('fi')}>
              Suomi
            </Dropdown.Item>
            <Dropdown.Item data-cy="navBar-localeOption-se" value="se" onClick={() => setLanguageCode('se')}>
              Svenska
            </Dropdown.Item>
            <Dropdown.Item data-cy="navBar-localeOption-en" value="en" onClick={() => setLanguageCode('en')}>
              English
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Menu>
      <Menu.Menu position="right">
        {window.localStorage.getItem('adminLoggedInAs') ? unHijackButton() : null}
        <Menu.Item style={{ borderRight: '1px solid rgba(34,36,38,.15)' }} as={Link} to="/about">
          {t('about')}
        </Menu.Item>
        <Menu.Item data-cy="nav-logout" name="log-out" onClick={handleLogout}>
          {`${t('logOut')} (${user.uid})`}
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  )
}
