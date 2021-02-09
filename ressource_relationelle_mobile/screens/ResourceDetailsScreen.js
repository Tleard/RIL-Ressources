import * as React from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image, Dimensions, FlatList} from 'react-native';
import {Card, Title, Paragraph, IconButton} from 'react-native-paper';
import {getUrl} from "../API/RequestHandler";
import { Ionicons } from '@expo/vector-icons';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';
import {AsyncStorage} from 'react-native';
import {UserHandler} from "../API/UserHandler";
import Loader from "./Components/Loader";



const {width: WIDTH} = Dimensions.get('window');
class ProfileScreen extends React.Component{

    constructor(props) {
        super(props)
        this.state = {
            postData : '',
            postImage : '',
            userId : '',
            Posts: '',
            loading: false
        }
    }

    UNSAFE_componentWillMount(){
        this._fetchData();
    }

    _fetchData = async() => {
        this.state.loading = true
        try {
            let resourceId = this.props.route.params['resourceId'];
            await AsyncStorage.getItem("userToken")
                .then((responseJson) => {
                    try{
                        let url = getUrl() +"/api/resources/" + resourceId;
                        return fetch(url, {
                            method: 'GET',
                            headers: new Headers({
                                'Content-Type': 'application/json',
                                'Accept': 'application/json',
                                'Authorization': 'Bearer '+ responseJson,
                            }),
                        })
                            
                            .then((response) => response.json())
                            .then((responseText) => {
                                this.state.loading = false;
                                this.setState({postData: responseText[0]})
                               
                            })
                            .catch((error) => {
                                console.error(error.message)
                            })
                    } catch (e) {
                        console.error("Something went wrong" + e)
                    }
                })
        }
        catch (e) {
            console.error("Something went wrong" + e)
        }

        //Fetch Asset
        if(this.state.postData.asset !== [])
        {
            this.setState({postImage : this.state.postData.assets[0].id})
        }
    }


    render() {
        var width = Dimensions.get('window').width;
        var height = Dimensions.get('window').height;

        if (this.state.postData.asset !== [])
        {
            return (
                <View style={{alignItems: 'center', paddingTop: 20}}>
                    <Loader loading={this.state.loading}/>
                    <Card style={{width : width /1.05}}>
                        <Card.Content>
                            <Title size={20}>{this.state.postData.title}</Title>
                            <Text size={10} style={{color: 'grey'}}> - {this.state.postData.createdAt}</Text>
                        </Card.Content>
                        <Card.Cover source={{ uri: getUrl() + "/asset/file/" + this.state.postImage }} />
                        <Card.Content>
                            <Paragraph style={{paddingTop : 10}} numberOfLines={5}>{this.state.postData.description}</Paragraph>
                        </Card.Content>

                        <Card.Actions style={{ justifyContent: "flex-end" }}>
                            <IconButton aria-label="add to favorites" icon="heart-outline">
                            </IconButton>
                            <IconButton aria-label="share" icon="share-variant">
                            </IconButton>
                            <IconButton aria-label="report" icon="alert-octagon">
                            </IconButton>
                        </Card.Actions>
                    </Card>
                </View>
            )
        } else {
            return (
                <View style={{alignItems: 'center', paddingTop: 20}}>
                    <Loader loading={this.state.loading}/>
                    <Card style={{width : width /1.05}}>
                        <Card.Content>
                            <Title size={20}>{this.state.postData.title}</Title>
                            <Text size={10} style={{color: 'grey'}}> - {this.state.postData.createdAt}</Text>
                            <Paragraph style={{paddingTop : 10}} numberOfLines={5}>{this.state.postData.description}</Paragraph>
                        </Card.Content>

                        <Card.Actions style={{ justifyContent: "flex-end" }}>
                            <IconButton aria-label="add to favorites" icon="heart-outline">
                            </IconButton>
                            <IconButton aria-label="share" icon="share-variant">
                            </IconButton>
                            <IconButton aria-label="report" icon="alert-octagon">
                            </IconButton>
                        </Card.Actions>
                    </Card>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    header : {
        backgroundColor : '#605fcd'
    },
    username: {
        fontSize: 18,
        paddingTop: 10
    },
    email: {
        fontSize: 15,
        color: '#828282'
    },
    image_logo: {
        height: 150,
        resizeMode: 'contain',
        borderRadius: 100
    },
    container: {
        flex: 1,
        backgroundColor: '#fafafa',
    },
    contentContainer: {
        paddingTop: 15,
    },
    optionIconContainer: {
        marginRight: 12,
    },
    option: {
        backgroundColor: '#fdfdfd',
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: 0,
        borderColor: '#ededed',
    },
    lastOption: {
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    optionText: {
        fontSize: 15,
        alignSelf: 'flex-start',
        marginTop: 1,
    },
});

export default ProfileScreen;