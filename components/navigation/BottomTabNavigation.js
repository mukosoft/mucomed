import { colors } from '../../configs/colors';
import { getUiService } from "../../stores/UiService";

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
                                topBar: {
                                    visible: false,
                                    height: 0
                                }
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
                                topBar: {
                                    visible: false,
                                    height: 0
                                }
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
                                topBar: {
                                    visible: false,
                                    height: 0
                                }
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
                                topBar: {
                                    visible: false,
                                    height: 0
                                }
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