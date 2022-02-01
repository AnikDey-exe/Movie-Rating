import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, TextInput, FlatList } from 'react-native';
import axios from 'axios';
import { RFValue } from 'react-native-responsive-fontsize';
import { Header, AirbnbRating, Item } from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';

export default class HomeScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            articleDetails: {},
            title: '',
            text: '',
            lang: '',
            url: ''
        }
    }

    getArticles = () => {
        const url = 'http://localhost:5000/get-articles'
        axios.get(url)
            .then((response) => {
                let details = response.data.data
                this.setState({
                    articleDetails: details,
                    title: response.data.data.title,
                    text: response.data.data.text,
                    lang: response.data.data.lang,
                    url: response.data.data.url
                })
            })
            .catch((err) => { console.log(err) })
    }

    likeArticle = () => {
        const url = 'http://localhost:5000/liked-articles'
        axios.post(url)
            .then((response) => {
                this.getArticles()
            })
            .catch((err) => { console.log(err) })
    }

    dislikeArticle = () => {
        const url = 'http://localhost:5000/disliked-articles'
        axios.post(url)
            .then((response) => {
                this.getArticles()
            })
            .catch((err) => { console.log(err) })
    }

    componentDidMount() {
        this.getArticles();
    }

    render() {
        const articleDetails = this.state
        // if (articleDetails.poster_link) {
            const { title, text, url, lang } = articleDetails

            return (
                <View style={{ flex: 1, backgroundColor: 'white' }}>
                    <View style={{ flex: 0.1 }}>
                        <Header
                            centerComponent={{ text: 'Articles', style={ color: 'white', fontWeight: 'bold', fontSize: RFValue(18) } }}
                            rightComponent={{ icon: "book-open", type: "material-community", color: 'white', onPress=() => { this.props.navigation.navigate('TopTab') } }}
                            backgroundColor={"#d500f9"}
                            containerStyle={{ flex: 1 }}
                        />
                        {/* <TouchableOpacity onPress={() => {
                    this.props.navigation.navigate('TopTab')
                }}> <Text> articles </Text></TouchableOpacity> */}
                    </View>
                    <View style={{ flex: 0.9 }}>
                        <View style={{ flex: 0.4, justifyContent: 'center', alignItems: 'center' }}>
                            <Image
                                style={{ width: '60%', height: '90%', borderRadius: RFValue(30) }}
                                source={{ uri: poster_link }} />
                        </View>
                        <View style={{ flex: 0.6 }}>
                            <View style={{ flex: 0.2, alignItems: 'center' }}>
                                <Text style={{ fontSize: RFValue(20), fontWeight: 'bold', textAlign: 'center' }}> {this.state.title} </Text>
                                <Text style={{ fontSize: RFValue(14), fontWeight: 'bold' }}> {this.state.url}</Text>
                            </View>
                            <View style={{ flex: 0.35 }}>
                                <View style={{ flex: 0.3 }}>
                                    <AirbnbRating count={10} size={RFValue(25)} defaultRating={rating} starContainerStyle={{ marginTop: -30 }} />
                                </View>
                                <View style={{ flex: 0.7, padding: 15 }}>
                                    <Text style={{ fontSize: RFValue(13), textAlign: 'center', color: 'grey' }}> {this.state.text} </Text>
                                </View>
                            </View>
                            <View style={{ flex: 0.45 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                                    <TouchableOpacity onPress={() => { this.likeArticle() }}>
                                        <Icon
                                            name={'check'}  type={'entypo'}  size={RFValue(30)} color={'#76ff03'} />
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => { this.dislikeArticle() }}>
                                        <Icon
                                            name={'thumbs-down'}  type={'entypo'}  size={RFValue(30)} color={'#76ff03'} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            )
        // }

        // return null
    }
}