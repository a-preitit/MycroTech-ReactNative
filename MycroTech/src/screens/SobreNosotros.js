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
                    <Text style = {styles.interactivoStyle}>MycroTech cuenta con una variedad de utilidades que se adecuan a usted. Podrá cambiar la tonalidad de colores y elegir con que banda está trabajando ahora y sus canciones.</Text>   
            )
        }
        else if(this.state.currentIndex == 1){
            return( 
                    <Text style = {styles.interactivoStyle}>Con MycroTech podrá operar todos los microfonos del estudio, sin tener que moverse de su asiento. Simplemente mueva los circulos en el eje hacia la ubicación deseada.</Text>   
            )
        }else{
            return( 
                    <Text style = {styles.interactivoStyle}>MycroTech es sinonimo de comodidad es por ello que nos preocupamos por ofrecerle la mejor aplicación. Nuestro sistema de control mover el micrófono en movimientos más largos.</Text>   
            )
        }
    
    }

    checkRightArrow = () => {
        if(this.state.currentIndex == 0 || this.state.currentIndex == 1){
            return (
                <TouchableOpacity style={styles.btnStyle} onPress={() => this.carousel._snapToItem(this.state.currentIndex+1)}>
                    <Image source={require('../images/icons/controlRight.png')} style={styles.menuIcon}/>
                </TouchableOpacity>
            )
        }else{
            return (
                <TouchableOpacity style={styles.btnStyle}>
                </TouchableOpacity>
            )
        }
    }

    checkLeftArrow = () => {
        if(this.state.currentIndex == 1 || this.state.currentIndex == 2){
            return (
                <TouchableOpacity style={styles.btnStyleLeft} onPress={() => this.carousel._snapToItem(this.state.currentIndex-1)}>
                    <Image source={require('../images/icons/controlLeft.png')} style={styles.menuIcon}/>
                </TouchableOpacity>
            )
        }else{
            return (
                <TouchableOpacity style={styles.btnStyle}>
                </TouchableOpacity>
            )
        }
    }

    changeIndex = (currentIndex) => {
        this.setState({ currentIndex });
      }

    
    _renderItem({item,index}){
            return (
                <View style={{flex: 1, justifyContent: 'center', alignItems:'center'}}>
                    <Image style={styles.imgStyle} source={item.image} />
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
        flex: 0.01,
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
        marginTop: 70
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
    imgStyle: {
        width: 300,
        height: 480,
        paddingVertical: 15,
        paddingHorizontal: 10,
        marginLeft: 0,
        borderWidth: 2,
        borderColor: "rgba(112,112,112,0.5)",
        borderRadius: 10,
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
        fontSize: 15,
        color: '#000',
        textAlign: 'center',
        marginHorizontal: 8,
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
        height: 50,
        marginRight: 10
    },
    btnStyleLeft: {
        width: 50,
        height: 50,
        marginRight: 23
    }

});