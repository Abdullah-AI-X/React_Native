
import React, { useState } from "react";

import {
    View,
    Text,
    Button,
    TextInput,
    Pressable,
    FlatList,
    Image,
    StyleSheet
} from "react-native";

import {
    launchCamera,
    launchImageLibrary
} from "react-native-image-picker";


export default function Task04() {

    const [name, SetName] = useState("");
    const [ImagePath, SetPath] = useState("");
    const [Users, SetUsers] = useState([]);
    const [SelectedId, SetSelectedId] = useState(null);


    // Open Gallery
    function openGallery() {

        launchImageLibrary(
            { mediaType: "photo" },
            (response) => {

                if (response.assets && response.assets.length > 0) {
                    SetPath(response.assets[0].uri);
                }

            }
        );
    }


    // Open Camera
    function openCamera() {

        launchCamera(
            { mediaType: "photo" },
            (response) => {

                if (response.assets && response.assets.length > 0) {
                    SetPath(response.assets[0].uri);
                }

            }
        );
    }


    // Add or Update User
    function Add() {

        if (name.trim() === "" || ImagePath === "") {
            return;
        }

        if (SelectedId !== null) {

            SetUsers(
                Users.map((item) =>
                    item.id === SelectedId
                        ? {
                            ...item,
                            Name: name,
                            ImagePath: ImagePath
                        }
                        : item
                )
            );

        } else {

            const newUser = {
                id: Date.now().toString(),
                Name: name,
                ImagePath: ImagePath
            };

            SetUsers([...Users, newUser]);
        }

        SetName("");
        SetPath("");
        SetSelectedId(null);
    }


    // Select User
    function SelectUser(item) {

        SetName(item.Name);
        SetPath(item.ImagePath);
        SetSelectedId(item.id);
    }


    // Delete User
    function DeleteUser(id) {

        SetUsers(Users.filter((item) => item.id !== id));

        if (SelectedId === id) {
            SetName("");
            SetPath("");
            SetSelectedId(null);
        }
    }


    // Display Cards
    function Render({ item }) {

        return (

            <Pressable
                style={[
                    styles.card,
                    SelectedId === item.id && styles.selectedCard
                ]}
                onPress={() => SelectUser(item)}
            >

                <Image
                    source={{ uri: item.ImagePath }}
                    style={styles.cardImage}
                />

                <View style={styles.cardDetails}>

                    <Text style={styles.cardName}>
                        {item.Name}
                    </Text>

                    <Text style={styles.cardSubtitle}>
                        Press to view details
                    </Text>

                </View>

                <Pressable
                    style={styles.deleteButton}
                    onPress={() => DeleteUser(item.id)}
                >

                    <Text style={styles.deleteText}>
                        Delete
                    </Text>

                </Pressable>

            </Pressable>
        );
    }


    return (

        <View style={styles.container}>

            {/* Header */}

            <View style={styles.header}>

                <Text style={styles.headerTitle}>
                    User Manager
                </Text>

                <Text style={styles.headerSubtitle}>
                    Manage your users easily
                </Text>

            </View>


            {/* Input Form */}

            <View style={styles.form}>

                <Text style={styles.label}>
                    Enter Name
                </Text>

                <TextInput
                    style={styles.input}
                    placeholder="Enter user name"
                    value={name}
                    onChangeText={SetName}
                />


                {/* Image Preview */}

                <View style={styles.imageBox}>

                    {ImagePath !== "" ? (

                        <Image
                            source={{ uri: ImagePath }}
                            style={styles.previewImage}
                        />

                    ) : (

                        <Text style={styles.placeholder}>
                            No Image Selected
                        </Text>

                    )}

                </View>


                {/* Camera and Gallery */}

                <View style={styles.buttonRow}>

                    <View style={styles.smallButton}>
                        <Button
                            title="Camera"
                            onPress={openCamera}
                        />
                    </View>

                    <View style={styles.smallButton}>
                        <Button
                            title="Gallery"
                            onPress={openGallery}
                        />
                    </View>

                </View>


                {/* Add / Update */}

                <View style={styles.mainButton}>

                    <Button
                        title={
                            SelectedId !== null
                                ? "Update User"
                                : "Add User"
                        }
                        onPress={Add}
                    />

                </View>


                {SelectedId !== null && (

                    <View style={styles.cancelButton}>

                        <Button
                            title="Cancel Editing"
                            onPress={() => {
                                SetName("");
                                SetPath("");
                                SetSelectedId(null);
                            }}
                        />

                    </View>

                )}

            </View>


            {/* User List */}

            <View style={styles.listHeader}>

                <Text style={styles.listTitle}>
                    All Users
                </Text>

                <Text style={styles.userCount}>
                    Total: {Users.length}
                </Text>

            </View>


            <FlatList
                data={Users}
                renderItem={Render}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>
                        No users added yet.
                    </Text>
                }
            />

        </View>
    );
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#F1F5F9",
    },

    header: {
        backgroundColor: "#1E3A8A",
        padding: 22,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },

    headerTitle: {
        color: "white",
        fontSize: 26,
        fontWeight: "bold",
    },

    headerSubtitle: {
        color: "#DBEAFE",
        fontSize: 14,
        marginTop: 5,
    },

    form: {
        backgroundColor: "white",
        margin: 15,
        padding: 15,
        borderRadius: 15,
        elevation: 3,
    },

    label: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#334155",
        marginBottom: 8,
    },

    input: {
        borderWidth: 1,
        borderColor: "#CBD5E1",
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        color: "#0F172A",
    },

    imageBox: {
        height: 130,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 12,
        marginBottom: 12,
        backgroundColor: "#F8FAFC",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#CBD5E1",
    },

    previewImage: {
        width: 120,
        height: 120,
        borderRadius: 10,
    },

    placeholder: {
        color: "#64748B",
        fontSize: 14,
    },

    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    smallButton: {
        width: "48%",
    },

    mainButton: {
        marginTop: 12,
    },

    cancelButton: {
        marginTop: 5,
    },

    listHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 18,
        marginBottom: 10,
    },

    listTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#1E293B",
    },

    userCount: {
        color: "#2563EB",
        fontWeight: "bold",
        fontSize: 14,
    },

    card: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        marginHorizontal: 15,
        marginBottom: 10,
        padding: 12,
        borderRadius: 12,
        elevation: 2,
        borderWidth: 1,
        borderColor: "#E2E8F0",
    },

    selectedCard: {
        borderColor: "#2563EB",
        borderWidth: 2,
    },

    cardImage: {
        width: 55,
        height: 55,
        borderRadius: 10,
    },

    cardDetails: {
        flex: 1,
        marginLeft: 12,
    },

    cardName: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#1E293B",
    },

    cardSubtitle: {
        fontSize: 12,
        color: "#64748B",
        marginTop: 4,
    },

    deleteButton: {
        backgroundColor: "#FEE2E2",
        padding: 9,
        borderRadius: 7,
    },

    deleteText: {
        color: "#DC2626",
        fontWeight: "bold",
        fontSize: 12,
    },

    emptyText: {
        textAlign: "center",
        color: "#64748B",
        marginTop: 25,
        fontSize: 15,
    },

});

