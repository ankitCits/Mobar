import React, { Component } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getNotification } from '../../api/common';
import images from '../../assets/images';
import ThemeFullPageLoader from '../../Component/ThemeFullPageLoader';
import { ThemeColors } from '../../Theme/ThemeColors';
import HeaderSide from '../Component/HeaderSide';
import MyTabs from './Tabs';
export default class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibility: false,
      data:null,
      isLoading:true
    };
  }

  componentDidMount() {
   this.fetchData(); 
  }
  
  fetchData= async () =>{
    try{
    const res = await getNotification();
    this.setState({data:res.response.result.data,isLoading:false});
    }catch(error){
      this.setState({isLoading:false});
      console.log("Notification > index > fetchData > catch > ",error);  
    }
  }

  render() {
    
    return (
      <SafeAreaView
        style={styles.safeAreaView}>
        <HeaderSide
          name={'Notification'}
          onClick={() => this.props.navigation.pop()}
        />
        
          <View style={styles.container}>
          {this.state.isLoading ?
        (<ThemeFullPageLoader  />)
      :      
           ( <MyTabs data={this.state.data} />)
          }
          </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeAreaView :{
    flex: 1,
  },
  container:{ 
    flex: 1, 
    //marginTop: 0,
    
    borderTopWidth:1,
    borderTopColor:ThemeColors.CLR_BG,

  }
});
