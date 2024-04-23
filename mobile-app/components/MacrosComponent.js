import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const MacroCircle = ({ macroName, consumed, goal }) => {
    const fillPercentage = (consumed / goal) * 100;

    return (
        <View style={styles.macroContainer}>
            <Text style={styles.macroName}>{macroName}</Text>
            <AnimatedCircularProgress
                size={100}
                width={10}
                backgroundWidth={5}
                fill={fillPercentage}
                tintColor="#00e0ff" // Use your own color
                backgroundColor="#3d5875" // Use your own color
                padding={10}
                renderChild={() => (
                    <Text style={styles.macroNumbers}>
                        {consumed} / {goal}g
                    </Text>
                )}
            />
            <Text style={styles.macroLeft}>{Math.round(goal - consumed)}g left</Text>
        </View>
    );
};

function MacrosComponent({ carbs, fats, protein, carbsGoal, fatsGoal, proteinGoal  }) {
    // Your macro goals can be passed as props or can be fetched/stored in state.

    return (
        <View style={styles.macrosContainer}>
            <MacroCircle macroName="Carbohydrates" consumed={carbs} goal={carbsGoal} />
            <MacroCircle macroName="Fat" consumed={fats} goal={fatsGoal} />
            <MacroCircle macroName="Protein" consumed={protein} goal={proteinGoal} />
        </View>
    );
}

const styles = StyleSheet.create({
    macrosContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        padding: 10,
    },
    macroContainer: {
        alignItems: 'center',
    },
    macroName: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    macroNumbers: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    macroLeft: {
        color: 'white',
        fontSize: 14,
        marginTop: 4,
    },
});

export default MacrosComponent;
