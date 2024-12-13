import React from "react";
import { Text, View, StyleSheet, TextInput, TouchableOpacity, ImageBackground,Dimensions } from "react-native";
import { UpdateHook } from "./controller";
import { navigation } from "./controller";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const backgroundImage = require('../../asset/images/background-5.png'); // Đường dẫn đến hình ảnh
const { width } = Dimensions.get('window');
export const LoginScreen = () => {
    UpdateHook();

    const handleFacebookLogin = () => {
        console.log("Login with Facebook");
    };

    const handleGoogleLogin = () => {
        console.log("Login with Google");
    };

    const handleLogin = () => {
        navigation.replace('DrawerBottom', {
            screen: 'HomeStack',
            params: {
                screen: 'Home',
            },
        });
        console.log("Login pressed");
    };

    return (
        <ImageBackground source={backgroundImage} style={styles.container}>
            <View style={styles.overlay}>
                <Text style={styles.title}>Đăng Nhập</Text>
                <TextInput
                    style={[styles.input, { width: width * 0.8 }]} // Điều chỉnh chiều rộng
                    placeholder="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholderTextColor="#ccc"
                />
                <TextInput
                      style={[styles.input, { width: width * 0.8 }]} 
                    placeholder="Mật khẩu"
                    secureTextEntry
                    placeholderTextColor="#ccc"
                />
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={[styles.buttonText, { width: width * 0.4 }]}>Đăng Nhập</Text>
                </TouchableOpacity>
                <View style={styles.socialContainer}>
                    <TouchableOpacity style={styles.socialButton} onPress={handleFacebookLogin}>
                        <FontAwesome5 name="facebook" size={24} color="blue" />
                        <Text style={styles.socialText}>Facebook</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.socialButton} onPress={handleGoogleLogin}>
                        <FontAwesome5 name="google" size={24} color="red" />
                        <Text style={styles.socialText}>Google</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.footerText}>
                    Bạn chưa có tài khoản? <Text style={styles.link}>Đăng Ký</Text>
                </Text>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        resizeMode: "cover",
    },
    overlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",   
        borderRadius: 20,
        margin: 20,
        padding: 30,
    },
    title: {
        fontSize: 36,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#FFC107",
        textAlign: "center",
    },
    input: {
        width: "100%",
        height: 50,
        borderColor: "#FFC107",
        borderWidth: 0.5, // Reduced border width
        borderRadius: 25,
        paddingHorizontal: 15,
        marginBottom: 20,
        // Remove background color and adjust border opacity for outline effect
        // backgroundColor: "rgba(255, 255, 255, 0.9)",
        fontSize: 16,
    },
    socialButton: {
        flex: 1,
        backgroundColor: "#fff",
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 25,
        padding: 10,
        marginHorizontal: 5,
        elevation: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        width: "100%",
        height: 55, // Increased button height
        backgroundColor: "#388E3C",
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 }, // Add shadow effect
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
        textAlign :'center'
    },
    socialContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginBottom: 20,
    },

    socialText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
    footerText: {
        marginTop: 20,
        fontSize: 16,
        color: "black",
    },
    link: {
        color: "#FFC107",
        fontWeight: "bold",
    },
});

export default LoginScreen;