import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image} from 'react-native';


export default class MenuButton extends React.Component{
    render(){
        return(

            <View style={styles.menuIcon}>
            <TouchableOpacity style={styles.btnStyle} onPress={() => this.props.navigation.toggleDrawer()}>
                <Image source={require('../images/icons/menuButton.png')} style={styles.menuIcon}/>
            </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    menuIcon: {
        zIndex: 9,
        width: 50,
        height: 35

    }
})