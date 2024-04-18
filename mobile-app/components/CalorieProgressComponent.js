import React, {useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

export default function CalorieProgressComponent({ totalCalories, foodCalories, exerciseCalories,width,height }) {
    const [remainingCalories,setRemainingCalories] = useState(totalCalories - foodCalories + exerciseCalories);

    const [fill, setFill] = useState(((totalCalories - remainingCalories) / totalCalories) * 100);
    const styles = StyleSheet.create({
        container: {
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            width: width*.6,
            height: height*.7,
            margin: 20,
            backgroundColor: '#252833',
            elevation: 40,
            borderWidth: 2,
        },
        calorieText: {
            fontSize: 18,
            fontWeight: 'bold',
            color: 'white',
        },
        calorieDetails: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: '100%',
            marginTop: 10,
        },
        calorieLabel: {
            color: 'white',
            fontSize: 14,
        },
    });
    return (
        <View style={{ alignItems: 'center' }}>
            <AnimatedCircularProgress
                size={175}
                width={15}
                fill={fill}
                tintColor="#00e0ff"
                backgroundColor="#3d5875"
            >
                {
                    () => (
                        <Text style={styles.calorieText}>{remainingCalories} Remaining</Text>
                    )
                }
            </AnimatedCircularProgress>
            <View style={styles.calorieDetails}>
                <Text style={styles.calorieLabel}>Base Goal {totalCalories}</Text>
                <Text style={styles.calorieLabel}>Food {foodCalories}</Text>
            </View>
        </View>
    );

}
