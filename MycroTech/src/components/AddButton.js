import React from 'react';
import { StyleSheet, Image } from 'react-native';

export default class AddButton extends React.Component{
    render(){
        return(
            // <Ionicons
            //     name="md-add-circle"
            //     color='#d14ba6'
            //     size={60}
            //     style={styles.addIcon}
            // />
            
            <Image source={require('../images/icons/menuIcon.png')} style={styles.addIcon} />
        );
    }
}

const styles = StyleSheet.create({
    addIcon: {
        zIndex: 9,
        opacity: 0.8,
        left: 5,
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 1},
        shadowRadius: 1,
        shadowOpacity: 0.30,

    }
})