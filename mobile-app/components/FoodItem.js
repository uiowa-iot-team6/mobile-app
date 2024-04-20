import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

const FoodItem = ({ food, onClose }) => {
    const {
        description,
        servingsConsumed,
        foodNutrients,
    } = food;

    // Calculate total calories
    const totalCalories = foodNutrients.reduce((total, nutrient) => {
        if (nutrient.nutrientName === 'Energy') {
            return total + nutrient.value;
        }
        return total;
    }, 0);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{description}</Text>
            <Text>Servings: {servingsConsumed}</Text>
            <Text>Total Calories: {totalCalories} kcal</Text>
            <Text style={styles.nutrientTitle}>Nutrient Information:</Text>
            <View>
                {foodNutrients.map((nutrient, index) => (
                    <View key={index}>
                        <Text>{nutrient.nutrientName}: {nutrient.value} {nutrient.unitName}</Text>
                    </View>
                ))}
            </View>
            <Button title="Close" onPress={onClose} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f0f0f0',
        padding: 15,
        marginBottom: 10,
        borderRadius: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    nutrientTitle: {
        marginTop: 10,
        fontWeight: 'bold',
    },
});

export default FoodItem;
