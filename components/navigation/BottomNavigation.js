import NavigationButton from '@navigation/NavigationButton';
import { getUiService } from '@service/UiService';
import { observer } from 'mobx-react';
import React, { Component } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import { flex, justifyContent, margin, padding } from '../../configs/styles';
import { getSettingsService } from '../../service/SettingsService';

export const BottomTabNavigation = [
    {
        componentId: "ProfilScreen",
        faIcon: "user",
        translationId: "navigation_home"
    },
    {
        componentId: "MedicationScreen",
        faIcon: "calendar",
        translationId: "navigation_medication"
    },
    {
        componentId: "RecipeBookScreen",
        faIcon: "utensils",
        translationId: "navigation_cookbook"
    },
    {
        componentId: "InformationScreen",
        faIcon: "info",
        translationId: "navigation_informations"
    },
    {
        componentId: "SettingsScreen",
        faIcon: "cogs",
        translationId: "navigation_settings"
    }
];

@observer
export default class BottomNavigation extends Component {

    settings = [];

    constructor(props) {
        super(props);
    }

    render() {
        // important, so that this screen rerenders after every change
        this.settings = getSettingsService().settings;

        return (
            <View style={navigationBar}>
                {
                    BottomTabNavigation.map(navigationComponent => {
                        return <NavigationButton key={navigationComponent.componentId}
                            onPress={() => { getUiService().navigateToComponent(navigationComponent.componentId) }}
                            active={(getUiService().navigationActivePage === navigationComponent.componentId) ? true : false}
                            icon={navigationComponent.faIcon} text={getUiService().getTranslation(navigationComponent.translationId)}>
                        </NavigationButton>
                    })
                }
            </View>
        )
    }
}

const navigationBar = StyleSheet.flatten([
    flex.flexRow,
    justifyContent.justifyEvenly,
    padding.padding_y_3,
    padding.padding_x_1,
    { borderTopWidth: 0.25 },
    { borderColor: getUiService().theme.primary }
])