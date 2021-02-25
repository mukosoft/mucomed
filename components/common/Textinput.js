import React, { Component } from 'react';
import { StyleSheet, TextInput as RNTextInput } from 'react-native';
import { getUiService } from '../../service/UiService';

/**
 * Renders an TextInput element.
 * 
 * @author Dominique Börner
 */
export default class TextInput extends Component {
    render() {
        return (
            <RNTextInput style={styles.input} onChangeText={this.props.onChangeText} value={this.props.value} keyboardType={this.props.keyboardType}/>             
        )
    }
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: getUiService().theme.secondary,
        fontSize: 18,
        paddingLeft: 10,
        color: getUiService().theme.text1
    }
})