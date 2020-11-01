import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { colors } from './../../configs/colors';
import { Card, Menu, Text } from 'react-native-paper';
import FAIcon from "react-native-vector-icons/FontAwesome5";
import { defaultStyles } from './../../configs/styles';
import { getMedicationService } from "../../service/MedicationService";
import { observer } from "mobx-react";

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
                <View style={[styles.medicationCard, defaultStyles.defaultShadow, defaultStyles.defaultBorderRadius]}>
                    <FAIcon name="pills" style={styles.icon} />
                    <Text style={styles.name}>{this.props.medication.name}</Text>
                    <Text style={styles.dosage}>{this.props.medication.dosage}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    medicationCard: {
        width: 100,
        aspectRatio: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        margin: 5,
        padding: 0,
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
        color: colors.turquoise_light
    },
    name: {
        fontSize: 14,
        color: colors.turquoise_light,
        marginTop: 5, marginBottom: 0
    },
    dosage: {
        fontSize: 10,
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