import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Card } from "react-native-paper";

import InformationService from '@service/InformationService';

/**
 * Renders an element for displaying a information. 
 * Pressing on this element opens the InformationArticleScreen.
 * 
 * @author Dominique Börner (dominique@mukosoft.de)
 */
export default class InformationCard extends Component {
    render() {
        return(
            <View>
                <Card style={styles.informationCard} onPress={() => { InformationService.openInformation(information) }} key={this.props.information.name}>
                    <Card.Cover source={{ uri: (this.props.information) ? this.props.information.img_url : "" }}/>
                    <Card.Title title={(this.props.information) ? this.props.information.name : ""}
                                subtitle={(this.props.information) ? this.props.information.author : "" } subtitleStyle={styles.informationInfo} />
                </Card>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    informationCard: {
        marginBottom: 10
    },
    informationInfo: {
        paddingTop: 5,
        paddingBottom: 5
    },
});