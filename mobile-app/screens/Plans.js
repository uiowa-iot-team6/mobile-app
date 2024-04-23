import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import axios from 'axios';
import { api } from '../config/Api';
import { useSession } from '../context/SessionContext';
import PopUpDialog from "../components/PopUpDialog";
import FoodItem from "../components/FoodItem";

function Plans(props) {
    const { user } = useSession();
    const [foods, setFoods] = useState([]);
    const [foodVisible, setFoodVisible] = useState(false)
    const [selectedFood, setSelectedFood] = useState(null)
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios
            .get(`http://${api}/food/get-by-username`, {
                params: { username: user.username },
            })
            .then((response) => {
                setFoods(response.data.food);
                console.log(response.data.food);
                setRefreshing(false); // Set refreshing to false when data is fetched
            })
            .catch((error) => {
                console.error('Error fetching food:', error);
                setRefreshing(false); // Set refreshing to false if an error occurs
            });
    };

    function selectFood(item) {
        console.log("SELECTING")
        setFoodVisible(true)
        setSelectedFood(item)
    }

    // Function to render each item in the FlatList
    const renderFoodItem = ({ item }) => (
        <TouchableOpacity style={styles.foodItemContainer} onPress={() => selectFood(item)}>
            <Text style={styles.foodDescription}>{item.description}</Text>
            <Text style={styles.servingInfo}>{item.servingsConsumed} servings</Text>
            <Text style={styles.dateInfo}>{formatDate(item.date)}</Text>
        </TouchableOpacity>
    );

    // Function to format the date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Food History</Text>

            <FlatList
                data={foods}
                renderItem={renderFoodItem}
                keyExtractor={(item) => item._id}
                style={styles.flatlist}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={() => {
                            setRefreshing(true); // Set refreshing to true when pull-to-refresh is triggered
                            fetchData();
                        }}
                    />
                }
            />
            <PopUpDialog visible={foodVisible}>
                <FoodItem food={selectedFood} onClose={() => setFoodVisible(false)} />
            </PopUpDialog>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    foodItemContainer: {
        backgroundColor: '#f0f0f0',
        padding: 15,
        marginBottom: 10,
        borderRadius: 10,
    },
    flatlist: {
        height: 200
    },
    foodDescription: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    servingInfo: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
    },
    dateInfo: {
        fontSize: 12,
        color: '#999',
    },
});

export default Plans;
