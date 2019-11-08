import React from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';

export default class MenuButton extends React.Component{
    render(){
        return(
            // <Ionicons
            //     name="md-menu"
            //     color='#000'
            //     size={45}
            //     style={styles.menuIcon}
            //     onPress={() => this.props.navigation.toggleDrawer()}
            
            // />
            <TouchableOpacity onPress={() => this.props.navigation.toggleDrawer()}>
                <Image source={require('../images/icons/menuIcon.png')} style={styles.menuIcon}/>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    menuIcon: {
        zIndex: 9,

    }
})