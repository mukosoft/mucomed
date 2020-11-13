import React, { Component } from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import FAIcon from 'react-native-vector-icons/FontAwesome5';

import { colors } from '@configs/colors';
import { defaultStyles } from '@configs/styles';

/**
 * Renders an primary button.
 * 
 * @author Dominique Börner
 */
export default class PrimaryButton extends Component {
    render() {
        return (
            <TouchableWithoutFeedback>
                <View style={styles.button}>
                    <FAIcon style={styles.text} name={this.props.faIcon} />
                    <Text style={styles.text}>{ this.props.text }</Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: defaultStyles.defaultBorderRadius.borderRadius,
    },
    text: {
        fontSize: 12,
        color: colors.white,
        margin: 2
    }
})
