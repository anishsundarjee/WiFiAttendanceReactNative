import React, { Component } from "react"
import { View, Text, Dimensions, TouchableOpacity, StyleSheet} from "react-native"
import { Grid, Row, Col } from "react-native-easy-grid"
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'

export default class HeadDisplay extends Component {

  render() {
    return (
        <Grid style = {{ width: Dimensions.get('window').width-10,height:150,}}>
            <Row style = {{ marginLeft: 5}}>
              <Col size = {2}
                style = {{alignItems: 'flex-start', justifyContent: 'center',paddingLeft:5, paddingVertical:5}}
              >
                <View style = {{flex: 1, alignItems: 'flex-start',justifyContent:'center'}}>
                  <Text style={{fontSize: 20, fontWeight: '700', color: '#4a4d4e'}}>
                    Bula,
                  </Text>
                  <Text style={styles.fontSize}>
                    {this.props.name}
                  </Text>
                </View>
              </Col>
              <Col size = {2} style={{paddingRight:5}}>
                <View style = {{flex: 1, alignItems: 'flex-end', justifyContent: 'center', marginTop: 10}}>
                  <Text style={styles.fontSize}>
                    M-PAiSA Balance
                  </Text>
                  <Text style={styles.fontSize}>
                    {this.props.balance}
                  </Text>
                </View>
              </Col>
            </Row>
            <Row style = {{ marginLeft: 5,marginVertical: 5}}
                style = {{alignItems: 'flex-start', justifyContent: 'flex-end',paddingLeft:5, paddingVertical:5,}}>
              <Col
                style = {{alignItems: 'flex-start', justifyContent: 'flex-end',paddingLeft:5, paddingVertical:5}}
              >
                <View style = {{flex: 1,alignItems: 'flex-start', justifyContent: 'center',height:30,}}>
                  <TouchableOpacity
                    style = {{ alignItems: 'center',paddingHorizontal: 5, backgroundColor: '#F9F9F9', borderRadius: 10, borderColor: '#EEE',borderWidth: 1, flexDirection:'row',width: 150, height:50}}
                    onPress = {this.props.onPress}
                  >
                    <IconFontAwesome name = 'refresh' size = {26} color = '#4a4d4e'
                      style = {{marginHorizontal: 5,}}
                    />
                    <Text style = {{color: '#4a4d4e',fontWeight: '700', textAlign: 'right', fontSize: 15}}>{this.props.Type}</Text>
                  </TouchableOpacity>
                </View>
              </Col>
            </Row>

        </Grid>
    );
  }
}

const styles = StyleSheet.create ({
    container:  {
        height : 100,
        backgroundColor : '#fff',
    },
    fontSize: {
        fontSize: 18, 
        fontWeight: '700', 
        color: '#4a4d4e',
    },

});
