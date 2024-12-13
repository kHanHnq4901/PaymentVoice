import React, { useState, useEffect, useRef } from "react";
import { Text, View, StyleSheet, TouchableOpacity, FlatList, Animated, ImageBackground } from "react-native";
import { UpdateHook } from "./controller";
import { startListening, stopListening } from "../../component/notificationListener";
import { useNotifications } from "../../component/flatListNotification";
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import { useFocusEffect } from "@react-navigation/native";
import { getTotalMoneyByUserIdDate } from "./handle";

const backgroundImage = require('../../asset/images/background-5.png'); // Adjust the path to your image

export const HomeScreen = () => {
    UpdateHook();
    const { notifications, totalMoney,totalMoneyThisMonth,moneyComparisonLastMonth,moneyComparisonYesterday,fetchNotifications } = useNotifications();
    
    const [isListening, setIsListening] = useState(false);
    const [seconds, setSeconds] = useState(0);
    
    const scaleAnim = useRef(new Animated.Value(1)).current;
    useFocusEffect(
        React.useCallback(() => {
            fetchNotifications(); // Gọi lại fetchNotifications khi màn hình được hiện lên

            return () => {
                // Cleanup if necessary
            };
        }, [fetchNotifications])
    );

    useEffect(() => {
        let timer: string | number | NodeJS.Timeout | undefined;
        if (isListening) {
            timer = setInterval(() => {
                setSeconds(prev => prev + 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isListening]);

    const toggleListening = () => {
        if (isListening) {
            stopListening();
        } else {
            startListening();
        }
        setIsListening(!isListening);
        animateButton();
    };

    const animateButton = () => {
        Animated.sequence([
            Animated.timing(scaleAnim, {
                toValue: 0.9,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const formatTime = (sec: number) => {
        const minutes = Math.floor(sec / 60);
        const remainingSeconds = sec % 60;
        return `${minutes}m ${remainingSeconds}s`;
    };

    return (
        <ImageBackground source={backgroundImage} style={styles.background}>
            <View style={styles.container}>
                <View style={styles.timerContainer}>
                    <Text style={styles.timerText}>{formatTime(seconds)}</Text>
                </View>
                <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                    <TouchableOpacity style={styles.button} onPress={toggleListening}>
                        <Icon name={isListening ? "stop" : "play-arrow"} size={50} color="#fff" />
                        <Text style={styles.buttonText}>{isListening ? "Kết Thúc" : "Bắt Đầu"}</Text>
                    </TouchableOpacity>
                </Animated.View>

                {/* Earnings Cards */}
                <View style={styles.cardContainer}>
                    <LinearGradient colors={["#e0f7fa", "#b2ebf2"]} style={styles.card}>
                        <Icon name="attach-money" size={30} color="#00796b" />
                        <View style={styles.cardContent}>
                            <Text style={styles.cardTitle}>Tháng này</Text>
                            <Text style={styles.cardAmount}>{totalMoneyThisMonth}</Text>
                            <Text style={styles.cardIncrease}>{moneyComparisonLastMonth} tháng trước</Text>
                        </View>
                    </LinearGradient>
                    <LinearGradient colors={["#e8f5e9", "#c8e6c9"]} style={styles.card}>
                        <Icon name="today" size={30} color="#388e3c" />
                        <View style={styles.cardContent}>
                            <Text style={styles.cardTitle}>Hôm nay</Text>
                            <Text style={styles.cardAmount}> {totalMoney}</Text>
                            <Text style={styles.cardIncrease}>{moneyComparisonYesterday} hôm qua</Text>
                        </View>
                    </LinearGradient>
                </View>

                <Text style={styles.historyTitle}>Lịch sử hôm nay:</Text>
                <FlatList
                    data={notifications}
                    renderItem={({ item }) => (
                        <View style={styles.notificationItem}>
                            <Text style={styles.notificationText}>{item.Text}</Text>
                            <Text style={styles.notificationDate}>{item.Created}</Text>
                        </View>
                    )}
                    keyExtractor={item => item.ID.toString()}
                    style={styles.notificationList}
                    extraData={notifications} 
                />
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        borderRadius: 10,
    },
    timerContainer: {
        alignSelf: 'flex-start',
    },
    button: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: "#388e3c",
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 10,
        marginBottom: 20,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 5,
    },
    timerText: {
        fontSize: 20,
        marginBottom: 5,
        color: "#388e3c",
        fontWeight: "600",
    },
    cardContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginBottom: 10,
    },
    card: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
        marginHorizontal: 5,
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 4,
    },
    cardContent: {
        marginLeft: 10,
    },
    cardTitle: {
        fontSize: 14,
        color: "#333",
        fontWeight: "500",
    },
    cardAmount: {
        fontSize: 12,
        color: "#00796b",
        fontWeight: "700",
    },
    cardIncrease: {
        fontSize: 12,
        color: "#757575",
    },
    historyTitle: {
        fontSize: 12,
        fontWeight: "500",
        color: "#333",
        alignSelf: 'flex-start',
    },
    notificationList: {
        width: "100%",
    },
    notificationItem: {
        backgroundColor: "#ffffff",
        padding: 15,
        marginVertical: 5,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 3,
        borderWidth: 1,
        borderColor: "#ddd",
    },
    notificationText: {
        color: "#333",
        fontSize: 14,
        fontWeight: "500",
    },
    notificationDate: {
        color: "#888",
        fontSize: 12,
        marginTop: 5,
    },
    loadingText: {
        fontSize: 18,
        color: "#388e3c",
    },
    errorText: {
        fontSize: 18,
        color: 'red',
    },
});

export default HomeScreen;