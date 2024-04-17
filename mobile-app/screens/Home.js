import React, { useState } from 'react';
import {ScrollView, StyleSheet, View, Image, TouchableOpacity, ScrollViewComponent} from 'react-native';
import { Button, Text, useTheme, Dialog, Portal } from 'react-native-paper';
// import { LinearGradient } from 'expo-linear-gradient';
import {width, height} from "../config/DeviceDimensions";
import { useSession } from '../context/SessionContext';
import logo from '../assets/name.png';
import BoxComponent from "../components/BoxComponent"; // Ensure the path to your logo is correct
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import PopUpDialog from "../components/PopUpDialog";
import ManualFoodEntry from "../components/ManualFoodEntry";

export default function Home({ navigation }) {
  const { user } = useSession();
  const [entryVisible, setEntryVisible] = useState(false)
  const date = new Date();
  if (!user) {
    return null;
  }

  console.log('user', user);
  const { colors } = useTheme();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{justifyContent: "space-between",flexDirection: "row", marginTop: 50}}>
          <Text style={{color: "#fff", fontWeight: "bold", marginLeft:-width*0.01, fontSize: 19 }}>Hi, {user.username}</Text>
          <TouchableOpacity style={{marginLeft:width*0.2, marginTop: 1}}>
              <SimpleLineIcons name="bell" size={30} color="white"/>
          </TouchableOpacity>
      </View>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.title}>{date.toDateString()}</Text>
    <ScrollView horizontal>
        <BoxComponent width={width*0.42} height={height*0.3}>
            <View style={{flexDirection: "row"}}>
                <SimpleLineIcons name="camera" size={40} color='#fb9c04' />
                <Text style={{margin: 10,fontSize:18, fontWeight: "bold", color: '#fff'}}>Scan food</Text>
            </View>
        </BoxComponent>
        <BoxComponent width={width*0.42} height={height*0.3} onPres={()=>setEntryVisible(true)}>
            <View style={{flexDirection: "row"}}>
                <SimpleLineIcons name="note" size={40} color='#fb9c04' />
                <Text style={{margin: 10,fontSize:18, fontWeight: "bold", color: '#fff'}}>Manual Entry</Text>
            </View>
        </BoxComponent>
    </ScrollView>


      <ScrollView horizontal>
          <BoxComponent width={width * 0.4} height={height * 0.5} >
              <Text style={{color:"#fff", fontWeight: "bold", fontSize: 18, marginTop: 10}}>Calories</Text>
          </BoxComponent>
          <BoxComponent width={width * 0.4} height={height * 0.5} >
              <Text style={{color:"#fff", fontWeight: "bold", fontSize: 18, marginTop: 10}}>Macros</Text>
          </BoxComponent>
          <BoxComponent width={width * 0.4} height={height * 0.5} >
              <Text style={{color:"#fff", fontWeight: "bold", fontSize: 18, marginTop: 10}}>Placeholder</Text>
          </BoxComponent>
        </ScrollView>
        <PopUpDialog visible={entryVisible} >
            <ManualFoodEntry onClose={()=>setEntryVisible(false)}/>
        </PopUpDialog>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#141723',
  },
  logo: {
    width: 200, // Adjust based on your logo's aspect ratio
    height: 100, // Adjust based on your logo's aspect ratio
    resizeMode: 'contain',
    marginBottom: 10,
      marginTop: -20

  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: -width * 0.22,
    color: "white"
  },
  button: {
    marginTop: 10,
    width: '80%',
    paddingVertical: 8,
  },
});
