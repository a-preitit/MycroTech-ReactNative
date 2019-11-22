import React from 'react';
import { StyleSheet, Image, View, TouchableOpacity} from 'react-native';
import { NavigationActions } from 'react-navigation';


export default class ArrowLeft extends React.Component{
    render(){
        return(
            <View style={styles.menuIcon}>
            <TouchableOpacity style={styles.btnStyle}  >
                <Image source={require('../images/icons/goBackIcon.png')} style={styles.menuIcon}/>
            </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    menuIcon: {
        zIndex: 9,
        width: 50,
        height: 50
    },
    btnStyle: {
        width: 50,
        height: 50
    }
    
})