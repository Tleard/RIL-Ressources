// Components/ResourceItem.js

import React, { PureComponent } from "react";

import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  IconButton,
  Icon,
} from "react-native-paper";
import defaultImage from "../../assets/default-picture.png";
import { getUrl } from "../../API/RequestHandler";
//import {navigate} from "@react-navigation/routers/lib/typescript/src/CommonActions";
const { width: WIDTH } = Dimensions.get("window");

class CategoryItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      id: "",
      error_message: "",
    };
  }

  render() {
    const post = this.props.postData;
    const { DisplayDetails } = this.props;

    return (
      <View style={styles.main_container}>
  
        <Card style={{ paddingBottom: 10 }}>
          <TouchableOpacity
            onPress={() => DisplayDetails(this.props.postData.name)}
          >
             
            <Card.Content>
             
              <Title
                style={{ paddingTop: 20, textTransform: "capitalize" }}
                numberOfLines={6}
              >
                {this.props.postData.name}
              </Title>
              <Card.Actions
                style={{ justifyContent: "flex-end", marginTop: -48 }}
              >
                <IconButton icon="arrow-right"></IconButton>
              </Card.Actions>
            </Card.Content>
          </TouchableOpacity>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    backgroundColor: "#CDCDCD",
    paddingTop: 10,
    paddingRight: 10,
    paddingLeft: 10,
    paddingBottom: 10,
  },
});

export default CategoryItem;
