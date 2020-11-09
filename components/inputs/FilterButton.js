import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '@configs/colors';

export default class FilterButton extends Component {
    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress} style={[styles.buttonContainer, this.props.style]}>
                { this.props.children }
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    buttonContainer: {
        padding: 10,
        fontSize: 20,
        margin: 5,
        paddingLeft: 10, paddingRight: 10,
    }
})