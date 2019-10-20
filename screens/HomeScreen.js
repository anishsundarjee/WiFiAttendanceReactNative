
import React from 'react';
import {
  View,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  SafeAreaView,
  AsyncStorage,
  Alert,
  FlatList,
  Dimensions
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { Item, Input } from 'native-base'
import { Spinner } from '../components/Common/Index'
import _ from 'lodash'
import SwitchToggle from 'react-native-switch-toggle';
import endpoint from '../constants/endpoint'
import axios from 'axios';
import DropdownAlert from 'react-native-dropdownalert';

const DomainUrl = endpoint.DomianUrl

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.navigation.state.params.data, //this.props.navigation.state.params.data, 
      fullData: [],
      isLoading: '1',
      query: null,
      toggle: null,
      hasLoadedList:false,
      toggletest:[],
      // data :{
      //   role: 1
      // }
    }
  }

  componentDidMount =  async() => {
    await AsyncStorage.setItem('Token','');
    //console.log('data prop ',this.state.data)
    await this.setState({fullData : this.state.data.data})
    this.setState({toggle: false})
    await this._checkForLoading()
    NetInfo.addEventListener(state=> {
      if(state.type != 'wifi') {
        Alert.alert(
          'Logout',
          'You have disconneted from Class WiFi, Login again to continue',
          [
            {text: 'Ok', onPress: () => this._logout()},
          ],
          { cancelable: false }
        )
        return
      }
    });
  }

  _logout = async () => {
    this.props.navigation.navigate('Login')
  }

  _UpdateStudentStatusAPICall = async(item) => {
    let state = null
    item.status == true ? state = 1 : state = 0
    console.log('state is ', state)
    console.log('student ID is : ',item.student_id)
      try {
        console.log('inside update user');
        const UPDATE_URL = DomainUrl+'/wifi/index.php/api/auth/attendance';
         
         await axios.post(UPDATE_URL, JSON.stringify({
          "student_id": item.student_id,
          "status": state,
        }), { 
          headers : {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer '+this.state.data.token,
            }
            
        })
        .then(response=> { 
          console.log('response status from API ', response.status)
          response.status == 200 ? 
          this.dropdown.alertWithType('success', 'Attendance Updated,', item.student_id +" attendance status is now "+item.status)
          : this.dropdown.alertWithType('info', 'Something went wrong while getting response,', "Please check if you are connected to the class WiFi.")
        });
      }
      catch(error) {
        console.log('error is ',error.response)
        this.dropdown.alertWithType('error', error.response.data.status, error.response.data.error)
      }
    }

  _checkForLoading = ()  =>  {
    console.log('data is : ',this.state.data.data)
    if(this.state.data.token == null) {
        this.setState({isLoading: '1'})
    }
    else {
      this.setState({isLoading: '3'})
    }
    console.log('loading is : ', this.state.isLoading)

  }

  _toggler = async(item,index) => {
    toggletestNew=[...this.state.toggletest]
    toggletestNew.map((obj)=>{
      if(obj.student_id==item.student_id){
        obj.status=!obj.status;
      }
    })
    this.setState({toggletest:toggletestNew})
    console.log('toggle item after toggle',item)
    this._UpdateStudentStatusAPICall(item)
  }

  _toggleAttendance = (item,index) => {
    if(this.state.hasLoadedList==false){

       togObj={
      index:index,
      student_id:item.student_id,
      status:item.status,
    }
      this.state.toggletest.push(togObj);
      this.setState({hasLoadedList:true})
    }
    
      return (
        <SwitchToggle
          switchOn={this.state.toggletest[index].status}
          onPress={()=>{this._toggler(this.state.toggletest[index],index)}}
          key={index}
        />
      )
    }
  

  _renderItem = ({item,index}) => {
    return (
      <View style={{flex: 1,paddingHorizontal:10 }}
      >   
        <View style = {{flex: 1,height: 50, width: Dimensions.get('window').width - 40,alignItems:'center',justifyContent:'space-between', flexDirection: 'row'}}>
          <Text style= {{color : '#32393b',fontWeight:'400',fontSize: 16, paddingHorizontal: 10}}>
            {item.student_id}
          </Text>
          {this._toggleAttendance(item,index)}
        </View>
        <View style = {{backgroundColor: '#707070',  height: 1, margin: 4, marginHorizontal: 10}} ></View>
      </View>
  )}

  _renderFlatlist = () => {
    if (this.state.isLoading == '1') {
      return (<Spinner size='large' />);
    }
    else if(this.state.isLoading == '3'){
      return(
        <View style = {{flex: 1}}>
          <FlatList 
            data={this.state.data.data}
            ListHeaderComponent = {this._renderListHeader}
            renderItem =  {this._renderItem}
            keyExtractor={(item, index) => item + index}
            showsVerticalScrollIndicator = {false}
            extraData={this.state}
          >
          </FlatList>
        </View>
      )
    }
    else if(this.state.isLoading == '4'){
      return (
        <Text style={{fontSize : 30}}>
          OOOPS!!
        </Text>
      )
    }
  }

  _renderListHeader = () => {
    return (
      this._renderSearchBar()
    )
  }

  _renderSearchBar = () => {
    return(
      <View
          style = {{backgroundColor:'#CBAD54',}}
      >
        <View style={{flex: 1, backgroundColor: '#4AB8C1', alignItems: 'center', justifyContent: 'center', height: 60}}>
          <Text style={{color: '#fff', fontSize: 20, fontWeight: 'bold', alignSelf: 'center'}}>
            {this.state.data.class}
          </Text>
        </View>
        <Item regular style = {{borderColor: '#CBAD54',borderWidth: 1,borderRadius: 40, height: 40, backgroundColor:'#CBAD54',marginHorizontal:5,marginVertical:10}}>    
             <Input 
               placeholder = "Search Student here..."
               autoFocus = {false}
               autoCorrect = {false}
               clearButtonMode = "while-editing"
               keyboardAppearance = "dark"
               maxLength = {Platform.OS == 'ios' ? 9 : 9}
               onChangeText = {this._handleSearch}
               value = {this.state.query}
             />
        </Item>
     </View>
    )
  }

  _handleSearch=(text)=>{
    const formatQuery=text.toLowerCase();
    console.log('input',text);
    var filteredData = _.filter(this.state.fullData, student =>{
      if(student.student_id.includes(formatQuery) ){
        console.log('-->',student.student_id)
        return true;
      }
      else{
        return false;
      }
    });
    this.setState({query:text})
    data=filteredData;
 }

  _decideToShowStudentORTeacher = () => {
    if(this.state.data.role == '1') {
      return (
        <View style={{flex: 1,backgroundColor: '#F5F5F5' }}>
          <View style={{flex: 1, backgroundColor: '#4AB8C1', alignItems: 'center', justifyContent: 'center', maxHeight: 60}}>
            <Text style={{color: '#fff', fontSize: 20, fontWeight: 'bold', alignSelf: 'center'}}>
              Attendance Summary
            </Text>
          </View>
          <View style={{flex: 2, paddingHorizontal: 10,}}>
            <View style={{flex: 1, flexDirection: 'row', justifyContent:'space-between', alignItems: 'center', }}>
              <Text style={{color: '#000'}}>
                Attendance Status
              </Text>
              <Text style={{color: '#000'}}>
                {this.state.data.attendence_status}
              </Text>
            </View>
            <View style={{flex: 1, flexDirection: 'row', justifyContent:'space-between', alignItems: 'center'}}>
              <Text style={{color: '#000'}}>
                Total Attendance
              </Text>
              <Text style={{color: '#000'}}>
                {this.state.data.total_attendence}
              </Text>
            </View>
            <View style={{flex: 1, flexDirection: 'row', justifyContent:'space-between', alignItems: 'center'}}>
              <Text style={{color: '#000'}}>
                Percentage
              </Text>
              <Text style={{color: '#000'}}>
                {this.state.data.percentage}
              </Text>
            </View>
          </View>
          <View style={{flex: 1, backgroundColor: '#4AB8C1', alignItems: 'center', justifyContent: 'center', maxHeight: 60}}>
            <Text style={{color: '#fff', fontSize: 20, fontWeight: 'bold', alignSelf: 'center'}}>
              Lecture Summary
            </Text>
          </View>
          <View style={{flex: 2, paddingHorizontal: 10,}}>
            <View style={{flex: 1, flexDirection: 'row', justifyContent:'space-between', alignItems: 'center', }}>
              <Text style={{color: '#000'}}>
                Lecture Number
              </Text>
              <Text style={{color: '#000'}}>
                {this.state.data.lecture_no}
              </Text>
            </View>
            <View style={{flex: 1, flexDirection: 'row', justifyContent:'space-between', alignItems: 'center'}}>
              <Text style={{color: '#000'}}>
                Lecturer Incharge
              </Text>
              <Text style={{color: '#000'}}>
                {this.state.data.lecture_incharge}
              </Text>
            </View>
            <View style={{flex: 1, flexDirection: 'row', justifyContent:'space-between', alignItems: 'center'}}>
              <Text style={{color: '#000'}}>
                Lecturer Summary
              </Text>
              <Text style={{color: '#000'}}></Text>
            </View>
          </View>
          <View style = {{flex: 3, alignItems: 'center', justifyContent: 'center', padding: 10, }}>
            <View style = {{flex: 1, alignItems: 'center', justifyContent: 'center', padding: 10, backgroundColor: '#fff', borderWidth: 0.5, borderColor: '#707070', borderRadius: 30}}>
              <Text style={{alignSelf: 'center', color: '#000', fontSize: 16, flexWrap: 'wrap',}}>
                {this.state.data.lecture_summary}
              </Text>
            </View>
          </View>
        </View>
      )
    }
    else if(this.state.data.role == '0') {
      return (
        <View style={{flex: 1,backgroundColor: '#F5F5F5' }}>
          {this._renderFlatlist()}
        </View>
      )
    }
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1,backgroundColor: '#F5F5F5' }}>
        {this._decideToShowStudentORTeacher()}
        <DropdownAlert ref={ref => this.dropdown = ref} />
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});

let data =  [
 {
    "status": true,
    "student_id": "s1123207",
  },
 {
    "status": true,
    "student_id": "s1123204",
  },
 {
    "status": true,
    "student_id": "s1123202",
  },
 {
    "status": false,
    "student_id": "s1123201",
  },
 {
    "status": true,
    "student_id": "s1123107",
  },
 {
    "status": false,
    "student_id": "s1124207",
  },
 {
    "status": true,
    "student_id": "s2123207",
  },
 {
    "status": true,
    "student_id": "s1323209",
  },
]



