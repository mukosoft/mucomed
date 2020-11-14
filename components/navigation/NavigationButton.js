import { getUiService } from '@service/UiService';
import React, { Component } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import FAIcon from 'react-native-vector-icons/FontAwesome5';

export default class NavigationButton extends Component {
    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress}>
                <View style={(this.props.active === true) ? styles.activeContainer : styles.nonActiveContainer}>
                    <FAIcon name={this.props.icon} style={(this.props.active === true) ? styles.activeIcon : styles.nonActiveIcon}/>
                    <Text style={(this.props.active === true) ? styles.activeText : styles.nonActiveText}>{this.props.text}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    nonActiveContainer: {
        display: 'flex',
        flexDirection: 'column',
        minWidth: 60,
        alignContent: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: getUiService().theme.secondary,
        aspectRatio: 1,
    },
    activeContainer: {
        display: 'flex',
        flexDirection: 'column',
        minWidth: 60,
        alignContent: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        borderRadius: 7,
        aspectRatio: 1,
        color: getUiService().theme.secondary,
        backgroundColor: getUiService().theme.primary
    },
    activeIcon: {
        display: 'flex',
        alignSelf: 'center',
        fontSize: 16,
        color: getUiService().theme.secondary
    },
    nonActiveIcon: {
        display: 'flex',
        alignSelf: 'center',
        fontSize: 16,
        color: getUiService().theme.primary
    },
    activeText: {
        display: 'flex',
        alignSelf: 'center',
        fontSize: 10,
        color: getUiService().theme.secondary,
        marginTop: 5
    },
    nonActiveText: {
        display: 'flex',
        alignSelf: 'center',
        fontSize: 10,
        color: getUiService().theme.primary,
        marginTop: 5,
    }
})
