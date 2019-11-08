import React  from 'react';
import { StyleSheet, Text, View, Animated, TouchableOpacity, Button } from 'react-native';

export default class Animations extends React.Component {
  constructor(props){
      super(props)
      this.state = {
          fadeValue: new Animated.Value(0),
      }
  }

  _fadeAnimation = () => {
      //alert("Press fade!");
        Animated.timing(this.state.fadeValue, {
            toValue: 1,
            duration: 1000, //1 second
        }).start();
    }
  
    render() {
    return (
      <View style={styles.container}>
          <Animated.View style={[styles.animationView, {opacity: this.state.fadeValue}]}>
           
           </Animated.View>
           
           <Button
          title="trolo"
          onPress={this._fadeAnimation}
        />
           
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  animationView: {
      width: 100,
      height: 100,
      backgroundColor: 'skyblue',
  },
  button: {
      backgroundColor: 'steelblue',
      height: 45,
      marginTop: 20,
  },
  buttonText: {
      color: 'white',
      padding: 12,
      paddingHorizontal: 20,
      fontWeight: 'bold',
      fontSize: 18
  }
});