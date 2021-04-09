import { observer } from "mobx-react";
import React, { Component } from 'react';
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { Navigation } from 'react-native-navigation';
import Text from "@components/common/Text";
import Button from "@components/common/Button";
import { API_BASE_URL, MY_DOC_SHOW_DOCTOR_URL } from '@configs/config';
import AppContainer from '../common/AppContainer';
import { getSettingsService } from '../../service/SettingsService';
import BottomNavigation from '@components/navigation/BottomNavigation';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { alignContent, alignItems, alignSelf, aspectRatio_1_1, border, borderRadius, flex, fontSize, height, justifyContent, margin, opacity, padding, shadow, textAlign, width } from '../../configs/styles';
import { getUiService } from "../../service/UiService";
import { selfhelpGroups } from "../../configs/config";

/**
 *
 *
 * @author Dominique Börner (dominique@mukosoft.de)
 */
@observer
export class selfhelpScreen extends Component {

    state = {
        groups: []
    }

    constructor(props) {
        super(props);
        Navigation.events().bindComponent(this);
        this.getGroups();
    }

    render() {
        return (
            <AppContainer>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={flex.flexCol, justifyContent.justifyCenter, alignItems.itemsCenter}>
                        {/* <Text title style={textAlign.textCenter}>Selbsthilfegruppen</Text> */}
                        {this.state.groups.map(group => this.renderGroupCard(group))}
                    </View>
                </ScrollView>
            </AppContainer>
        )
    }

    renderGroupCard(data) {
        return <View style={flex.flexCol}>
            <Image source={{ uri: data._image }} style={banner} resizeMode='contain' />
            <View style={informations}>
                <Text heading>{data.company}</Text>
                <Text style={fontSize.sm}>{data.street}</Text>
                <Text style={fontSize.sm}>{data.zipcode} {data.city}</Text>
            </View>
            <Text title style={textAlign.textCenter}>Informationen</Text>
            <View style={[flex.flexRow, justifyContent.justifyEvenly, padding.padding_y_4]}>
                {data.DoctorOffices[0].OpeningTimes.length === 0 && <Button primary style={tileButton}>Öffnungszeiten</Button>}
                {data.DoctorOffices[0].email !== "" && <Button primary style={tileButton}>Anfragen</Button>}
                {data.DoctorOffices[0].telefon !== "" && <Button primary style={tileButton}>Telefon</Button>}
            </View>
            {/* <Text title style={textAlign.textCenter}>Pinnwand</Text> */}
            <Text title style={textAlign.textCenter}>Formulare</Text>
            <View style={[flex.flexRow, justifyContent.justifyEvenly, padding.padding_y_4, { paddingLeft: padding.padding_4.padding }]}>
                {this.renderFileList(data.File)}
            </View>
            <Text title style={textAlign.textCenter}>Ansprechpartner</Text>
            <View style={[flex.flexRow, justifyContent.justifyEvenly, padding.padding_y_4, { paddingLeft: padding.padding_4.padding }]}>
                {this.renderEmployees(data.Employees)}
            </View>
        </View>
    }

    renderFileList(files) {
        return <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={flex.flexRow}>
                {files.map(file => <View style={fileItem}>
                    <Text heading>{file.name}</Text>
                    <Text>{file.desc}</Text>
                </View>)}
            </View>
        </ScrollView>
    }

    renderEmployees(employees) {
        const visibileEmployees = employees.filter(employee => employee.is_visible)

        return <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={flex.flexRow, justifyContent.justifyCenter, alignItems.itemsCenter}>
            {visibileEmployees.map(employee => <View style={employeeItem}>
                <Image source={{ uri: employee.icon}} style={width.width_50, height.height_50} resizeMode="contain" />
                <Text heading>{employee.full_name}</Text>
            </View>)}
        </View>
    </ScrollView>
    }

    getGroups() {
        selfhelpGroups.map(groupdId => {
            fetch(`${MY_DOC_SHOW_DOCTOR_URL}${groupdId}`)
                .then(response => response.json())
                .then(data => [...this.state.groups, data.data])
                .then(dataArr => this.setState({ groups: dataArr }))
        })

    }
}

// style definitions

const banner = StyleSheet.flatten([
    { width: 300 }, height.height_100,
])

const informations = StyleSheet.flatten([
    justifyContent.justifyCenter, 
    alignItems.itemsCenter,
    alignSelf.selfCenter,
    margin.margin_3,
    padding.padding_y_2,
    shadow.shadowSM,
    borderRadius.roundedMD,
    { width: 200}
])

const tileButton = StyleSheet.flatten([
    aspectRatio_1_1,
    width.width_100
])

const fileItem = StyleSheet.flatten([
    { backgroundColor: getUiService().theme.secondary },
    width.width_150,
    height.height_150,
    padding.padding_x_3,
    margin.margin_3,
    borderRadius.roundedMD,
    justifyContent.justifyCenter,
    alignItems.itemsCenter
])

const employeeItem = StyleSheet.flatten([

])