import React, {useEffect, useState} from 'react';
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
import CalorieProgressComponent from "../components/CalorieProgressComponent";
import MacrosComponent from "../components/MacrosComponent";
import ImagePickerComponent from "../components/ImagePickerComponent";
import axios from "axios";
import {api} from "../config/Api";

export default function Home({ navigation }) {
  const { user } = useSession();
  const [entryVisible, setEntryVisible] = useState(false)
  const [scanFoodVisible, setScanFoodVisible] = useState();
  const [dailyFood, setDailyFood] = useState([]);
    const [dailyCarbs, setDailyCarbs] = useState(0)
    const [dailyFats, setDailyFats] = useState(0);
    const [dailyProtein, setDailyProtein] = useState(0);
    const [dailyCalories, setDailyCalories] = useState(0);
    const date = new Date();
  if (!user) {
    return null;
  }
  //calculate calories in array
    function calculateCalories(food){
        let totalCalories = 0;
        let protein = 0;
        let carbs = 0;
        let fats = 0;
        food.forEach(f => {
            f.foodNutrients.forEach( nutrient =>{
                if(nutrient.nutrientName==="Energy")
                {
                    totalCalories+=nutrient.value
                }
                if(nutrient.nutrientName==="Protein")
                {
                    protein+=nutrient.value
                }
                if(nutrient.nutrientName==="Carbohydrates")
                {
                    carbs+=nutrient.value
                }
                if(nutrient.nutrientName==="Total lipid (fat)")
                {
                    fats+=nutrient.value
                }
            })
        })
        setDailyCalories(totalCalories)
        setDailyFats(fats)
        setDailyCarbs(carbs)
        setDailyProtein(protein)
        console.log("calories",totalCalories,protein,carbs,fats)
    }
    useEffect(() => {
        console.log("here")
        axios.get(`http://${api}/food/get-by-username-today`, {params: {username: user.username}})
            .then(r => {
                if (r.data && r.data.food) {
                    setDailyFood(r.data.food);
                    calculateCalories(r.data.food);
                } else {
                    console.log("Food data is missing in the response:", r.data);
                }
            })
            .catch(e => {
                console.log("Error fetching food data:", e);
            });
    }, [entryVisible]);


  console.log('user', user);

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
        <BoxComponent width={width*0.42} height={height*0.3 } onPres={()=>setScanFoodVisible(true)}>
            <View style={{flexDirection: "row"}}>
                <SimpleLineIcons name="camera" size={40} color='#fb9c04' />
                <Text style={{margin: 10,fontSize:18, fontWeight: "bold", color: '#fff'}}>
                    <Portal>
                        {/* Render the ImagePickerComponent in a portal */}
                        <Dialog visible={scanFoodVisible} onDismiss={() => setScanFoodVisible(false)}>
                            <ImagePickerComponent username={user.username}/>
                        </Dialog>
                    </Portal>
                    Scan Food
                </Text>
            </View>
        </BoxComponent>
        <BoxComponent width={width*0.42} height={height*0.3} onPres={()=>setEntryVisible(true)}>
            <View style={{flexDirection: "row"}}>
                <SimpleLineIcons name="note" size={40} color='#fb9c04' />
                <Text style={{margin: 10,fontSize:18, fontWeight: "bold", color: '#fff'}}>Manual Entry</Text>
            </View>
        </BoxComponent>
    </ScrollView>


      <ScrollView horizontal style={{marginTop: -50}}>
          <BoxComponent width={width * 0.4} height={height * 0.7} >
              <Text style={{color:"#fff", fontWeight: "bold", fontSize: 18, marginBottom: 5}}>Calories</Text>
              <CalorieProgressComponent
                  totalCalories={2280}
                  foodCalories={dailyCalories}
                  exerciseCalories={0}
                  width={height}
                  height={height}
              />
          </BoxComponent>
          <BoxComponent width={width * 0.45} height={height * 0.7} >
              <Text style={{color:"#fff", fontWeight: "bold", fontSize: 18, marginTop: 10}}>Macros</Text>
              <MacrosComponent carbs={dailyCarbs} fats={dailyFats} protein={dailyProtein} />
          </BoxComponent>
          <BoxComponent width={width * 0.45} height={height * 0.7} >
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
