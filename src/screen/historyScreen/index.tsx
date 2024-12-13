import React, { useState } from "react";
import { Text, View, StyleSheet, ImageBackground, FlatList, TouchableOpacity } from "react-native";
import { UpdateHook } from "./controller";
import { Picker } from "@react-native-picker/picker";
import Icon from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import LinearGradient from "react-native-linear-gradient";

export const HistoryScreen = () => {
    UpdateHook();
    const [monthlyEarnings, setMonthlyEarnings] = useState(5000000); // Example value for monthly earnings
    const [dailyEarnings, setDailyEarnings] = useState(300000); // Example value for daily earnings
    const [selectedTimeFrame, setSelectedTimeFrame] = useState("1 ngày");

    const bills = [
        { id: "1", description: "Chuyển tiền cho A", amount: "500,000 VNĐ" },
        { id: "2", description: "Chuyển tiền cho B", amount: "300,000 VNĐ" },
        { id: "3", description: "Chuyển tiền cho C", amount: "700,000 VNĐ" },
    ];

    const renderBillItem = ({ item }) => (
        <View style={styles.billItem}>
            <View style={styles.billLeft}>
                <FontAwesome name="money" size={24} color="#4CAF50" style={{ marginRight: 10 }} />
                <Text style={styles.billDescription}>{item.description}</Text>
            </View>
            <Text style={styles.billAmount}>{item.amount}</Text>
        </View>
    );

    return (
        <ImageBackground 
            source={require("../../asset/images/background-7.png")}
            style={styles.background}
        >
            <View style={styles.container}>
                <View style={styles.pickerContainer}>
                    <Icon name="calendar-today" size={24} color="#4CAF50" style={styles.pickerIcon} />
                    <View style={styles.customPickerContainer}>
                        <Picker
                            selectedValue={selectedTimeFrame}
                            style={styles.picker}
                            dropdownIconColor="#4CAF50"
                            onValueChange={(itemValue) => setSelectedTimeFrame(itemValue)}
                        >
                            <Picker.Item label="1 Ngày" value="1 ngày" />
                            <Picker.Item label="3 Ngày" value="3 ngày" />
                            <Picker.Item label="7 Ngày" value="7 ngày" />
                            <Picker.Item label="1 Tháng" value="1 tháng" />
                            <Picker.Item label="Toàn Bộ" value="toàn bộ" />
                        </Picker>
                    </View>

                    <TouchableOpacity style={styles.exportButton}>
                        <Icon name="file-download" size={12} color="#FFF" />
                    </TouchableOpacity>
                </View>

                <View style={styles.cardContainer}>
                        <LinearGradient colors={["#e0f7fa", "#b2ebf2"]} style={styles.card}>
                            <Icon name="attach-money" size={30} color="#00796b" />
                            <View style={styles.cardContent}>
                                <Text style={styles.cardTitle}>Tổng tiền</Text>
                                <Text style={styles.cardAmount}>{monthlyEarnings.toLocaleString()} VND</Text>
                                <Text style={styles.cardIncrease}>Tăng 10%</Text>
                            </View>
                        </LinearGradient>
                        <LinearGradient colors={["#e8f5e9", "#c8e6c9"]} style={styles.card}>
                            <Icon name="credit-card" size={30} color="#388e3c" />
                            <View style={styles.cardContent}>
                                <Text style={styles.cardTitle}>Số hoá đơn</Text>
                                <Text style={styles.cardAmount}>{dailyEarnings.toLocaleString()} VND</Text>
                                <Text style={styles.cardIncrease}>Tăng 10%</Text>
                            </View>
                        </LinearGradient>
                    </View>
                <FlatList
                    data={bills}
                    renderItem={renderBillItem}
                    keyExtractor={(item) => item.id}
                    style={styles.billList}
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
        padding: 20,
        backgroundColor: "#F3F4F6",
    },
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        width: "100%",
    },
    pickerContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
        justifyContent: "space-between",
        width: "100%",
        paddingHorizontal: 10,
    },
    pickerIcon: {
        marginRight: 10,
    },
    customPickerContainer: {
        flex: 1,
        backgroundColor: "#E8F5E9",
        borderRadius: 8,
        borderColor: "#4CAF50",
        borderWidth: 1,
        overflow: "hidden",
    },
    picker: {
        height: 50,
        color: "#4CAF50",
        paddingHorizontal: 10,
    },
    cardContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginBottom: 20,
        paddingHorizontal: 10,
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
    billList: {
        width: "100%",
        paddingHorizontal: 10,
    },
    billItem: {
        backgroundColor: "#FFFFFF",
        padding: 15,
        borderRadius: 8,
        marginVertical: 5,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    billLeft: {
        flexDirection: "row",
        alignItems: "center",
    },
    billDescription: {
        fontSize: 18,
        color: "#333",
    },
    billAmount: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#388E3C",
    },
    exportButton: {
        flexDirection: "row",
        backgroundColor: "#388E3C",
        borderRadius: 8,
        padding: 12,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 10,
    },
    exportText: {
        fontSize: 16,
        color: "#FFF",
        marginLeft: 10,
        fontWeight: "bold",
    },
});
