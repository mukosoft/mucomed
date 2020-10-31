import React from "react";
import { colors } from '../../configs/colors';
import { getUiService } from "../../service/UiService";
import { Image } from 'react-native';
import { Logo } from "./../../ic_launcher_round.png";

const topBar = {
    leftButtons: [{
        icon: require('./../../ic_launcher_round.png'),
    }],
    rightButtons: [{
        icon: require('./../../assets/icons/gear.png'),
        id: 'openSettings',
    }],
    background: colors.red,
    elevation: 7
}

/**
 * Bottom Tab Navigation.
 *
 * This includes all screens to the bottom tab navigation bar.
 *
 * @author Dominique Börner
 */
export default {
    children: [
        {
            stack: {
                children: [
                    {
                        component: {
                            name: 'HomeScreen',
                            options: {
                                bottomTab: {
                                    text: getUiService().getTranslation('navigation_home'),
                                    icon: require("../../etc/icons/calendar.png"),
                                    textColor: colors.white,
                                    selectedTextColor: colors.orange
                                },
                                topBar: topBar
                            }
                        },
                    }
                ],
            },
        },
        {
            stack: {
                children: [
                    {
                        component: {
                            name: 'CookbookScreen',
                            options: {
                                bottomTab: {
                                    text: getUiService().getTranslation('navigation_cookbook'),
                                    icon: require("../../etc/icons/recipe-book.png"),
                                    textColor: colors.white,
                                    selectedTextColor: colors.orange
                                },
                                topBar: topBar
                            }
                        },
                    }
                ],
            },
        },
        {
            stack: {
                children: [
                    {
                        component: {
                            name: 'InformationScreen',
                            options: {
                                bottomTab: {
                                    text: getUiService().getTranslation('navigation_informations'),
                                    icon: require("../../etc/icons/information.png"),
                                    textColor: colors.white,
                                    selectedTextColor: colors.orange
                                },
                                topBar: topBar
                            }
                        },
                    }
                ],

            },
        },
        {
            stack: {
                children: [
                    {
                        component: {
                            name: 'ProfilScreen',
                            options: {
                                bottomTab: {
                                    text: getUiService().getTranslation('navigation_profile'),
                                    icon: require("../../etc/icons/online-appointment.png"),
                                    textColor: colors.white,
                                    selectedTextColor: colors.orange,
                                },
                                topBar: topBar
                            }
                        },
                    }
                ],

            },
        },
    ],
    options: {
        bottomTabs: {
            animate: 'true',
            backgroundColor: colors.turquoise_dark,
            titleDisplayMode: 'alwaysShow',
            underline: colors.orange,
            tabsAttachMode: 'afterInitialTab',
        },
    }
}