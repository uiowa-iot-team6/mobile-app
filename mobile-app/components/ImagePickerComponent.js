import React, { useState } from "react";
import {
    StyleSheet,
    Image,
    View,
    Platform,
    TouchableOpacity,
    Text,
    Modal, TouchableOpacityComponent,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
    Button,
    Provider as PaperProvider,
    DefaultTheme,
} from "react-native-paper";
import axios from "axios";
import { api } from "../config/Api";

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: "purple",
        accent: "black",
    },
};

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function ImagePickerComponent({ setImageSet, setPhoto,parse,save }) {
    const [image, setImage] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const getCameraPermission = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== "granted") {
            alert("Sorry, we need camera roll permissions to make this work!");
            return false;
        }
        return true;
    };

    const pickImage = async () => {
        const hasPermission = await getCameraPermission();
        if (!hasPermission) {
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
        });

        if (!result.cancelled) {
            setImage(result.assets[0].uri);
            setPhoto({ uri: result.assets[0].uri });
            setImageSet(true);
        }
    };

    const takePhoto = async () => {
        const hasPermission = await getCameraPermission();
        if (!hasPermission) {
            return;
        }
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
        });

        if (!result.cancelled) {
            setImage(result.assets[0].uri);
            setPhoto({ uri: result.assets[0].uri });
            setImageSet(true);
        } else {
            console.log("cancelled");
        }
    };

    const submitImage = async () => {
        // Create a new FormData object
        let formData = new FormData();

        // Add the image to the form data
        let name = image.split("/");
        name = name[name.length - 1];
        formData.append("image", {
            uri: image,
            name: name,
            type: "image/jpeg",
        });

        // Send the image to your Node.js server
        axios
            .post("http://" + api + `/notes/read-note`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                console.log("DONE");
                parse(response.data);
            })
            .catch((error) => {
                console.log("Error: ", error);
            });

        setModalVisible(false);
    };
    if(modalVisible) {
        return (
            <PaperProvider theme={theme}>
                <View
                    style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "white",
                    }}
                >
                    <TouchableOpacity
                        onPress={() => setModalVisible(true)}
                        style={{position: "absolute", left: 10, top: 10}}
                    >
                        <Ionicons name="add-circle" size={32} color="black"/>
                    </TouchableOpacity>

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            setModalVisible(!modalVisible);
                        }}
                    >
                        <View
                            style={{
                                flex: 1,
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: "white",
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => setModalVisible(false)}
                                style={{position: "absolute", right: 10, top: 50}}
                            >
                                <Ionicons name="close-circle" size={32} color="black"/>
                            </TouchableOpacity>

                            <Button mode="contained" style={styles.button} onPress={takePhoto}>
                                Take a photo
                            </Button>
                            <Button mode="contained" style={styles.button} onPress={pickImage}>
                                Pick an image
                            </Button>
                            {image && <Image source={{uri: image}} style={styles.image}/>}
                            <Button
                                mode="contained"
                                style={styles.button}
                                onPress={submitImage}
                            >
                                Submit
                            </Button>
                        </View>
                    </Modal>
                </View>
            </PaperProvider>
        );
    }
    else{
        return (
            <View style={styles.row}>
                <TouchableOpacity title="Choose Profile Picture" onPress={()=>setModalVisible(true)}>
                    <Text style={{color:'#0f53e3', fontSize: 15}}>
                        Choose Profile Picture
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        // alignItems: "center",
        // justifyContent: "center",
    },
    button: {
        backgroundColor: "purple",
        marginTop: 10,
        color: "white",
        width: 150,
        height: 40,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    save:{
        backgroundColor: "#c5a7a7",
        marginTop: 15,
        marginLeft: 45
    },
    image: {
        width: windowWidth * 0.9,
        height: windowHeight * 0.3,
        margin: 20,
        borderRadius: 10,
        borderWidth: 1,
    },
    row: {
        flexDirection: "row"
    }
});
