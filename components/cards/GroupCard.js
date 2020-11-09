import { colors } from '@configs/colors';
import React, { Component } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

export default class GroupCard extends Component {
    render() {
        return (
            <View style={styles.cardStyle}>
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
    },
    titleStyle: {
        margin: 10,
        fontSize: 20,
        color: colors.text,
        opacity: 0.75
    }
})
