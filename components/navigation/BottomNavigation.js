import React, { Component } from 'react';
import { View } from 'react-native';
import NavigationButton from './NavigationButton';
import { StyleSheet } from 'react-native';
import { colors } from './../../configs/colors';
import { getUiService } from './../../service/UiService';
import { observer } from 'mobx-react';
import BottomTabNavigation from './BottomTabNavigation';

@observer
export default class BottomNavigation extends Component {
    render() {
        return (
            <View style={styles.navigationBar}>
                {
                    BottomTabNavigation.map(navigationComponent => {
                        return <NavigationButton 
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

const styles = StyleSheet.create({
    navigationBar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        padding: 10,
        borderTopWidth: 0.25,
        borderColor: colors.turquoise_light
    },
})
