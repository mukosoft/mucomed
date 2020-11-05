import React, { Component } from "react";
import { TouchableOpacity } from 'react-native';

export default class TouchInteractionContainer extends Component {
    render() {
        return (
            <TouchableOpacity style={this.props.style} onPress={this.props.onPress}>
                { this.props.children }
            </TouchableOpacity>
        )
    }
}