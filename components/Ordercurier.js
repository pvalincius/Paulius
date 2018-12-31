import React, { Component } from 'react';
import { StyleSheet, Text, View, Picker, TouchableOpacity, ScrollView } from 'react-native';
import { TextInput } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import {  Button } from 'react-native-elements';
import CheckBox from 'react-native-check-box'
//import Hyperlink from 'react-native-hyperlink'

var radio_props1 = [
  {label: 'Apmoka siuntėjas', value: 1 },
  {label: 'Apmoka gavėjas', value: 2 }
];
var radio_props2 = [
  {label: 'Bankiniu pavedimu', value: 1},
  {label: 'Grynais arba kortele siuntos paėmimo metu', value: 2 }
];


export default class Ordercurier extends Component {

  constructor(props) {
      super(props);
      this.inputRefs = {};
      this.state = {
        siuntejo_vp:'',
        siuntejo_email:'',
        siuntejo_phone:'',
        siuntejo_paemimas:'',

        gavejo_vp:'',
        gavejo_email:'',
        gavejo_phone:'',
        gavejo_pristatymas:'',
        gavejo_note:'',

        kasmoka:'',
        apmokejimo_tipas:'',

        isChecked:true,

        sendTo: undefined,
        items: [
              {
                label: 'Iš Lietuvos į Daniją (žemynas)',
                value: 'Iš Lietuvos į Daniją (žemynas)',
            },
            {
                label: 'Iš Lietuvos į Daniją (Kopenhaga)',
                value: 'Iš Lietuvos į Daniją (Kopenhaga)',
            },
            {
                label: 'Iš Daniją (žemynas) į Lietuvą',
                value: 'Iš Daniją (žemynas) į Lietuvą',
            },
            {
                label: 'Iš Daniją (Kopenhaga) į Lietuvą',
                value: 'Iš Daniją (Kopenhaga) į Lietuvą',
            },
            {
                label: 'Iš Lietuvos į Švediją',
                value: 'Iš Lietuvos į Švediją',
            },
            {
                label: 'Iš Švedijos į Lietuvą',
                value: 'Iš Švedijos į Lietuvą',
            },
            {
                label: 'Iš Lietuvos į Lietuvą',
                value: 'Iš Lietuvos į Lietuvą',
            },
        ],
        weight: undefined,
        items2: [
            {
                label: 'Iki 10 kg.',
                value: 'Iki 10 kg.',
            },
            {
                label: 'Tarp 11 - 20 kg.',
                value: 'Tarp 11 - 20 kg.',
            },
            {
                label: 'Tarp 20 - 50 kg.',
                value: 'Tarp 20 - 50 kg.',
            },
            {
                label: 'Virš 50 kg.',
                value: 'Virš 50 kg.',
            },
        ],
      };
    }

  static navigationOptions = {
    title: 'Ordercurier',
    headerTitleStyle:{
  fontWeight:'500',
  fontSize:24,
  marginTop:25,
  alignSelf:'center'
},
  };

  test = async()=>{
    alert("test");
  }

  SendOrder = async() =>{
    //alert("press");
    if(this.state.isChecked===true){
        fetch('http://testdrive.kodupasaulis.lt/emails/sendrequest',{
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sendTo:this.state.sendTo,
            weight:this.state.weight,
            siuntejo_vp:this.state.siuntejo_vp,
            siuntejo_email:this.state.siuntejo_email,
            siuntejo_phone:this.state.siuntejo_phone,
            siuntejo_paemimas: this.state.siuntejo_paemimas,
            gavejo_vp:this.state.gavejo_vp,
            gavejo_email:this.state.gavejo_email,
            gavejo_phone:this.state.gavejo_phone,
            gavejo_pristatymas:this.state.gavejo_pristatymas,
            gavejo_note:this.state.gavejo_note,
            kasmoka:this.state.kasmoka,
            apmokejimo_tipas:this.state.apmokejimo_tipas,

            })
        })
        .then((response) => response.json())
        .then((res) => {
          if(res.success === true){
            alert(res.message);
            this.setState({sendTo: undefined});
            this.setState({weight: undefined});
            this.setState({siuntejo_vp: ''});
            this.setState({siuntejo_email: ''});
            this.setState({siuntejo_phone: ''});
            this.setState({siuntejo_paemimas: ''});
            this.setState({gavejo_vp: ''});
            this.setState({gavejo_email: ''});
            this.setState({gavejo_phone: ''});
            this.setState({gavejo_pristatymas: ''});
            this.setState({gavejo_note: ''});
            this.setState({kasmoka: -1});
            this.setState({apmokejimo_tipas: -1});
         }else{
           alert(res.message);
          }
        })
        .done();
      }else{
         alert("Pažymėkite, jog sutinkate su taisyklėmis");
      }
      }


  render() {
    const directions = ["Iš Lietuvos į Daniją (žemynas)", "Iš Lietuvos į Daniją (Kopenhaga)", "Iš Daniją (žemynas) į Lietuvą", "Iš Daniją (Kopenhaga) į Lietuvą", "Iš Lietuvos į Lietuvą" ];
    const weight = ["Iki 10 kg.", "Tarp 11 - 20 kg.", "Tarp 20 - 50 kg.", "Virš 50 kg."];


    return (
      <ScrollView contentContainerStyle={styles.contentContainer}>
      <View style={styles.container}>
        <Text style={styles.header}>
          Siuntos informacija
        </Text>
      <View style={styles.block_view}>
        <Text style={styles.block_headers}>
        Siuntėjo infromacija
        </Text>
        <View>
        <RNPickerSelect
            placeholder={{
                  label: 'Pasirinkite kur siunčiate',
                    value: null,
                  color: '#9EA0A4',
                  }}
                    items={this.state.items}
                    onValueChange={(value) => {
                        this.setState({
                            sendTo: value,
                        });
                    }}
                    onUpArrow={() => {
                        this.inputRefs.picker.togglePicker();
                    }}
                    onDownArrow={() => {
                        this.inputRefs.company.focus();
                    }}
                    style={{ ...pickerSelectStyles }}
                    value={this.state.sendTo}
                    ref={(el) => {
                        this.inputRefs.picker1 = el;
                    }}
                    useNativeAndroidPickerStyle={false}
                />
              </View>
              <View>
          <RNPickerSelect
              placeholder={{
                                label: 'Apytikris siuntos svoris',
                                value: null,
                                color: '#9EA0A4',
                            }}
                            items={this.state.items2}
                            onValueChange={(value) => {
                                this.setState({
                                    weight: value,
                                });
                            }}
                            onUpArrow={() => {
                                this.inputRefs.picker.togglePicker();
                            }}
                            onDownArrow={() => {
                                this.inputRefs.company.focus();
                            }}
                            style={{ ...pickerSelectStyles }}
                            value={this.state.weight}
                            ref={(el) => {
                                this.inputRefs.picker2 = el;
                            }}
                            useNativeAndroidPickerStyle={false}
              />
            </View>
            <View>
        <TextInput
          label='Siuntėjo vardas ir pavardė'
          style={styles.inputfields}
          placeholder="Įveskite savo vardą,"
          onChangeText={(siuntejo_vp) => this.setState({siuntejo_vp})}
        />
      </View>
      <View>
        <TextInput
          label='El. paštas'
          style={styles.inputfields}
          placeholder="Įveskite savo el. pašto adresą."
          onChangeText={(siuntejo_email) => this.setState({siuntejo_email})}
        />
      </View>
      <View>
        <TextInput
          label='Telefonas'
          style={styles.inputfields}
          placeholder="Įveskite savo telefono numerį"
          onChangeText={(siuntejo_phone) => this.setState({siuntejo_phone})}
        />
      </View>
      <View>
        <TextInput
          label='Siuntos paėmimo adresas'
          style={styles.inputfields}
          placeholder="Įveskite tikslų adresą, iš kur paimti siuntą. GATVĖ, NR. MIESTAS, PAŠTO KODAS"
          onChangeText={(siuntejo_paemimas) => this.setState({siuntejo_paemimas})}
        />
      </View>
      </View>
      <View style={styles.block_view}>
        <Text style={styles.block_headers}>
        Gavėjo infromacija
        </Text>
        <View>
          <TextInput
            label='Gavėjo vardas ir pavardė'
            style={styles.inputfields}
            placeholder="Įveskite gavėjo vardą."
            onChangeText={(gavejo_vp) => this.setState({gavejo_vp})}
          />
        </View>
        <View>
          <TextInput
            label='El. paštas'
            style={styles.inputfields}
            placeholder="Įveskite gavėjo el. pašto adresą."
            onChangeText={(gavejo_email) => this.setState({gavejo_email})}
          />
        </View>
        <View>
          <TextInput
            label='Telefonas'
            style={styles.inputfields}
            placeholder="Įveskite gavėjo telefono numerį"
            onChangeText={(gavejo_phone) => this.setState({gavejo_phone})}
          />
        </View>
        <View>
          <TextInput
            label='Siuntos pristatymo adresas'
            style={styles.inputfields}
            placeholder="Įveskite tikslų adresą, kur pristatyti siuntą. GATVĖ, NR. MIESTAS, PAŠTO KODAS"
            onChangeText={(gavejo_pristatymas) => this.setState({gavejo_pristatymas})}
          />
        </View>
        <View>
          <TextInput
            label='Žinutė'
            style={styles.inputfields}
            placeholder="Jai reikia palikite mums pastabą ar komentarą. PVZ. dūžtanti siunta"
            onChangeText={(gavejo_note) => this.setState({gavejo_note})}
          />
        </View>
      </View>
      <View style={styles.block_view}>
        <Text style={styles.block_headers}>
        Kas apmoka už siuntą
        </Text>
        <RadioForm
         radio_props={radio_props1}
         initial={-1}
         onPress={(kasmoka) => {this.setState({kasmoka:kasmoka})}}
       />
      </View>
      <View style={styles.block_view}>
        <Text style={styles.block_headers}>
        Kokiu būdu apmokėsite
        </Text>
        <RadioForm
         radio_props={radio_props2}
         initial={-1}
         onPress={(apmokejimo_tipas) => {this.setState({apmokejimo_tipas:apmokejimo_tipas})}}
        />
      </View>
      <View style={styles.block_view}>
        <CheckBox
          style={{flex: 1, padding: 10}}
        rightText={'Patvirtinu, kad esu susipažinęs ir įsipareigoju laikytis siuntų gabenimo taisyklių. Sąlygos ir taisyklės čia: http://siuntupilotai.lt/siuntu-salygos-ir-taisykles/'}
        checkedIcon='dot-circle-o'
         uncheckedIcon='circle-o'
        isChecked={this.state.isChecked}
        onClick={()=>{
          this.setState({
              isChecked:!this.state.isChecked
          })
        }}
      />
      </View>
      <View style={styles.block_view}>
        <TouchableOpacity onPress={()=>this.SendOrder()}
            noDefaultStyles={true}
            style={styles.submit}
          >
          <Text style={styles.text}>
            Užsakyti siuntą
          </Text>
        </TouchableOpacity>
      </View>
      </View>
      </ScrollView>
    );
  }
}





const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 20
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header:{
    padding:5,
    fontSize: 30,
    textAlign: 'center',
  },
  block_view:{
    padding:10
  },
  block_headers:{
    padding:10,
        fontSize: 20
  },
  inputfields:{
    height: 50,
    //color:'#00BFFF',
    backgroundColor:"#fff",
  },
  submit:{
    borderWidth: 4,
    borderColor: '#00BFFF',
    backgroundColor: '#00BFFF',
    padding:5,
  },
  top:{
    height:'10%',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#00BFFF',
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
    height:'89%',
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
    width: '50%',
    height: '10%',
    padding:5,
  },
  bottomItemIner:{
    flex:1,
      backgroundColor:'#00BFFF',
      alignItems:'center',
      justifyContent:'center',
      borderRadius: 75,
  },
  text:{
  fontSize: 20
  },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingTop: 13,
        paddingHorizontal: 10,
        paddingBottom: 12,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        backgroundColor: 'white',
        color: 'black',
    },
    inputAndroid: {
        fontSize: 16,
        paddingTop: 13,
        paddingHorizontal: 10,
        paddingBottom: 12,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        backgroundColor: 'white',
        color: 'black',
    },
});
