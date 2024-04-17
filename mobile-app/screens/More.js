import React, {useState} from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import {TouchableOpacity} from "react-native-gesture-handler";
import PopUpDialog from "../components/PopUpDialog";
import GoalsContent from "../components/GoalsContent";
import RMRCalculator from "../components/RMRCalculator";
import ChangePassword from "../components/ChangePassword";
import Profile from "../components/Profile";

const More = () => {
    const [goalsVisible, setGoalsVisible] = useState(false)
    const [rmrVisible, setRmrVisible] = useState(false)
    const [changePwdVisible, setChangePwdVisible] = useState(false)
    const [profileVisible, setProfileVisible] = useState(false)
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>General</Text>
                <TouchableOpacity style={styles.item} onPress={()=>setGoalsVisible(true)}>
                    <SimpleLineIcons name="check" size={25} />
                    <Text style={styles.text}>Goals</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.item} onPress={()=>setRmrVisible(true)}>
                    <SimpleLineIcons name="star" size={25} />
                    <Text style={styles.text}>Resting Metabolic Rate</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.item} >
                    <SimpleLineIcons name="link" size={25} />
                    <Text style={styles.text}>Connect to tracker</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Account</Text>
                <TouchableOpacity style={styles.item} onPress={()=>setProfileVisible(true)}>
                    <SimpleLineIcons name="user" size={25} />
                    <Text style={styles.text}>Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.item} onPress={()=>setChangePwdVisible(true)}>
                    <SimpleLineIcons name="settings" size={25} />
                    <Text style={styles.text}>Change Password</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.item}>
                    <SimpleLineIcons name="logout" size={25} />
                    <Text style={styles.text}>Logout</Text>
                </TouchableOpacity>
                {/* Add more items as needed */}
            </View>
            {/* Add more sections as needed */}
            <PopUpDialog visible={goalsVisible}>
                <GoalsContent onClose={()=>setGoalsVisible(false)}/>
            </PopUpDialog>
            <PopUpDialog visible={rmrVisible}>
                <RMRCalculator onClose={()=>setRmrVisible(false)}/>
            </PopUpDialog>
            <PopUpDialog visible={changePwdVisible}>
                <ChangePassword onClose={()=>setChangePwdVisible(false)}/>
            </PopUpDialog>
            <PopUpDialog visible={profileVisible}>
                <Profile onClose={()=>setProfileVisible(false)}/>
            </PopUpDialog>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    section: {
        marginBottom: 20,
    },
    text:{
        marginLeft: 10
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10, // Add horizontal padding
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },

    icon: {
        marginRight: 10,
    },
});

export default More;
