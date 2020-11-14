import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

export default class BorderedContainer extends Component {
    render() {
        return (
            <View style={[this.props.container, this.props.style]}>
                { this.props.children}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 5
    }
})