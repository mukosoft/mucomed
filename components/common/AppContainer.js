import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { getUiService } from '@service/UiService';
import { flex, justifyContent, margin, padding } from '../../configs/styles';

/**
 * The AppContainer is used for each screen.
 * 
 * @author Dominique Börner (dominique@mukosoft.de)
 */
export default class AppContainer extends Component {
    render() {
        return (
            <View style={styles}>
                { this.props.children}
            </View>
        )
    }
}

// style definitions

const styles = StyleSheet.flatten([
    flex.flex_1, 
    flex.flexCol, 
    margin.margin_y_3,
    justifyContent.justifyBetween,
    { backgroundColor : getUiService().theme.background }
]);