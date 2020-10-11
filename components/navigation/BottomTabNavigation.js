import {colors} from '../../configs/colors';

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
                                    text: 'Home',
                                    icon: require("../../etc/icons/calendar.png"),
                                    textColor: colors.white,
                                    selectedTextColor: colors.orange
                                },
                                topBar: {
                                    title: {
                                        text: 'Home',
                                    },
                                },
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
                                    text: 'Kochbuch',
                                    icon: require("../../etc/icons/recipe-book.png"),
                                    textColor: colors.white,
                                    selectedTextColor: colors.orange
                                },
                                topBar: {
                                    title: {
                                        text: 'Kochbuch',
                                    },
                                },
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
                                    text: 'Informationen',
                                    icon: require("../../etc/icons/information.png"),
                                    textColor: colors.white,
                                    selectedTextColor: colors.orange
                                },
                                topBar: {
                                    title: {
                                        text: 'Informationen',
                                    },
                                },
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
                                    text: 'Profil',
                                    icon: require("../../etc/icons/online-appointment.png"),
                                    textColor: colors.white,
                                    selectedTextColor: colors.orange
                                },
                                topBar: {
                                    title: {
                                        text: 'Profil',
                                    },
                                },
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
        },
    }
}