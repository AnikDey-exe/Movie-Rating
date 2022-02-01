import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, TextInput, FlatList } from 'react-native';
import {Card} from 'react-native-elements';
import axios from 'axios';
import { RFValue } from 'react-native-responsive-fontsize';

export default class RecScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            data: []
        }
    }


    getRecommendedArticles = () => {
        const url = 'http://localhost:5000/recommended-articles'
        axios.get(url)
            .then((response) => {
                this.setState({
                    data: response.data.data,
                })
            })
            .catch((err) => { console.log(err) })
    }

    keyExtractor = (item, index) => index.toString();

    renderItem = ({item, index}) => {
        return (
            <Card
            key={`card-${index}`}
            featuredTitle={item.title}
            containerStyle={{flex: 1, borderRadius: RFValue(10), justifyContent: 'center', height: RFValue(110), marginBottom: RFValue(20)}}
            featuredSubtitle={item.url}
            featuredSubtitleStyle={{fontWeight: 'bold', alignSelf: 'flex-start', fontSize: RFValue(15), paddingLeft: RFValue(15),}}/>
        )
    }

    componentDidMount() {
        this.getRecommendedArticles();
    }

    render() {
        return (
            <View>
                <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.data}
                renderItem={this.renderItem}/>
            </View>
        )
    }
}