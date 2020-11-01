import React, { Component } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { defaultStyles } from './../../configs/styles';
import { colors } from '@configs/colors';

export default class GroupCard extends Component {
    render() {
        return (
            <View style={[styles.cardStyle, defaultStyles.defaultShadow, defaultStyles.defaultBorderRadius]}>
                <Text style={styles.titleStyle}>{this.props.title}</Text>
                {this.props.children}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    cardStyle: {
        display: 'flex',
        padding: 5,
        margin: 5,
        backgroundColor: colors.white
    },
    titleStyle: {
        margin: 10,
        fontSize: 20
    }
})
