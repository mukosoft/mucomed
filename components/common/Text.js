import { observer } from 'mobx-react';
import React, { Component } from 'react';
import { StyleSheet, Text as ReactText } from 'react-native';
import { getUiService } from "@service/UiService";
import { fontSize, fontStyle, padding } from '../../configs/styles';

/**
 * Renders an simple text component. Based on which property was set, 
 * the text will be rendered as either title, heading or error message.
 * 
 * @property heading
 * @property error
 * @property title
 * @property {Object} style - StyleSheet object
 * 
 * @author Dominique Börner (dominique@mukosoft.de)
 */
@observer
export default class Text extends Component {
    render() {
        let style = defaultStyle

        if (this.props.error) style = errorStyle;
        if (this.props.heading) style = headingStyle;
        if (this.props.title) style = titleStyle;
        
        return (
            <ReactText style={[style, this.props.style, (this.props.danger && dangerStyle)]}>{this.props.children}</ReactText>
        )
    }
}

// style definitions

const dangerStyle = StyleSheet.flatten([
    { color: getUiService().theme.danger }
]);

const defaultStyle = StyleSheet.flatten([
    fontSize.md,
    padding.padding_y_2,
    { color: getUiService().theme.primary }
])

const headingStyle = StyleSheet.flatten([
    fontSize.lg,
    padding.padding_y_2,
    fontStyle.bold,
    { color: getUiService().theme.primary }
])

const titleStyle = StyleSheet.flatten([
    fontSize.xl,
    padding.padding_y_2,
    fontStyle.bold,
    { color: getUiService().theme.primary }
])

const errorStyle = StyleSheet.flatten([
    fontSize.md,
    fontStyle.bold,
    { color: getUiService().theme.danger }
])
