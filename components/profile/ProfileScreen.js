import BottomNavigation from '@navigation/BottomNavigation';
import { getUiService } from "@service/UiService";
import React, { Component } from 'react';
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { Navigation } from 'react-native-navigation';
import AppContainer from "../common/AppContainer";
import FavoriteMeals from "../recipebook/FavoriteMeals";
import Button from '@components/common/Button';
import Text from '@components/common/Text';
import { alignSelf, aspectRatio_1_1, border, borderRadius, flex, fontSize, height, justifyContent, margin, padding, textAlign, width } from "../../configs/styles";
import addIcon from "@assets/icons/add_white.png";
import medicalList from "@assets/icons/medical-list_white.png";
import pillIcon from "@assets/icons/meds_white.png";
import hearthIcon from "@assets/icons/love_white.png";
import reportIcon from "@assets/icons/medical-report_white.png";
import curveIcon from "@assets/icons/statistic-curve_white.png";
import HTML from "react-native-render-html";
import { API_BASE_URL } from '@configs/config';
import MealItem from '../recipebook/MealItem';

/**
 * Renders the user profile.
 *
 * @author Dominique Börner (dominique@mukosoft.de)
 */
export class ProfileScreen extends Component {

    state = {
        news: {},
        newsTextVisible: false
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
                    <Text title style={[textAlign.textCenter, fontSize.xxl]}>Hallo! 👋</Text>
                    <Text title style={textAlign.textCenter}>Suchst du was zu essen?</Text>
                    { this.state.meal && <MealItem meal={this.state.meal} row cardStyle={[alignSelf.selfCenter]} /> }
                    <View>
                        <Text title style={textAlign.textCenter}>{getUiService().getTranslation('medication')}</Text>
                        <View style={flexRow}>
                            <View>
                                <Button primary style={buttons} fontSize={fontSize.sm} icon={addIcon} onPress={() => getUiService().navigateToComponent('MedicationCreationScreen')}>Medikament hinzufügen</Button>
                            </View>
                            <View>
                                <Button primary style={buttons} fontSize={fontSize.sm} icon={medicalList} onPress={() => getUiService().navigateToComponent('MedicationPlanScreen')}>Medikations plan</Button>
                            </View>
                            <View>
                                <Button primary style={buttons} fontSize={fontSize.sm} icon={pillIcon} onPress={() => getUiService().navigateToComponent('MedicationStockScreen')}>Meine{"\n"}Medikamente</Button>
                            </View>
                        </View>
                    </View>
                    <View>
                        <Text title style={textAlign.textCenter}>Berichte & Gesundheit</Text>
                        <View style={flexRow}>
                            <View>
                                <Button primary fontSize={fontSize.sm} icon={reportIcon} style={buttons} onPress={() => getUiService().navigateToComponent('ReportsScreen')}>Zu den Berichten</Button>
                            </View>
                            <View>
                                <Button primary fontSize={fontSize.sm} icon={hearthIcon} style={buttons} onPress={() => getUiService().navigateToComponent('VitaldataScreen')}>Vitalwerte eingeben</Button>
                            </View>
                            <View>
                                <Button primary fontSize={fontSize.sm} icon={curveIcon} style={buttons} onPress={() => getUiService().navigateToComponent('DiseaseProgressionScreen')}>Mein Verlauf</Button>
                            </View>
                        </View>
                    </View>
                    {(Object.keys(this.state.news).length !== 0) && this.renderNews()}
                </ScrollView>
                <BottomNavigation />
            </AppContainer>
        )
    }

    renderNews() {
        return <>
            <Text title style={textAlign.textCenter}>News</Text>
            <View style={[newsContainer, flexRow]}>
                <Image style={newsImage} source={{ uri: this.state.news[getUiService().language].imgUrl }} resizeMode={"contain"} />
                <View style={flex.flex_1}>
                    <Text heading>{this.state.news[getUiService().language].title}</Text>
                    <Text>{this.state.news[getUiService().language].excerpt}</Text>
                    {(this.state.newsTextVisible) && <HTML source={{ html: this.state.news[getUiService().language].text }}
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
                console.debug(data.result.length);
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