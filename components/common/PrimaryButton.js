import BorderedContainer from '@Components/common/BorderedContainer';
import { defaultStyles } from '@configs/styles';
import { getUiService } from '@service/UiService';
import React, { Component } from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import FAIcon from 'react-native-vector-icons/FontAwesome5';

/**
 * Renders an primary button.
 * 
 * @author Dominique Börner
 */
export default class PrimaryButton extends Component {
    render() {
        return (
            <TouchableWithoutFeedback>
                <BorderedContainer style={styles.button}>
                    <FAIcon style={styles.text} name={this.props.faIcon} />
                    <Text style={styles.text}>{ this.props.text }</Text>
                </BorderedContainer>
            </TouchableWithoutFeedback>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: getUiService().theme.primary,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: defaultStyles.defaultBorderRadius.borderRadius,
    },
    text: {
        fontSize: 12,
        color: getUiService().theme.secondary,
        margin: 2
    }
})
