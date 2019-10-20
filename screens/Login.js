import React from 'react';
import { 
  View, 
  Text,  
  StyleSheet, 
  SafeAreaView, 
  Dimensions, 
  Platform, 
  KeyboardAvoidingView,
  AsyncStorage,
  Keyboard,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import * as Icon from '@expo/vector-icons'
import { Form, Item, Label, Input, Card, CardItem, CheckBox  } from 'native-base';
import axios from 'axios';
import { Button, Spinner } from '../components/Common/Index';
import md5 from 'md5';
import DropdownAlert from 'react-native-dropdownalert';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Modal from "react-native-modal"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Colors from '../constants/Colors'
import NetInfo from '@react-native-community/netinfo';
import * as Network from 'expo-network';
import endpoint from '../constants/endpoint'

const DomainUrl = endpoint.DomianUrl

export default class Login extends React.Component {
  
constructor(props) {
  super(props);
  this.state = {
    userName: 'teacher',
    userPassword: 'test',
    data: [],
    error:null,
    isTask:false,
    errorMsg:'',
    showModal: false,
    FirstLogin: null,
    Mac: null,
    IPV4: null,
    InternetReachable: null,
    ConnectionType: null,
    success: null,
    data: null,
    response: null,
  }
}

componentDidMount = async() => {
    this.setState({success: true})
    await Network.getNetworkStateAsync().then(data => {
      //console.log('data is ',data.isInternetReachable)
      this.setState({InternetReachable : data.isInternetReachable})
    })
    await Network.getIpAddressAsync().then(data => {
      this.setState({IPV4: data})
    }).catch(error => {
      console.log('Error from IP data is ',error)
    })
    await Network.getMacAddressAsync('wlan0').then(data => {
        console.log('mac : *********', data)
        this.setState({Mac: data})
    })
    await NetInfo.fetch().then(state => {
      console.log('state is ==> ',state)
      state.type == 'wifi' ? null : this.dropdown.alertWithType('error', 'Not Connected to WiFi', 'Please connect to your classrooms WiFi to login.');
      this.setState({ConnectionType: state.type})
    }).catch(error => {
      console.log('Error from NetInfo is ',error)
    });

    NetInfo.addEventListener(state => {
      //console.log('status is ==> ',state)
      this.state.ConnectionType == 'wifi' ? console.log('connected') :  this.setState({ConnectionType: state.type})
      //state.type == 'wifi' ? null : this.dropdown.alertWithType('error', 'Not Connected to WiFi', 'Please connect to your classrooms WiFi to login.');
    });
}

componentDidUpdate = () => {
  NetInfo.fetch().then(state => {
    if (this.state.ConnectionType == 'wifi' && state.type != 'wifi') {
      this.setState({ConnectionType: state.type})
    }
    else if (this.state.ConnectionType != 'wifi' && state.type == 'wifi') {
      this.setState({ConnectionType: state.type})
    }
    else if(this.state.ConnectionType == 'wifi' && state.type == 'wifi') {}
    else {
      //console.log('status is in update  ==> ',state)
    }
  });
}

_makeRemoteRequest = async() => {
  try {
    console.log('inside get user');
    const LOGIN_URL = DomainUrl+'/wifi/index.php/api/auth/login';
     
     await axios.post(LOGIN_URL, JSON.stringify({
      "username": this.state.userName,
      "password": this.state.userPassword,
      "clientmac": this.state.Mac
    }), { 
      headers : {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
        }
        
    })
    .then(response=> { 
      console.log('response status from API ', response.status)
      response.status == 200 ? 
        this.setState({data: response.data, isTask: false, response: response.status})
      : this.dropdown.alertWithType('info', 'Something went wrong while getting response,', "Please check if you are connected to the class WiFi.")
    });
  }
  catch(error) {
    //console.log('error is ',error.response.data.error)
    console.log('error is ',error.response)
    error.response.status == 401 ? this.dropdown.alertWithType('error', 'Incorrect Credentials', error.response.data.error) : this.dropdown.alertWithType('info', 'Something went wrong', "Please check if you are connected to the class WiFi");
    this.setState({isTask:false})
  }
}

_getUsername =  userName => {
  this.setState({userName: userName})
}

_getPassword =  userPassword => {
  this.setState({userPassword: userPassword})
}

_signInAsync = async () => {
  this.setState({isTask:true})
  await this.setState({error:null});
  console.log('onPress Login')
  if(this.state.userName==null || this.state.userPassword==null || this.state.userName.length<2 || this.state.userPassword.length<3  ){
    this.setState({error:'1',errorMsg:'Please fill information to continue login.'});
    this.setState({isTask:false})
    return;
  }
  else if( this.state.ConnectionType != 'wifi') {
    this.dropdown.alertWithType('error', 'Not Connected to WiFi', 'Please connect to your classrooms WiFi to login.');
    this.setState({isTask:false})
  }
  else {
    console.log('going to hit LOGIN API')
    await this._makeRemoteRequest()
    this.setState({showModal: true})
  }
}

_renderErrorMsg(){
  if(this.state.error){
    return (
      <View style={{alignItems:'center',justifyContent :'center',}} >
        <Text style={{color:Colors.errorMessageColor,fontSize:14}}>{this.state.errorMsg}</Text>
        </View>
    )
  }
  else return null
}

_renderButton(){
  if(this.state.isTask){
    return (<Spinner size='large'/>);
  }
  else{
    return ( <Button 
      onPress = {this._signInAsync}
      children = 'Login'
    />);
  }
}

_decideModalToShow = () => {
  if(this.state.response == 200 && this.state.showModal) {
    return (
      <Modal style = {{flex: 1,}} 
        isVisible= {this.state.showModal} 
        animationIn = 'slideInLeft'
        animationOut = 'slideOutRight'
        useNativeDriver
        coverScreen 
        hasBackdrop
        backdropColor = 'rgba(74, 77, 78, 0)'
        style = {{backgroundColor: 'rgba(211,211,211,0.7)', height : Dimensions.get('window').height, width: Dimensions.get('window').width, right: 20, paddingHorizontal: 30}}
      >
        <Card
          style = {{height: hp('50'), backgroundColor: '#fff', borderRadius: 30}}
        >
          <View 
            style = {{flex: 5, backgroundColor: '#fff',borderRadius: 30}}
          >
            <View style={{ flex: 3, alignItems: 'center', justifyContent: 'center'}}>
              <Image 
                source = {require('../assets/images/Success.png')} 
                style = {{resizeMode: 'contain', width: 150, height: 150}}
              />
            </View>
            <Text style={{flex: 1, color: '#4AB8C1', fontSize: 20, fontWeight: 'bold', alignSelf: 'center'}}>Success</Text>
            {this.state.data.role == 0 ? <Text style={{flex: 1, color: '#000', fontSize: 14, fontWeight: '200', alignSelf: 'center', flexWrap: 'wrap'}}>You are now able to access {this.state.data.class} data.</Text> : <Text style={{flex: 1, color: '#000', fontSize: 14, fontWeight: '200', alignSelf: 'center', flexWrap: 'wrap'}}>Your attendance has been successfully marked for CS427 lecture {this.state.data.lecture_no}.</Text>}
          </View>
          <TouchableOpacity transparent
            style={{flex: 1, backgroundColor: '#4AB8C1',justifyContent: 'center', alignItems: 'center',borderBottomLeftRadius: 30, borderBottomRightRadius: 30,}}
            onPress = {() => {this._closeModal()}}
          >
            <Text style={{alignSelf : 'center', color: '#fff', fontSize: 20}}>Close</Text>
          </TouchableOpacity> 
        </Card>
      </Modal> 
    )
  }
  else if(this.state.response != 200 && this.state.showModal){
    return(
      <Modal style = {{flex: 1,}} 
        isVisible= {this.state.showModal} 
        animationIn = 'slideInLeft'
        animationOut = 'slideOutRight'
        useNativeDriver
        coverScreen 
        hasBackdrop
        backdropColor = 'rgba(74, 77, 78, 0)'
        style = {{backgroundColor: 'rgba(211,211,211,0.7)', height : Dimensions.get('window').height, width: Dimensions.get('window').width, right: 20, paddingHorizontal: 30}}
      >
        <Card
          style = {{height: hp('50'), backgroundColor: '#fff', borderRadius: 30}}
        >
          <View 
            style = {{flex: 5, backgroundColor: '#fff',borderRadius: 30}}
          >
            <View style={{ flex: 3, alignItems: 'center', justifyContent: 'center'}}>
              <Image 
                source = {require('../assets/images/Failed.png')} 
                style = {{resizeMode: 'contain', width: 150, height: 150}}
              />
            </View>
            <Text style={{flex: 1, color: '#e60000', fontSize: 20, fontWeight: 'bold', alignSelf: 'center'}}>Failed</Text>
            <View style={{flex: 1, paddingHorizontal: 10}}><Text style={{flex: 1, color: '#000', fontSize: 14, fontWeight: '200', alignSelf: 'center', flexWrap: 'wrap'}}>You are connected to another classes WiFi, Please connect to your class WiFi or contact your admin in charge.</Text></View>
          </View>
          <TouchableOpacity transparent
            style={{flex: 1, backgroundColor: '#2B2B2B',justifyContent: 'center', alignItems: 'center',borderBottomLeftRadius: 30, borderBottomRightRadius: 30,}}
            onPress = {() => {this._closeModal()}}
          >
            <Text style={{alignSelf : 'center', color: '#fff', fontSize: 20}}>Close</Text>
          </TouchableOpacity> 
        </Card>
      </Modal> 
    )
  }
  else return null
}

_closeModal = async () => {
  this.setState({showModal: false})
  this.setState({isTask: false})
  this.setState({userName: ''})
  this.setState({userPassword: ''})
  if(this.state.response == 200 && this.state.ConnectionType == 'wifi') {
    await AsyncStorage.setItem('Token', this.state.data.token);
    //this.props.navigation.navigate('Home', {AttendanceStatus: this.state.data.attendence_status, TotalAttendance: this.state.data.total_attendence, lectureNumber: this.state.data.lecture_no, lectureNotes: this.state.data.lecture_summary, Percentage: this.state.data.percentage, LecturerIncharge: this.state.data.lecture_incharge, role: this.state.data.role})
    this.props.navigation.navigate('Home', {data: this.state.data})
  }
  else this.dropdown.alertWithType('error', 'Not Connected to WiFi', 'Please connect to your classrooms WiFi to login.');
}


  render() {
    return(
      // <DismissKeyboard>
        <SafeAreaView style = {{backgroundColor: Colors.appBackgroundColor, height: Dimensions.get('window').height,}}
            onResponderMove= {()=> {
            console.log('Responder move');
            return true;
          }}
        >
          <KeyboardAvoidingView behavior="position">
            <Card style ={{width: Dimensions.get('window').width - 40, left: 16,borderRadius: 20, borderColor: Colors.loginButtonTextColor,}}>

              <KeyboardAwareScrollView
                style={{ backgroundColor: '#fff', borderRadius: 20}}
                resetScrollToCoords={{ x: 0, y: 0 }}
                scrollEnabled={false}
                bounces={true} 
                keyboardShouldPersistTaps={'handled'}
                showsVerticalScrollIndicator= {false}
              >
                <CardItem style = {{flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'column', backgroundColor: 'rgba(255,255,255,0)'}}>
                    <Image 
                        source = {require('../assets/images/BrandLogo.png')} 
                        style = {{resizeMode: 'contain', width: 150, height: 150}}
                    />
                    <Text style={{flex: 1, flexWrap: 'wrap', alignSelf: 'center', fontSize: 12, color: Colors.appTextColor, fontWeight: '400'}}>Login to this app while being connected to the WIFI of the classroom where your class is to be held to get you attendance marked.</Text>
                </CardItem>
                <View>
                  <Form style = {{paddingTop: 20, paddingHorizontal: 15}}>
                    <Item regular style = {{borderColor: Colors.loginButtonColor ,borderWidth: 1,borderRadius: 60,}}>
                        <Input 
                        placeholder = "StudentID"
                        autoCorrect = {false}
                        clearButtonMode = "while-editing"
                        keyboardAppearance = "dark"
                        maxLength = {9}  
                        onChangeText = {(userName) => this._getUsername(userName)}
                        value = { this.state.userName }
            
                        />  
                    </Item>   
                    <View style={{paddingVertical: 5}}></View>
                    <Item regular style = {{borderColor: Colors.loginButtonColor ,borderWidth: 1,borderRadius: 60,}}>
                        <Input 
                        placeholder = "Password"
                        autoCorrect = {false}
                        clearButtonMode = "while-editing"
                        keyboardAppearance = "dark"
                        maxLength = {5}  
                        onChangeText = {(userPassword) => this._getPassword(userPassword)}
                        value = { this.state.userPassword }
                        secureTextEntry
                        />  
                    </Item>   
                  </Form>
                </View>
                <View style = {{alignItems: 'center', paddingVertical: 30 ,flex: 1,}}>
                  {this._renderErrorMsg()}
                  {this._renderButton()}
                </View>
              <DropdownAlert ref={ref => this.dropdown = ref} />
              </KeyboardAwareScrollView> 
            </Card>
          </KeyboardAvoidingView>   
          {this._decideModalToShow()}
        </SafeAreaView>
        
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop:  Platform.OS == 'android' ? 40 : 40,
    alignItems: 'center', 
  },
  fontStyle : {
    paddingTop : 10, 
    fontSize: 20, 
    fontWeight: '500',
    textAlign: 'center', 
    alignSelf: 'stretch',
},
LogoImage: {
    width : 60,
    height : 50, 
  }, 
  LogoImageButton: {
    paddingBottom : 20,
    paddingRight : 10,
  },
  modalView: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    backgroundColor: 'rgba(245,245,245,0.8)',
    alignSelf:'center',
    elevation : 2,
    position : 'relative',
  },
  OTPinputContainer:  {
    backgroundColor: '#f5f5f5'
  },
  OTPErrorInputContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  OTPErrorInput: {
    fontWeight: '400',
    fontSize: 12,
    color: '#e60000'
  },
  OTPcontainer: {
    width: Dimensions.get('window').width  - 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  OTPinput: {
    color : '#3a3d42'
  },
  headerWrapper: {
    flex:1,
    flexDirection: 'row',
  },
  headerTitle: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  headerCancelButton: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'space-around',
  },
});
