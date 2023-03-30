import React from 'react';
import MetisMenu from '../../theme/js/metismenu/src';
import { useAuth } from '../../provider/AuthProvider';

const adminMenu = [
    {
        id: 1,
        icon: 'flaticon-381-controls-3',
        label: 'Dashboard',
        to: '/',
    },
    {
        id: 2,
        icon: 'flaticon-381-user',
        label: 'Users',
        to: 'users/list',
    },

    {
        id: 3,
        icon: 'icon-go',
        label: 'Godowns',
        to: 'location/list',
    },
    {
        id: 4,
        icon: 'icon-it',
        label: 'Items',
        to: 'item/list',
    },
    {
        id: 5,
        icon: 'icon-sl',
        label: 'Storage',
        to: 'storage_location/list',
    },
    {
        id: 6,
        icon: 'icon-qc',
        label: 'QC Name',
        to: 'qc_name/list',
    },
    {
        id: 7,
        icon: 'icon-su',
        label: 'Supplier',
        to: 'supplier/list',
    },

    {
        id: 8,
        icon: 'flaticon-381-enter',
        label: 'Inwards',
        to: 'inwards/list',
    },
    {
        id: 9,
        icon: 'flaticon-381-exit-1',
        label: 'Outwards',
        to: 'outwards/list',
    },
    {
        id: 10,
        icon: 'flaticon-381-controls-2',
        label: 'Inters',
        to: 'inters/list',
    },
    {
        id: 11,
        icon: 'flaticon-381-box-1',
        label: 'Log',
        to: 'logs/list',
    },
];

const userMenu = [
    {
        id: 1,
        icon: 'flaticon-381-controls-3',
        label: 'Dashboard',
        to: '/',
    },
    {
        id: 2,
        icon: 'flaticon-381-enter',
        label: 'Inwards',
        to: 'inwards/list',
    },
    {
        id: 3,
        icon: 'flaticon-381-exit-1',
        label: 'Outwards',
        to: 'outwards/list',
    },
    {
        id: 4,
        icon: 'flaticon-381-controls-2',
        label: 'Inters',
        to: 'inters/list',
    },
    {
        id: 5,
        icon: 'flaticon-381-box-1',
        label: 'Log',
        to: 'logs/list',
    },
];


const Menu = (() => {
    const { user } = useAuth();
    let menu = userMenu;
    if (user && user.user_role) {
        menu = (user.user_role == 'admin') ? adminMenu : userMenu;
    }
    return (
        // Custom Metismenu 
        <MetisMenu
            ref={(r) => { menu = r; }}
            activeLinkFromLocation
            noBuiltInClassNames
            classNameItem=""
            classNameContainer=""
            classNameItemActive="mm-active open"
            classNameLink=""
            classNameLinkActive="mm-active"
            classNameLinkHasChild="has-arrow ai-icon"
            classNameLinkHasActiveChild="mm-active"
            classNameItemHasActiveChild="mm-active open"
            classNameContainerVisible="mm-show"
            classNameItemHasVisibleChild="mm-active"
            classNameTextSpan="nav-text"
            iconNamePrefix=""
            iconNameStateHidden=""
            iconNameStateVisible=""
            onSelected={(e) => { }}
            content={menu}
        />
    );

});

export default Menu;
