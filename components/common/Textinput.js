import React, { Component } from 'react';
import { StyleSheet, TextInput as RNTextInput } from 'react-native';
import { border, borderRadius, fontSize, height, margin, padding, width } from '../../configs/styles';
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
            <RNTextInput style={[inputStyle, this.props.style]} onChangeText={this.props.onChangeText} value={this.props.value} keyboardType={this.props.keyboardType} placeholder={this.props.placeholder}/>             
        )
    }
}

// style definitions

const inputStyle = StyleSheet.flatten([
    { borderColor: getUiService().theme.primary },
    { color: getUiService().theme.primary },
    padding.padding_x_2,
    margin.margin_x_3,
    height.height_50,
    width.width_50,
    border.borderXL, 
    fontSize.lg,
    borderRadius.roundedMD,
])