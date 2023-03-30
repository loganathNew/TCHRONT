/*
 * dev/App.js
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 21.08.2016
 * Changed Date: 01.08.2022 
*/

/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint-env browser */

import React from 'react';
import MetisMenu from '../../theme/js/metismenu/src';

//Embeds styles
//import './less/standart.less';

const menu1 = [
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
        to: 'users',
    },

    {
        id: 3,
        icon: 'icon-go',
        label: 'Godowns',
        to: 'location',
    },
    {
        id: 4,
        icon: 'icon-it',
        label: 'Items',
        to: 'Item',
    },
    {
        id: 5,
        icon: 'icon-sl',
        label: 'Storage',
        to: 'storage_location',
    },
    {
        id: 6,
        icon: 'icon-qc',
        label: 'QC Name',
        to: 'qc_name',
    },
    {
        id: 7,
        icon: 'icon-su',
        label: 'Supplier',
        to: 'supplier',
    },

    {
        id: 8,
        icon: 'flaticon-381-receive',
        label: 'Inwards',
        to: 'inwards',
    },
    {
        id: 9,
        icon: 'flaticon-381-send',
        label: 'Outwards',
        to: 'outwards',
    },

    //{
    // id: 5,
    // icon: 'flaticon-381-receive',
    // label: 'Inwards',
    // to: 'items',
    // content: [
    //     {
    //         id: 6,
    //         icon: 'flaticon-381-networking',
    //         label: 'Test',
    //         to: '#test',
    //     },
    // ],
    //},
];

class Menu extends React.Component {
    constructor() {
        super();

        this.state = {
            menu: menu1,
        };
    }
    render() {
        return (
            // Custom Metismenu 
            <MetisMenu
                ref={(r) => { this.menu = r; }}
                activeLinkFromLocation
                noBuiltInClassNames
                activeLinkLabel={this.state.activeLinkLabel}
                activeLinkId={this.state.activeLinkId}
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
                content={this.state.menu}
            />
        );
    }
}

export default Menu;
