import React, {useEffect, useState} from 'react';
import { View, Text,StyleSheet } from 'react-native';
import axios from "axios";
import {api} from "../config/Api";
import {useSession} from "../context/SessionContext";
function Plans(props) {
    const {user} = useSession()
    const [food, setFood] = useState([]);
    useEffect(() => {
        axios.get(`http://${api}/api/food/get-by-username`,
            {params: {username: user.username}})
            .then(response => {
                setFood(response.data.food)
            })
            .catch(error => {
                console.error('Error fetching food:', error);
            });
    }, [food]);

    return (
        <View style={styles.container}>
            <Text>This is the history</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

});

export default Plans;
