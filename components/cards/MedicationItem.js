import React, { Component } from "react";
import { StyleSheet } from 'react-native';
import { colors } from './../../configs/colors';
import { Card, Menu, Text } from 'react-native-paper';

export default class MedicationItem extends Component {
    
    state = {};

    render() {
        let medicationCardStyle;

        if (this.props.disabled === true) {
            medicationCardStyle = styles.medicationCardDisabled;
        } else {
            medicationCardStyle = styles.medicationCard;
        }

        return ( <Card style={medicationCardStyle} key={this.props.medication.name}>
            <Card.Title title={this.props.medication.name} titleStyle={styles.name}

            />
            <Card.Content>
                <Text style={styles.dosage}>{this.props.medication.dosage}</Text>
            </Card.Content>
        </Card>
        )
    }
}

const styles = StyleSheet.create({
    medicationCard: {
        width: 120,
        aspectRatio: 1,
        margin: 5,
        padding: 0,
        backgroundColor: colors.turquoise_light,
    },
    medicationCardDisabled: {
        width: 120,
        aspectRatio: 1,
        margin: 5,
        padding: 0,
        backgroundColor: colors.grey_light,
    },
    name: {
        fontSize: 16,
        color: colors.white
    },
    dosage: {
        fontSize: 14,
        color: colors.white,
    },
    button: {
        color: colors.white
    }
});

{ /** right={(props) => <Menu visible={this.state[menuStateVisible]}
anchor={<IconButton
    onPress={() => this.setState({[menuStateVisible]: true})} color={colors.white} icon="dots-vertical"
/>}
onDismiss={() => this.setState({[menuStateVisible]: false})}>
<Menu.Item onPress={() => {}} title="Bearbeiten" />
<Menu.Item onPress={() => { MedicationService.getInstance().deleteMedicationByName(medication.name)}} title="Löschen" />
</Menu> 
} onPress={() => {
this.setState({ menuVisible: true})
}}**/ } 