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
//import {navigate} from "@react-navigation/routers/lib/typescript/src/CommonActions";
const { width: WIDTH } = Dimensions.get("window");

class ResourceItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      id: "",
      error_message: "",
      reactions_lenght : 0,
      reaction: "",
      is_liked: false,
    };
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
              this.setState({reaction_length: this.props.postData.reactions.length})
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
                {this.props.postData.author.username} -{" "}
                {this.props.postData.createdAt}
              </Text>
              <Paragraph style={{ paddingTop: 10 }} numberOfLines={5}>
                {this.props.postData.description}
              </Paragraph>
            </Card.Content>
          </TouchableOpacity>
          <Card.Actions style={{ justifyContent: "flex-end" }}>
            <IconButton
              onPress={() => {
                  if(this.state.is_liked === false)
                  {this._fetchCreateReactions()}
            }}
              aria-label="add to favorites"
              icon="heart-outline"
            />
            <Text>{this.props.postData.reactions.length}</Text>
            <IconButton aria-label="share" icon="share-variant"></IconButton>
            <IconButton aria-label="report" icon="alert-octagon"></IconButton>
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
