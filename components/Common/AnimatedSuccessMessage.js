import React from 'react'
import { Animated, StyleSheet } from 'react-native'

export default class SuccessView extends React.Component {
    state = {
      fadeAnim: new Animated.Value(0),  // Initial value for opacity: 0
    }
  
    componentDidMount() {
      Animated.timing(                  // Animate over time
        this.state.fadeAnim,            // The animated value to drive
        {
          toValue: 1,                   // Animate to opacity: 1 (opaque)
          duration: 5500,              // Make it take a while
        }
      ).start();                        // Starts the animation
    }
  
    render() {
      let { fadeAnim } = this.state;
  
      return (
        <Animated.View                 // Special animatable View
          style={[styles.animatedStyle, {opacity:fadeAnim}]}
        >
          {this.props.children}
        </Animated.View>
      );
    }
  }
  
  const styles = StyleSheet.create({
      animatedStyle : {
        alignItems: 'center',
        justifyContent : 'center'
      },
  })
