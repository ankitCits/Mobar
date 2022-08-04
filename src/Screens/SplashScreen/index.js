import React from 'react';
import {
  View,
  Image,
  StyleSheet,
} from 'react-native';
import images from '../../assets/images';

class Splash extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  // Render any loading content that you like here
  render() {
    return (
      <View style={{lex:1,alignSelf: 'center'}}>
        <Image
          source={images.launch_screen}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({});
