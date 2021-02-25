import { observer } from 'mobx-react';
import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';
import { getUiService } from "@service/UiService";

/**
 * Renders a List with favorite meals inside.
 * 
 * @author Dominique Börner
 */
@observer
export default class Title extends Component {
    render() {
        return (
            <Text style={[this.props.style, styles.titleStyle]}>{this.props.children}</Text>
        )
    }
}

const styles = StyleSheet.create({
    titleStyle: {
        fontSize: 18,
        color: getUiService().theme.primary,
        paddingBottom: 4, paddingTop: 4
    }
})