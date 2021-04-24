import { observer } from "mobx-react";
import React, { Component } from 'react';
import { Image, ScrollView, StyleSheet, View, Linking } from "react-native";
import { Navigation } from 'react-native-navigation';
import Text from "@components/common/Text";
import Button from "@components/common/Button";
import AppContainer from '../common/AppContainer';
import { alignItems, alignSelf, aspectRatio_1_1, borderRadius, flex, fontSize, height, justifyContent, margin, padding, shadow, textAlign, width } from '../../configs/styles';
import { getUiService } from "../../service/UiService";
import FontAwesome from "react-native-vector-icons/FontAwesome";

/**
 *
 *
 * @author Dominique Börner (dominique@mukosoft.de)
 */
@observer
export class SelfhelpScreen extends Component {
    data = this.props.componentProps.data;

    constructor(props) {
        super(props);
        Navigation.events().bindComponent(this);
    }

    render() {
        return (
            <AppContainer>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={flex.flexCol, justifyContent.justifyCenter, alignItems.itemsCenter}>
                        <View style={flex.flexCol}>
                            <View style={informations}>
                                <Image source={{ uri: this.data._image }} style={banner} resizeMode='contain' />
                                <Text heading style={textAlign.textCenter}>{this.data.company}</Text>
                                <Text style={fontSize.md}>{this.data.street}</Text>
                                <Text style={fontSize.md}>{this.data.zipcode} {this.data.city}</Text>
                            </View>
                            <Text title style={textAlign.textCenter}>Informationen</Text>
                            <View style={[flex.flexRow, justifyContent.justifyEvenly, padding.padding_y_4]}>
                                {this.data.DoctorOffices[0].OpeningTimes.length === 0 && <Button primary style={tileButton}
                                    vectorIcon={<FontAwesome name="clock-o" size={fontSize.xxl.fontSize} color={getUiService().theme.secondary} style={padding.padding_3} />}>Öffnungszeiten</Button>}
                                {this.data.DoctorOffices[0].email !== "" && <Button primary style={tileButton}
                                    vectorIcon={<FontAwesome name="comments" size={fontSize.xxl.fontSize} color={getUiService().theme.secondary} style={padding.padding_3} />}
                                    onPress={() => Linking.openURL(`mailto:${this.data.DoctorOffices[0].email}`)}>Anfragen</Button>}
                                {this.data.DoctorOffices[0].telefon !== "" && <Button primary style={tileButton}
                                    vectorIcon={<FontAwesome name="phone" size={fontSize.xxl.fontSize} color={getUiService().theme.secondary} style={padding.padding_3} 
                                    onPress={() => Linking.openURL(`tel:${this.data.DoctorOffices[0].telefon}`)}/>}>Telefon</Button>}
                            </View>
                            <Text title style={textAlign.textCenter}>Pinnwand</Text>
                            <Text title style={textAlign.textCenter}>Formulare</Text>
                            <View style={[flex.flexRow, justifyContent.justifyEvenly, padding.padding_y_4, { paddingLeft: padding.padding_4.padding }]}>
                                {this.renderFileList(this.data.File)}
                            </View>
                            <Text title style={textAlign.textCenter}>Ansprechpartner</Text>
                            <View style={[flex.flexRow, justifyContent.justifyEvenly, padding.padding_y_4, { paddingLeft: padding.padding_4.padding }]}>
                                {this.renderEmployees(this.data.Employees)}
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </AppContainer>
        )
    }

    renderFileList(files) {
        return <View style={flex.flexCol}>
            {(files.length > 0) ? files.map(file => <View style={fileItem}>
                <Text heading>{file.name}</Text>
                <Text>{file.desc}</Text>
            </View>) : <Text heading>Keine Formulare vorhanden</Text>}
        </View>
    }

    renderEmployees(employees) {
        const visibileEmployees = employees.filter(employee => employee.is_visible)

        return <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={flex.flexRow, justifyContent.justifyCenter, alignItems.itemsCenter}>
                {visibileEmployees.map(employee => <View style={employeeItem}>
                    <Image source={{ uri: employee.icon }} style={width.width_50, height.height_50} resizeMode="contain" />
                    <Text heading>{employee.full_name}</Text>
                </View>)}
            </View>
        </ScrollView>
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
    padding.padding_3,
    shadow.shadowSM,
    borderRadius.roundedMD,
])

const tileButton = StyleSheet.flatten([
    aspectRatio_1_1,
    width.width_100
])

const fileItem = StyleSheet.flatten([
    { backgroundColor: getUiService().theme.secondary },
    { width: 300 },
    borderRadius.roundedMD,
    flex.flexCol,
    padding.padding_3,
    margin.margin_3,
    flex.flex_1
])

const employeeItem = StyleSheet.flatten([
    shadow.shadowSM,
    padding.padding_x_3,
    margin.margin_2,
    justifyContent.justifyCenter,

])