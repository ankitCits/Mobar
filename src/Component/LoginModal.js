import React, { Component } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { screenHeight } from "../Theme/Matrices";
import { ThemeColors } from "../Theme/ThemeColors";

class LoginModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalVisible: this.props.loginModal,
        }
    }

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }

    render() {
        const { modalVisible } = this.state;
        return (
            <>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    style={{ height: screenHeight(50) }}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        this.setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>You are not logged in, Kindly Login to perform action</Text>
                            <Pressable
                                style={[styles.button, styles.buttonLogin]}
                                onPress={() => this.props.handleRedirect()}
                            >
                                <Text style={styles.textStyle}>Go to Login</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => this.setModalVisible(!modalVisible)}
                            >
                                <Text style={styles.textStyle}>Skip</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            </>
        );
    }
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        backgroundColor: ThemeColors.CLR_DARK_GREY,
        height: screenHeight(40),
        width: screenHeight(50),
        margin: 20,
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonLogin: {
        backgroundColor: ThemeColors.CLR_THEME_COLOR,
    },
    buttonClose: {
        marginTop: 20,
        // backgroundColor: "transparent",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        fontSize: 22,
        textAlign: "center",
        color: "white",
    }
});

export default LoginModal;