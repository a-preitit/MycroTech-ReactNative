import React, { Component } from 'react'
import { StyleSheet, View, Image, Text, TouchableOpacity, ImageBackground, StatusBar, Alert } from 'react-native'

import MenuButton from '../components/MenuButton';
import ArrowLeft from '../components/ArrowLeft';
import Carousel from 'react-native-snap-carousel';


export default class Tutorial extends Component{

    static navigationOptions = {
        header: null,   
    };

    constructor(props){
        super(props);
        this.state = {
            carouselItems: [
                {
                    image: require('../images/carrusel1/1.jpg')
                },
                {
                    image: require('../images/carrusel1/2.jpg')
                },
                {
                    image: require('../images/carrusel1/3.jpg')
                },
            ],
            currentIndex: 0
        }
    }

    txtInteractivo = () => {
        if(this.state.currentIndex == 0  ){
            //Item 1;
            return( 
                    <Text style = {styles.interactivoStyle}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas tincidunt, velit sed sollicitudin tincidunt, nisi lorem faucibus sapien, quis placerat.</Text>   
            )
        }
        else if(this.state.currentIndex == 1){
            return( 
                    <Text style = {styles.interactivoStyle}>Maecenas tincidunt, velit sed sollicitudin tincidunt, nisi lorem faucibus sapien, quis placerat. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>   
            )
        }else{
            return( 
                    <Text style = {styles.interactivoStyle}>Sed sollicitudin tincidunt, Maecenas tincidunt, velit  nisi lorem faucibus sapien, quis placerat. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>   
            )
        }
    
    }

    checkRightArrow = () => {
        if(this.state.currentIndex == 0 || this.state.currentIndex == 1){
            return (
                <AntDesign name="right" color='#A82574' size={40} style={styles.menuIcon} onPress={() => this.carousel._snapToItem(this.state.currentIndex+1)}/>
            )
        }else{
            return (
                <AntDesign name="right" color='#fff' size={40} style={styles.menuIcon}/>  
            )
        }
    }

    checkLeftArrow = () => {
        if(this.state.currentIndex == 1 || this.state.currentIndex == 2){
            return (
                <AntDesign name="left" color='#A82574' size={40} style={styles.menuIcon} onPress={() => this.carousel._snapToItem(this.state.currentIndex-1)}/>
            )
        }else{
            return (
                <AntDesign name="left" color='#fff' size={40} style={styles.menuIcon}/>  
            )
        }
    }

    changeIndex = (currentIndex) => {
        this.setState({ currentIndex });
      }

    
    _renderItem({item,index}){
            return (
                <View style={{flex: 1, justifyContent: 'center', alignItems:'center'}}>
                    <Image style={styles.imageStyle} source={item.image} />
                    <Text style={{color:'#000'}} >{item.title}</Text>
                    {/* this.cambiarInteractivo*/}                        
                </View>    
            )    
    }

    render(){

        const {goBack} = this.props.navigation;

        return(

                <View style={styles.container} source={require('../images/fondo.png')} imageStyle={{opacity: 1}}>

                        <StatusBar hidden />

                        <View style={styles.menuIcon}>
                            <TouchableOpacity style={styles.btnStyle} onPress={() => this.props.navigation.goBack()} >
                                <Image source={require('../images/icons/goBackIcon.png')} style={styles.menuIcon}/>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.carouselContainer}>

                            <View>
                                {this.checkLeftArrow()}
                            </View>
                            
                            <View style={styles.carouselContainerPosta}>
                                <Carousel
                                    ref = { ref => this.carousel = ref}
                                    data={this.state.carouselItems}
                                    sliderWidth={300}
                                    itemWidth={300}
                                    renderItem={this._renderItem}
                                    onSnapToItem={this.changeIndex}
                                    style={styles.carouselStyle}
                                    containerCustomStyle={ {flexGrow: 2} }
                                />
                            </View>
                            <View>
                                {this.checkRightArrow()}
                            </View>

                        </View>
    
                        <TouchableOpacity style={styles.footerView}>  
                            {this.txtInteractivo()}
                                      
                         </TouchableOpacity>

                </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff'

    },
    header: {
        flex: 0.1,
        backgroundColor: 'rgba(235,235,235,1)',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        
    },
    titulo: {
        fontSize: 20,
        marginLeft: 67,
        marginTop: 9
        
    },
    carouselContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    carouselContainerPosta: {
    },  
    titleContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleStyle: {
        fontSize: 30,
        color: '#A82574',
        marginTop: 30
    },
    imageStyle: {
        width: 250,
        height: 350,
        borderWidth: 2,
        borderColor: "rgba(112,112,112,0.5)",
        borderRadius: 30
    },  
    carouselStyle: {

    },
    footerView: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        backgroundColor: 'rgba(0,0,0,0)',

    },
    interactivoStyle: {
        fontSize: 19,
        color: '#000',
        textAlign: 'center'
    },
    siguienteBtn: {
        height: 50,
        width: 230,
        overflow: 'hidden',
        borderColor: '#000',
        borderRadius: 50,
        borderWidth: 1, 
        backgroundColor: '#A82574',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.85 
    },
    menuIcon: {
        zIndex: 9,
        position: 'absolute',
        left: 13,
        top: 9,
        width: 50,
        height: 50
    },
    imageStyle: {
        width: 50,
        height: 50
    },
    btnStyle: {
        width: 50,
        height: 50
    }

});