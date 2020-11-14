import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { getUiService } from '@service/UiService';

export default class AppContainer extends Component {
    render() {
        return (
            <View style={styles.container}>
                { this.props.children}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        padding: 10,
        minHeight: '100%',
        backgroundColor: getUiService().theme.background,
    }
})