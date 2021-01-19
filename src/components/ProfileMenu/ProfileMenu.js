import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap'
import { useAuth0 } from '@auth0/auth0-react'
import { withRouter, Link } from 'react-router-dom'
import { withTranslation } from 'react-i18next'

import './profileMenu.scss'

const ProfileMenu = props => {
    const [menu, setMenu] = useState(false)
    const {
        isLoading,
        user,
        loginWithRedirect,
        logout,
        isAuthenticated,
    } = useAuth0()

    const clearAndLogout = () => {
        localStorage.removeItem('budgets')
        localStorage.removeItem('startDate')
        localStorage.removeItem('endDate')
        logout()
    }

    return (
        <React.Fragment>
            <Dropdown
                isOpen={menu}
                toggle={() => setMenu(!menu)}
                className="d-inline-block"
            >
                {user && user.picture && (
                    <DropdownToggle
                        className="btn header-item waves-effect"
                        id="page-header-user-dropdown"
                        tag="button"
                    >
                        <img
                            src={user.picture}
                            alt="My Avatar"
                            id="user-avatar"
                        />
                        <span className="d-none d-xl-inline-block ml-2 mr-1">
                            {user.name}
                        </span>
                        <i className="mdi mdi-chevron-down d-none d-xl-inline-block" />
                    </DropdownToggle>
                )}
                {!user && (
                    <DropdownToggle
                        className="btn header-item waves-effect"
                        id="page-header-user-dropdown"
                        tag="button"
                    >
                        <img
                            src={
                                'https://res.cloudinary.com/yemiwebby-com-ng/image/upload/v1513770253/WEB_FREAK_50PX-01_yaqxg7.png'
                            }
                            alt="My Avatar"
                            id="guest-avatar"
                        />
                        <span className="d-none d-xl-inline-block ml-2 mr-1">
                            Guest
                        </span>
                        <i className="mdi mdi-chevron-down d-none d-xl-inline-block" />
                    </DropdownToggle>
                )}
                {!isLoading && !user && (
                    <DropdownMenu right>
                        <Link
                            to="/login"
                            onClick={loginWithRedirect}
                            className="dropdown-item"
                        >
                            <i className="bx bx-log-in font-size-16 align-middle mr-2 text-success" />
                            <span>{props.t('Login')}</span>
                        </Link>
                    </DropdownMenu>
                )}
                {isAuthenticated && (
                    <DropdownMenu right>
                        <DropdownItem tag="a" href="/profile">
                            {' '}
                            <i className="bx bx-user font-size-16 align-middle mr-1" />
                            {props.t('Profile')}{' '}
                        </DropdownItem>
                        <DropdownItem tag="a" href="/budgets">
                            <i className="bx bx-wallet font-size-16 align-middle mr-1" />
                            {props.t('My Budgets')}
                        </DropdownItem>
                        <div className="dropdown-divider" />
                        <Link
                            to="/logout"
                            onClick={clearAndLogout}
                            className="dropdown-item"
                        >
                            <i className="bx bx-power-off font-size-16 align-middle mr-2 text-danger" />
                            <span>{props.t('Logout')}</span>
                        </Link>
                    </DropdownMenu>
                )}
            </Dropdown>
        </React.Fragment>
    )
}

ProfileMenu.propTypes = {
    t: PropTypes.any,
}

export default withRouter(withTranslation()(ProfileMenu))
