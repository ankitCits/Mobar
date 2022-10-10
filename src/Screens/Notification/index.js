import React, { Component } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getNotification } from '../../api/common';
import { isLoggedIn, showToaster } from '../../api/func';
import NoContentFound from '../../Component/NoContentFound';
import ThemeFullPageLoader from '../../Component/ThemeFullPageLoader';
import { UnAuthorizedUser } from '../../config';
import { ThemeColors } from '../../Theme/ThemeColors';
import HeaderSide from '../Component/HeaderSide';
import MyTabs from './Tabs';
export default class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibility: false,
      data:[],
      isLoading:false
    };
  }

  async componentDidMount() {
    if(await isLoggedIn()){
   this.fetchData(); 
  }else{
showToaster(UnAuthorizedUser);
  }
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
      this.state.data.length > 0 ? 
           (
             <MyTabs data={this.state.data} />):
             (<NoContentFound title="No Data Found" />)
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
