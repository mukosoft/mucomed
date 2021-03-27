import React, { Component } from 'react';
import { StyleSheet, TextInput as RNTextInput } from 'react-native';
import { getUiService } from '../../service/UiService';

/**
 * Renders an TextInput element.
 * 
 * @todo change style with mucomed StyleSheet
 * 
 * @property {eventListener} onChangeText - what should be happen if a user type
 * @property {Object} style - StyleSheet object
 * 
 * @author Dominique Börner (dominique@mukosoft.de)
 */
export default class TextInput extends Component {
    render() {
        return (
            <RNTextInput style={[styles.input, this.props.style]} onChangeText={this.props.onChangeText} value={this.props.value} keyboardType={this.props.keyboardType} placeholder={this.props.placeholder}/>             
        )
    }
}

// style definitions

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: getUiService().theme.primary,
        fontSize: 18,
        paddingLeft: 10,
        color: getUiService().theme.text1
    }
})