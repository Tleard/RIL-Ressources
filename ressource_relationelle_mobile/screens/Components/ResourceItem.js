// Components/ResourceItem.js

import React, { PureComponent } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  AsyncStorage,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  Icon,
  IconButton,
} from "react-native-paper";
import defaultImage from "../../assets/default-picture.png";
import { getUrl } from "../../API/RequestHandler";
import moment from "moment";
const { width: WIDTH } = Dimensions.get("window");

class ResourceItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      id: "",
      error_message: "",
      userId : "",
      reactions_lenght : 0,
      reaction: "",
      is_liked: false,
      isFavorite : false
      is_reported:false
    };
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
                body : JSON.stringify({'id' : this.props.postData.id})
              })
                  .then((response) => response.json())
                  .then((responseText) => {
                    this.state.loading = false;
                    alert("Ressource ajoutée aux favoris");
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

  _fetchCreateReactions = async () => {
    try {
      await AsyncStorage.getItem("userToken").then((responseJson) => {
        try {
          let url =
            getUrl() + "/api/resources/reaction/" + this.props.postData.id;
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
              this.setState({postData: responseText})
              if (responseText[0].reactions.length > 1)
              {
                this.setState({reaction_length : responseText[0].reactions.length})
              }
              //this.setState({reaction_length: this.props.postData.reactions.length})
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
  _fetchReportRessource = async () => {
    try {
        await AsyncStorage.getItem("userToken").then((responseJson) => {
            try {
                let url =
                    getUrl() + "/api/user/report_ressource";
                return fetch(url, {
                    method: "POST",
                    headers: new Headers({
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": "Bearer " + responseJson,
                    }),
                    body: JSON.stringify({
                        id: this.props.postData.id,
                    })

                })
                    .then((response) => response.json(), )
                    .then((responseText) => {
                        this.setState({ is_reported: true });
                        
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
    const post = this.props.postData;
    const { DisplayDetails } = this.props;
    moment.locale(['fr', 'fr']);
    var date = moment(this.props.postData.createdAt).format('LLLL');
    var isFavorite = false;

    //check for favorite
    if (typeof this.props.postDataLib == "object" )
    {
      for (const [key, value] of Object.entries(this.props.postDataLib)) {
        if (value.id === this.props.postData.id)
        {
          isFavorite = true;
        }
      }
    } else {
      //If no argument is passed for comparaison then it's true
      isFavorite = true;
    }


    return (
      <View
        style={{
          backgroundColor: "#CDCDCD",
          paddingTop: 10,
          paddingRight: 10,
          paddingLeft: 10,
        }}
      >
        <Card style={{}}>
          <TouchableOpacity
            onPress={() => DisplayDetails(this.props.postData.id)}
          >
            <Card.Content>
              <Title style={{ paddingTop: 15 }} numberOfLines={6}>
                {this.props.postData.title}
              </Title>
              <Text size={10} style={{ color: "grey" }}>
                {this.props.postData.author.username} - {" "}
                {date}
              </Text>
              <Paragraph style={{ paddingTop: 10 }} numberOfLines={5}>
                {this.props.postData.description}
              </Paragraph>
            </Card.Content>
          </TouchableOpacity>
          <Card.Actions style={{ justifyContent: "flex-end" }}>

            {this.state.is_liked?
                <IconButton
                    aria-label="add to favorites"
                    icon="heart"
                />
                :
                <IconButton
                  if(this.state.is_liked === false)
                      {this._fetchCreateReactions()}
                      else alert('Vous avez déjà mis like sur cette ressource')
                    }}
                    aria-label="add to favorites"
                    icon="heart-outline"
                />
            }
            
              {this.props.postData.reactions.length > 1 ?
                  <Text>{this.props.postData.reactions.length}</Text>
                  :
                  <Text>0</Text>
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

            <IconButton aria-label="share" icon="share-variant"></IconButton>
            <IconButton aria-label="report" icon="alert-octagon" onPress={() => {
                                if(this.state.is_reported === false)
                                {this._fetchReportRessource()}
                                else alert('Vous avez déjà reporte cette ressource')
                            }}></IconButton>
          </Card.Actions>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    paddingTop: 20,
    flex: 1,
    borderColor: "#000000",
    width: WIDTH - 15,
  },
  image: {
    width: 100,
    height: 120,
    margin: 5,
    paddingRight: WIDTH - 20,
    backgroundColor: "gray",
    alignItems: "center",
  },
  content_container: {
    flex: 1,
    paddingTop: 20,
    borderColor: "#000000",
    width: WIDTH - 15,
  },
  header_container: {
    flex: 3,
  },
  title_text: {
    fontWeight: "bold",
    fontSize: 50,
    flex: 1,
    flexWrap: "wrap",
    paddingRight: 5,
  },
  vote_text: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#000000",
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  description_container: {
    flex: 7,
  },
  description_text: {
    fontStyle: "italic",
    color: "#666666",
    fontSize: 15,
  },
  content_text: {
    color: "#666666",
  },
  date_container: {
    flex: 1,
  },
  date_text: {
    textAlign: "right",
    fontSize: 14,
  },
});

export default ResourceItem;
