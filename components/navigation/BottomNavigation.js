import { observer } from 'mobx-react';
import React, { Component } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';

import { colors } from './../../configs/colors';
import { getUiService } from './../../service/UiService';
import BottomTabNavigation from './BottomTabNavigation';
import NavigationButton from './NavigationButton';

@observer
export default class BottomNavigation extends Component {
    render() {
        return (
            <View style={styles.navigationBar}>
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
