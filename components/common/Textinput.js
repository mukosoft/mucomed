import React, { Component } from 'react';
import { StyleSheet, TextInput as RNTextInput } from 'react-native';
import { border, borderRadius, fontSize, height, margin, opacity, padding, width } from '../../configs/styles';
import { getUiService } from '../../service/UiService';

/**
 * Renders an TextInput element.
 * 
 * @todo change style with mucomed StyleSheet
 * 
 * @property {eventListener} onChangeText - what should be happen if a user type
 * @property {Object} style - StyleSheet object
 * @property {String} keyboardType
 * @property {String} placeholder
 * 
 * @author Dominique Börner (dominique@mukosoft.de)
 */
export default class TextInput extends Component {
    onChangeText = (value) => {
        this.props.onChangeText(value);
    }
    render() {
        return (
            <RNTextInput style={[inputStyle, this.props.style]} 
            onFocus={this.props.onFocus}
            onChangeText={this.onChangeText} 
            onBlur={this.props.onBlur}
            value={this.props.value}
            keyboardType={this.props.keyboardType} 
            placeholder={this.props.placeholder} 
            placeholderTextColor={getUiService().theme.primary} />             
        )
    }
}

// style definitions

const inputStyle = StyleSheet.flatten([
    { color: getUiService().theme.primary },
    padding.padding_x_3,
    { height: 40 }, 
    fontSize.lg,
    borderRadius.roundedMD,
    { backgroundColor: getUiService().theme.secondary }
])