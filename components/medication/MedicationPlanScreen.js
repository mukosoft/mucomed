import AppContainer from '@components/common/AppContainer';
import Button from '@components/common/Button';
import Text from '@components/common/Text';
import TextInput from "@components/common/Textinput";
import MedicationItem from '@components/medication/MedicationItem';
import { getMedicationService } from '@service/MedicationService';
import { observer } from "mobx-react";
import React, { Component } from 'react';
import { ScrollView, StyleSheet, View } from "react-native";
import { Navigation } from 'react-native-navigation';

import { flex, margin, padding, textAlign, width } from '../../configs/styles';
import { getSettingsService } from '../../service/SettingsService';
import { getUiService } from '../../service/UiService';
import { alignSelf } from './../../configs/styles';

/**
 * Renders a screen, containing all medications in an detailed view. Here,
 * medications can also be deleted by the user.
 *
 * @author Dominique Börner (dominique@mukosoft.de)
 */
@observer
export class MedicationPlanScreen extends Component {
    state = {
        creon: 0,
        isEditMode: false
    }

    constructor(props) {
        super(props);
        Navigation.events().bindComponent(this);
    }

    componentDidMount() {
        this.setState({ creon: getSettingsService().getCreon() });
    }

    render() {
        return (
            <AppContainer>
                <ScrollView style={medicationListContainer}>
                    <Text title style={titleStyle}>Medikationsplan</Text>
                    <Button primary style={addButton} onPress={() => getUiService().showModal('MedicationCreationScreen')}>{getUiService().getTranslation('add_medication')}</Button>
                        <Text title>Kreon</Text>
                        <View style={flex.flexRow}>
                        <TextInput style={width.width_150}
                            onFocus={() => this.setState({ isEditMode: true })}
                            onChangeText={(value) => { this.setState({ isEditMode: true }); this.setState({ creon: value }) }}
                            onBlur={() => { this.setState({ isEditMode: false }); this.setState({ creon: this.state.creon }) }}
                            value={(this.state.isEditMode === true) ? this.state.creon : `${this.state.creon} IE`} />
                        <Button primary onPress={() => getSettingsService().changeCreon(this.state.creon)} animation="pulse">Speichern</Button>
                    </View>
                    {getMedicationService().medicationSchedule.map((medication) => {
                        return <View style={itemWrapper}>
                            <MedicationItem canBeDeleted detailed medicationRequest={medication} />
                        </View>
                    })}
                </ScrollView>
            </AppContainer>
        )
    }
}

// style definitions
const addButton = StyleSheet.flatten([
    flex.flex_1,
    alignSelf.selfStart,
    margin.margin_y_3
    
])

const titleStyle = StyleSheet.flatten([
    textAlign.textCenter
])

const medicationListContainer = StyleSheet.flatten([
    padding.padding_3,
])

const itemWrapper = StyleSheet.flatten([
    padding.padding_y_4
])