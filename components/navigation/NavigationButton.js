import React, { Component } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { StyleSheet } from 'react-native';
import { colors } from './../../configs/colors';
import FAIcon from 'react-native-vector-icons/FontAwesome5';
import { Text } from 'react-native-paper';

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
        color: colors.turquoise_light,
        padding: 5,
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
        borderColor: colors.turquoise_light,
        padding: 5,
        aspectRatio: 1,
        color: colors.white,
        backgroundColor: colors.turquoise_light
    },
    activeIcon: {
        display: 'flex',
        alignSelf: 'center',
        fontSize: 16,
        color: colors.white
    },
    nonActiveIcon: {
        display: 'flex',
        alignSelf: 'center',
        fontSize: 16,
        color: colors.turquoise_light
    },
    activeText: {
        display: 'flex',
        alignSelf: 'center',
        fontSize: 10,
        color: colors.white,
        marginTop: 5
    },
    nonActiveText: {
        display: 'flex',
        alignSelf: 'center',
        fontSize: 9,
        color: colors.turquoise_light,
        marginTop: 5,
    }
})
