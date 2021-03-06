import * as React from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image, Dimensions, FlatList} from 'react-native';
import {Card, Title, Paragraph, IconButton} from 'react-native-paper';
import {getUrl} from "../API/RequestHandler";
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import {AsyncStorage} from 'react-native';
import Loader from "./Components/Loader";
import moment from "moment";


const {width: WIDTH} = Dimensions.get('window');
class ProfileScreen extends React.Component{

    constructor(props) {
        super(props)
        this.state = {
            postData : '',
            postImage : '',
            postLibData: '',
            userId : '',
            useToken : '',
            isFavorite : false,
            reactionsLength : 0,
            Posts: '',
            loading: false,
            is_liked: false,
        }
    }

    componentDidMount() {
        this._fetchData();
        this._fetchLib();

        this.focusListener = this.props.navigation.addListener('focus', () => {
            this._fetchData();
            this._fetchLib();
        })};

    _fetchData = async() => {
        this.state.loading = true
        try {
            let resourceId = this.props.route.params['resourceId'];
            await AsyncStorage.multiGet(["userToken", "user"])
                .then((responseJson) => {
                    try{
                        let url = getUrl() +"/api/resources/" + resourceId;
                        return fetch(url, {
                            method: 'GET',
                            headers: new Headers({
                                'Content-Type': 'application/json',
                                'Accept': 'application/json',
                                'Authorization': 'Bearer '+ responseJson[0][1],
                            }),
                        })
                            .then((response) => response.json())
                            .then((responseText) => {
                                this.state.loading = false;
                                this.setState({postData: responseText[0]})
                                if (responseText[0].reactions.length > 1)
                                {
                                    this.setState({reactionsLength : responseText[0].reactions.length})
                                }
                            })
                            .catch((error) => {
                                console.error(error.message)
                            })
                    } catch (e) {
                        console.error("Something went wrong" + e);
                    }
                })
        }
        catch (e) {
            console.error("Something went wrong" + e)
        }

        if(this.state.postData.assets && this.state.postData.assets.length)
        {
            this.setState({postImage : this.state.postData.assets[0].id})
        }
    }

    _fetchLib = async() => {
        this.state.loading = true
        try {
            await AsyncStorage.multiGet(["userToken", "user"])
                .then((responseJson) => {
                    try{
                        let url = getUrl() +"/api/user/getLib";
                        return fetch(url, {
                            method: 'POST',
                            headers: new Headers({
                                'Content-Type': 'application/json',
                                'Accept': 'application/json',
                                'Authorization': 'Bearer '+ responseJson[0][1],
                            }),
                            body : JSON.stringify({'id' : responseJson[1][1]})
                        })
                            .then((response) => response.json())
                            .then((responseText) => {
                                this.state.loading = false;
                                this.setState({postDataLib: responseText})
                            })
                            .catch((error) => {
                                console.error(error.message)
                            })
                    } catch (e) {
                        console.error("Something went wrong" + e);
                    }
                })
        }
        catch (e) {
            console.error("Something went wrong" + e)
        }
    }

    _addToLibrary = async() => {
        try {
            await AsyncStorage.getItem("userToken")
                .then((responseJson) => {
                    try{
                        let url = getUrl() +"/api/user/saveResInLib";
                        return fetch(url, {
                            method: 'POST',
                            headers: new Headers({
                                'Content-Type': 'application/json',
                                'Accept': 'application/json',
                                'Authorization': 'Bearer ' + responseJson,
                            }),
                            body : JSON.stringify({'id' : this.state.postData.id})
                        })
                            .then((response) => response.json())
                            .then((responseText) => {
                                this.state.loading = false;
                                alert("Ressource ajoutée aux favoris");
                                this.componentDidMount();
                            })
                            .catch((error) => {
                                console.error(error.message)
                            })

                    } catch (e) {
                        console.error("Something went wrong" + e)
                    }
                })
        } catch (e) {
            console.error("Somenting went wrong" + e)
        }
    }

    _removeFromLibrary = async() => {
        try {
            await AsyncStorage.getItem("userToken")
                .then((responseJson) => {
                    try{
                        let url = getUrl() +"/api/user/removeFromLib";
                        return fetch(url, {
                            method: 'POST',
                            headers: new Headers({
                                'Content-Type': 'application/json',
                                'Accept': 'application/json',
                                'Authorization': 'Bearer ' + responseJson,
                            }),
                            body : JSON.stringify({'id' : this.state.postData.id})
                        })
                            .then((response) => response.json())
                            .then((responseText) => {
                                this.state.loading = false;
                            })
                            .catch((error) => {
                                console.error(error.message)
                            })

                    } catch (e) {
                        console.error("Something went wrong" + e)
                    }
                })
        } catch (e) {
            console.error("Somenting went wrong" + e)
        }
        this.props.navigation.navigate('Root', {
            screen: 'Favorite',
        });
    }

    _fetchCreateReactions = async () => {
        try {
            await AsyncStorage.getItem("userToken").then((responseJson) => {
                try {
                    let url =
                        getUrl() + "/api/resources/reaction/" + this.state.postData.id;
                    return fetch(url, {
                        method: "POST",
                        headers: new Headers({
                            "Content-Type": "application/json",
                            "Accept": "application/json",
                            "Authorization": "Bearer " + responseJson,
                        }),
                        body: JSON.stringify({
                            reaction: 'like',
                        })

                    })
                        .then((response) => response.json(), )
                        .then((responseText) => {
                            this.setState({ is_liked: true });
                            this.setState({reaction_length: this.state.postData.reactions.length})
                        })
                        .catch((error) => {
                            console.error(error.message);
                        });
                } catch (e) {
                    console.error("Something went wrong" + e);
                }
            });
        } catch (e) {
            console.error("Somenting went wrong" + e);
        }
    };


    render() {
        var width = Dimensions.get('window').width;
        var height = Dimensions.get('window').height;
        moment.locale(['fr', 'fr']);
        var date = moment(this.state.postData.createdAt).format('LLLL');
        var isFavorite = false;

        if (typeof this.state.postDataLib == "object" )
        {
            for (const [key, value] of Object.entries(this.state.postDataLib)) {
                if (value.id === this.state.postData.id)
                {
                    isFavorite = true;
                }
            }
        } else {
            //If no argument is passed for comparaison then it's true
            isFavorite = true;
        }

        if (this.state.postData.assets && this.state.postData.assets.length)
        {
            return (
                <View style={{alignItems: 'center', paddingTop: 20}}>
                    <Loader loading={this.state.loading}/>
                    <Card style={{width : width /1.05}}>
                        <Card.Content>
                            <Title size={20}>{this.state.postData.title}</Title>
                            <Text size={10} style={{color: 'grey'}}> - {date}</Text>
                        </Card.Content>
                        <Card.Cover source={{ uri: getUrl() + "/asset/file/" + this.state.postImage }} />
                        <Card.Content>
                            <Paragraph style={{paddingTop : 10}}>{this.state.postData.description}</Paragraph>
                        </Card.Content>

                        <Card.Actions style={{ justifyContent: "flex-end" }}>
                            <IconButton
                                onPress={() => {
                                    if(this.state.is_liked === false)
                                    {this._fetchCreateReactions()}
                                }}
                                aria-label="add to favorites"
                                icon="heart-outline"
                            />

                                {this.state.postData.reactions.length > 1 ?

                                    <Text style={{color : 'black'}}>{this.state.postData.reactions.length - 1} </Text>
                                    :
                                    <Text style={{color : 'black'}}>0</Text>
                                }
                            {isFavorite === true ?
                                <IconButton
                                    onPress={() => {
                                        {this._removeFromLibrary()}
                                    }}
                                    aria-label="bookmark"
                                    icon="bookmark" />
                                :
                                <IconButton
                                    onPress={() => {
                                        {this._addToLibrary()}
                                    }}
                                    aria-label="bookmark"
                                    icon="bookmark-outline" />
                            }
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
                            <Text size={10} style={{color: 'grey'}}> - {date}</Text>
                            <Paragraph style={{paddingTop : 10}}>{this.state.postData.description}</Paragraph>
                        </Card.Content>

                        <Card.Actions style={{ justifyContent: "flex-end" }}>
                            <IconButton
                                onPress={() => {
                                    if(this.state.is_liked === false)
                                    {this._fetchCreateReactions()}
                                }}
                                aria-label="add to favorites"
                                icon="heart-outline"
                            />
                            {this.state.reactionsLength > 1 ?

                                <Text style={{color : 'black'}}>{this.state.reactionsLength - 1} </Text>
                                :
                                <Text style={{color : 'black'}}>0</Text>
                            }
                            {isFavorite === true ?
                                <IconButton
                                    onPress={() => {
                                        {this._removeFromLibrary()}
                                    }}
                                    aria-label="bookmark"
                                    icon="bookmark" />
                                :
                                <IconButton
                                    onPress={() => {
                                        {this._addToLibrary()}
                                    }}
                                    aria-label="bookmark"
                                    icon="bookmark-outline" />
                            }
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