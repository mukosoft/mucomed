import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {Card, IconButton} from "react-native-paper";
import {colors} from "../configs/colors";
import Icon from "react-native-vector-icons/FontAwesome5";
import {getMealStore} from "../stores/MealStore";

export default class InformationCard extends Component {
    render() {
        return(
            <View>
                <Card style={styles.informationCard} onPress={this.props.onPress} key={this.props.information.name}>
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