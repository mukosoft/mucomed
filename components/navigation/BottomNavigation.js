import NavigationButton from '@navigation/NavigationButton';
import { getUiService } from '@service/UiService';
import { observer } from 'mobx-react';
import React, { Component } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import { flex, justifyContent, padding } from '../../configs/styles';

export const BottomTabNavigation = [
    {
        componentId: "ProfilScreen",
        faIcon: "user",
        text: "Profil"
    },
    {
        componentId: "MedicationScreen",
        faIcon: "calendar",
        text: "Kalendar"
    },
    {
        componentId: "RecipeBookScreen",
        faIcon: "utensils",
        text: "Kochbuch"
    },
    {
        componentId: "InformationScreen",
        faIcon: "info",
        text: "Infos"
    },
    {
        componentId: "SettingsScreen",
        faIcon: "cogs",
        text: "Einstellungen"
    }
];

@observer
export default class BottomNavigation extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={navigationBar}>
                {
                    BottomTabNavigation.map(navigationComponent => {
                        return <NavigationButton key={navigationComponent.componentId}
                            onPress={() => {getUiService().navigateToComponent(navigationComponent.componentId)}} 
                            active={ (getUiService().navigationActivePage === navigationComponent.componentId) ? true : false} 
                            icon={navigationComponent.faIcon} text={navigationComponent.text}>
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
    padding.padding_3,
    { borderTopWidth: 0.25 },
    { borderColor: getUiService().theme.primary }
])