import React, { Component } from 'react';
import { TextInput, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
export default class Profile extends Component {
  static navigationOptions = {
    title: 'Vartotojo profilis',
    headerTitleStyle:{
	fontWeight:'500',
	fontSize:24,
	marginTop:25,
	alignSelf:'center'
},
  };
  render() {
    const chewronsSIze =30;
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>

        <View style={styles.top}>
        <Image source={require('../components/img/logo-juodas.png')}
      style={{width:'50%',height:'50%'}} />
                  {/*  <Avatar
          xlarge
          rounded
          source={{uri: "https://www.headex.eu/assets/images/logo.png"}}
          activeOpacity={0.7}
        />*/}
                  </View>
                  <View style={styles.center}></View>
                  <View style={styles.bottom}>

                    <View style={styles.bottomItem}>

                  <TouchableOpacity onPress={() => navigate('Ordercurier', {name: 'Ordercurier'})}
                      noDefaultStyles={true}
                      style={styles.bottomItemIner}
                    >
                      <Image source={require('../components/img/local_shipping_1.png')}
                    style={{width:'50%',height:'50%'}} />
                    <Text style={styles.text}>
                      Siųsti siuntą
                    </Text>
                  </TouchableOpacity>

              </View>


                  </View>



      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center',
  //  justifyContent: 'center',
  },
  top:{
    flex: 1,
    height:'15%',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#fff',
  },
  profileimage:{
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 4,
    borderColor: '#fff',
    backgroundColor: '#eee',
  },
  profileName:{
    padding:5,
    fontSize: 20
  },
  center:{
      height:'1%',
      backgroundColor:'#007399',
  },
  bottom:{
    height:'84%',
    backgroundColor:'#fff',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding:5,
  },
  bottomCalendar:{
    height:'45%',
    backgroundColor:'#fff',
    padding:5,
  },
  bottomItem:{
    width: '33%',
    height: '20%',
    padding:5,

  },
  bottomItemIner:{
    flex:1,

      backgroundColor:'#fff',
      alignItems:'center',
      justifyContent:'center',
      borderWidth:2,
      borderRadius: 50,
      borderColor:'#00BFFF',
  },
  text:{
    color:'#00BFFF',
  fontSize: 20
  },
});
