import BottomNavigation from '@navigation/BottomNavigation';
import { getUiService } from "@service/UiService";
import React, { Component } from 'react';
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { Navigation } from 'react-native-navigation';
import AppContainer from "../common/AppContainer";
import Button from '@components/common/Button';
import Text from '@components/common/Text';
import { alignItems, alignSelf, aspectRatio_1_1, border, borderRadius, flex, fontSize, height, justifyContent, margin, padding, shadow, textAlign, width } from "../../configs/styles";
import addIcon from "@assets/icons/add_white.png";
import medicalList from "@assets/icons/medical-list_white.png";
import pillIcon from "@assets/icons/meds_white.png";
import hearthIcon from "@assets/icons/love_white.png";
import reportIcon from "@assets/icons/medical-report_white.png";
import curveIcon from "@assets/icons/statistic-curve_white.png";
import HTML from "react-native-render-html";
import { API_BASE_URL } from '@configs/config';
import MealItem from '../recipebook/MealItem';
import { getSettingsService } from '../../service/SettingsService';
import TextInput from "@components/common/Textinput";

/**
 * Renders the user profile.
 *
 * @author Dominique Börner (dominique@mukosoft.de)
 */
export class ProfileScreen extends Component {

    state = {
        news: {},
        newsTextVisible: false,
        fat: ""
    };

    constructor(props) {
        super(props);
        Navigation.events().bindComponent(this);
        this.getNews();
        this.getRandomMeal();
    }

    render() {
        return (
            <AppContainer>
                <ScrollView showsVerticalScrollIndicator={false} style={padding.padding_3}>
                    <Text title style={[textAlign.textCenter, fontSize.xxl]}>{getUiService().getTranslation('hello')} 👋</Text>
                    <Text title style={textAlign.textCenter}>{getUiService().getTranslation('search_for_something_to_eat')}</Text>
                    {this.state.meal && <MealItem meal={this.state.meal} row cardStyle={[alignSelf.selfCenter]} />}
                    <View style={creonCalc}>
                        <Text heading style={textAlign.textCenter}>Kreon-Rechner</Text>
                        <View style={[flex.flexCol, alignItems.itemsCenter]}>
                            <View style={[flex.flexRow, justifyContent.justifyCenter, alignItems.itemsCenter]}>
                                <TextInput onChangeText={(value) => this.setCreonState(value)} value={this.state.fat.replace('.', ',')} style={width.width_50} keyboardType="number-pad" /><Text> g</Text>
                            </View>
                            {(this.state.fat !== 0 && this.state.fat !== "") && <Text>{this.state.fat.replace('.', ',')} g Fett entspricht {this.state.fat * getSettingsService().getCreon()} IE</Text>}
                        </View>
                    </View>
                    <View>
                        <Text title style={textAlign.textCenter}>{getUiService().getTranslation('medication')}</Text>
                        <View style={flexRow}>
                            <View>
                                <Button primary style={buttons} icon={addIcon} onPress={() => getUiService().showModal('MedicationCreationScreen')}>{getUiService().getTranslation('add_medication')}</Button>
                            </View>
                            <View>
                                <Button primary style={buttons} icon={medicalList} onPress={() => getUiService().showModal('MedicationPlanScreen')}>{getUiService().getTranslation('medication_schedule')}</Button>
                            </View>
                            <View>
                                <Button primary style={buttons} icon={pillIcon} onPress={() => getUiService().showModal('MedicationStockScreen')}>{getUiService().getTranslation('medication_stock')}</Button>
                            </View>
                        </View>
                    </View>
                    <View>
                        <Text title style={textAlign.textCenter}>{getUiService().getTranslation('reports_and_health')}</Text>
                        <View style={flexRow}>
                            <View>
                                <Button primary icon={reportIcon} style={buttons} onPress={() => getUiService().showModal('ReportsScreen')}>{getUiService().getTranslation('to_reports')}</Button>
                            </View>
                            <View>
                                <Button primary icon={hearthIcon} style={buttons} onPress={() => getUiService().showModal('VitaldataScreen')}>{getUiService().getTranslation('add_vitaldata')}</Button>
                            </View>
                            <View>
                                <Button primary icon={curveIcon} style={buttons} onPress={() => getUiService().showModal('DiseaseProgressionScreen')}>{getUiService().getTranslation('my_medical_progression')}</Button>
                            </View>
                        </View>
                    </View>
                    {(Object.keys(this.state.news).length !== 0) && this.renderNews()}
                </ScrollView>
                <BottomNavigation />
            </AppContainer>
        )
    }

    setCreonState(value) {
        let newValue = value.replace(',', '.');
        if (!isNaN(newValue)) {
            this.setState({ fat: newValue });
        }
    }

    renderNews() {
        return <>
            <Text title style={textAlign.textCenter}>{getUiService().getTranslation('news')}</Text>
            <View style={[newsContainer, flexRow]}>
                <Image style={newsImage} source={{ uri: this.state.news[getSettingsService().getCurrentLanguage()].imgUrl }} resizeMode={"contain"} />
                <View style={flex.flex_1}>
                    <Text heading>{this.state.news[getSettingsService().getCurrentLanguage()].title}</Text>
                    <Text>{this.state.news[getSettingsService().getCurrentLanguage()].excerpt}</Text>
                    {(this.state.newsTextVisible) && <HTML source={{ html: this.state.news[getSettingsService().getCurrentLanguage()].text }}
                        tagsStyles={htmlTagsStyles} classesStyles={htmlClassesStyles} />}
                    <Button primary onPress={() => this.setState({ newsTextVisible: !this.state.newsTextVisible })}>Weiter lesen</Button>
                </View>
            </View>
        </>
    }

    getNews() {
        const url = "https://api.mukosoft.de/news"
        fetch(`${url}?${new Date()}`)
            .then(response => response.json())
            .then(data => this.setState({ news: data }))
    }

    getRandomMeal() {
        fetch(`${API_BASE_URL}query=*[_type%20=="meals"]`)
            .then(response => response.json())
            .then(data => {
                const random = Math.floor(Math.random() * Math.floor(data.result.length));
                this.setState({ meal: data.result[random] })
            })
    }
}

const htmlClassesStyles = {
    'list-item': {
        fontSize: fontSize.md.fontSize,
        color: getUiService().theme.primary,
        backgroundColor: getUiService().theme.secondary,
        padding: padding.padding_3.padding,
        borderRadius: borderRadius.roundedMD.borderRadius
    }
}

const htmlTagsStyles = {
    h1: {
        fontSize: fontSize.md.fontSize,
        paddingBottom: padding.padding_3.padding,
        paddingTop: padding.padding_3.padding,
        color: getUiService().theme.primary,
    },
    span: {
        fontSize: fontSize.md.fontSize,
        paddingBottom: padding.padding_3.padding,
        paddingTop: padding.padding_3.padding,
        color: getUiService().theme.primary,
    },
}

const creonCalc = StyleSheet.flatten([
    margin.margin_4,
    alignSelf.selfCenter,
    { width: "90%" },
    height.height_100,
    justifyContent.justifyStart,
    alignItems.itemsCenter,
    flex.flexCol,
    shadow.shadowSM,
    borderRadius.roundedMD
])

const newsContainer = StyleSheet.flatten([
    border.borderXL,
    borderRadius.roundedMD,
    padding.padding_3,
    margin.margin_4,
    flex.flex_1,
    justifyContent.justifyCenter,
    { borderColor: getUiService().theme.primary },
])

const newsImage = StyleSheet.flatten([
    width.width_100,
    height.height_100,
    margin.margin_3
])

const flexRow = StyleSheet.flatten([
    flex.flexRow,
    justifyContent.justifyCenter
])

const buttons = StyleSheet.flatten([
    width.width_100,
    aspectRatio_1_1
])

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        margin: 10
    },
    randomRecipeContainer: {
        flex: 1,
        flexDirection: 'row',
        margin: 10
    },
    mealImg: {
        flex: 1,
        width: 150, aspectRatio: 1,
        borderRadius: 8
    },
    mealTextContainer: {
        flex: 1,
        marginLeft: 10,
    },
    medikamenteBtn: {
        margin: 5,
        backgroundColor: getUiService().theme.primary
    },

})