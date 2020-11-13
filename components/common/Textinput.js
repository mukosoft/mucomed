import React, { Component } from 'react';
import { StyleSheet, TextInput as RNTextInput } from 'react-native';

/**
 * Renders an TextInput element.
 * 
 * @author Dominique Börner
 */
export default class TextInput extends Component {
    render() {
        return (
            <RNTextInput style={styles.input} onChangeText={this.props.onChangeText} value={this.props.value} />             
        )
    }
}

const styles = StyleSheet.create({
    input: {}
})