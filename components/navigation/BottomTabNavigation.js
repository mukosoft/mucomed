import {colors} from '../../configs/colors';
import {getUiStore, UiStore} from "../../stores/UiStore";

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
                                    text: getUiStore().getTranslation('navigation_home'),
                                    icon: require("../../etc/icons/calendar.png"),
                                    textColor: colors.white,
                                    selectedTextColor: colors.orange
                                },
                                topBar: {
                                    title: {
                                        text: getUiStore().getTranslation('navigation_home'),
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
                                    text: getUiStore().getTranslation('navigation_cookbook'),
                                    icon: require("../../etc/icons/recipe-book.png"),
                                    textColor: colors.white,
                                    selectedTextColor: colors.orange
                                },
                                topBar: {
                                    title: {
                                        text: getUiStore().getTranslation('navigation_cookbook'),
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
                                    text: getUiStore().getTranslation('navigation_informations'),
                                    icon: require("../../etc/icons/information.png"),
                                    textColor: colors.white,
                                    selectedTextColor: colors.orange
                                },
                                topBar: {
                                    title: {
                                        text: getUiStore().getTranslation('navigation_informations'),
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
                                    text: getUiStore().getTranslation('navigation_profile'),
                                    icon: require("../../etc/icons/online-appointment.png"),
                                    textColor: colors.white,
                                    selectedTextColor: colors.orange,
                                },
                                topBar: {
                                    title: {
                                        text: getUiStore().getTranslation('navigation_profile'),
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
            underline: colors.orange,
            tabsAttachMode: 'afterInitialTab',
        },
    }
}