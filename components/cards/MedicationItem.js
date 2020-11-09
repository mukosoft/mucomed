import { observer } from "mobx-react";
import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Card, Menu, Text } from 'react-native-paper';
import FAIcon from "react-native-vector-icons/FontAwesome5";

import { getMedicationService } from "../../service/MedicationService";
import { colors } from './../../configs/colors';
import { defaultStyles } from './../../configs/styles';

@observer
export default class MedicationItem extends Component {

    state = {};

    render() {
        let medicationCardStyle;

        if (this.props.disabled === true) {
            medicationCardStyle = styles.medicationCardDisabled;
        } else {
            medicationCardStyle = styles.medicationCard;
        }

        return (
            <TouchableOpacity>
                <View style={[styles.medicationCard, defaultStyles.defaultBorderRadius]}>
                    <FAIcon name="pills" style={styles.icon} />
                    <View>
                        <Text style={styles.name}>{this.props.medication.name}, <Text style={styles.dosage}>{this.props.medication.dosage}</Text></Text>
                        <Text style={styles.description}>{this.props.medication.description}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    medicationCard: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.white,
        margin: 5,
        padding: 10,
    },
    medicationCardDisabled: {
        width: 120,
        aspectRatio: 1,
        margin: 5,
        padding: 0,
        backgroundColor: colors.grey_light,
    },
    icon: {
        fontSize: 32,
        color: colors.primary,
        margin: 10
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.primary,
        marginTop: 5, marginBottom: 0
    },
    dosage: {
        color: colors.primary,
        fontSize: 12,
    },
    description: {
        marginTop: 10,
        marginBottom: 10,
        color: colors.primary,
        fontSize: 14
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