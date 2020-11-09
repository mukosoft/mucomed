import React, { Component } from 'react';
import { View, StyleSheet} from 'react-native';
import { colors } from '@configs/colors';
import { defaultStyles } from './../../configs/styles';

export default class Layout extends Component {
    render() {
        return (
            <View style={[styles.container, defaultStyles.defaultBorderRadius, this.props.style]}>
                { this.props.children }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        margin: 5,
        paddingTop: 10, paddingBottom: 10
    }
})