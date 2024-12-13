import React from "react";
import { 
    Text, 
    View, 
    StyleSheet, 
    ImageBackground, 
    SafeAreaView, 
    ScrollView, 
    TouchableOpacity, 
    Switch, 
    Image
} from "react-native";
import FeatherIcon from 'react-native-vector-icons/Feather';

export const ContactScreen = () => {
    const [darkMode, setDarkMode] = React.useState(false);
    const [emailNotifications, setEmailNotifications] = React.useState(true);
    const [pushNotifications, setPushNotifications] = React.useState(false);

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <ImageBackground 
                source={require('../../asset/images/background-6.png')} 
                style={styles.background}
            >
                <ScrollView>
                    {/* Preferences Section */}
                    <View style={styles.cardSection}>
                        <Text style={styles.sectionTitle}>Cài đặt chung</Text>
                        <TouchableOpacity style={styles.row}>
                            <View style={[styles.rowIcon, { backgroundColor: '#fe9400' }]}>
                                <FeatherIcon name="music" size={20} color="#fff" />
                            </View>
                            <Text style={styles.rowLabel}>Âm thanh</Text>
                            <Text style={styles.rowValue}>English</Text>
                            <FeatherIcon name="chevron-right" size={20} color="#C6C6C6" />
                        </TouchableOpacity>
                        <View style={styles.row}>
                            <View style={[styles.rowIcon, { backgroundColor: '#007AFF' }]}>
                                <FeatherIcon name="moon" size={20} color="#fff" />
                            </View>
                            <Text style={styles.rowLabel}>Ứng dụng chạy nền</Text>
                            <Switch
                                value={darkMode}
                                onValueChange={setDarkMode}
                                thumbColor={darkMode ? '#007AFF' : '#f4f3f4'}
                                trackColor={{ false: '#767577', true: '#81b0ff' }}
                            />
                        </View>
                        <View style={styles.row}>
                            <View style={[styles.rowIcon, { backgroundColor: '#007AFF' }]}>
                                <FeatherIcon name="mic" size={20} color="#fff" />
                            </View>
                            <Text style={styles.rowLabel}>Nhắc lại thông báo</Text>
                            <Switch
                                value={darkMode}
                                onValueChange={setDarkMode}
                                thumbColor={darkMode ? '#007AFF' : '#f4f3f4'}
                                trackColor={{ false: '#767577', true: '#81b0ff' }}
                            />
                        </View>
                    </View>
                    {/* <View style={styles.cardSection}>
                        <Text style={styles.sectionTitle}>Notifications</Text>
                        <View style={styles.row}>
                            <View style={[styles.rowIcon, { backgroundColor: '#38C959' }]}>
                                <FeatherIcon name="at-sign" size={20} color="#fff" />
                            </View>
                            <Text style={styles.rowLabel}>Email Notifications</Text>
                            <Switch
                                value={emailNotifications}
                                onValueChange={setEmailNotifications}
                                thumbColor={emailNotifications ? '#38C959' : '#f4f3f4'}
                                trackColor={{ false: '#767577', true: '#81e1b5' }}
                            />
                        </View>
                        <View style={styles.row}>
                            <View style={[styles.rowIcon, { backgroundColor: '#38C959' }]}>
                                <FeatherIcon name="bell" size={20} color="#fff" />
                            </View>
                            <Text style={styles.rowLabel}>Push Notifications</Text>
                            <Switch
                                value={pushNotifications}
                                onValueChange={setPushNotifications}
                                thumbColor={pushNotifications ? '#38C959' : '#f4f3f4'}
                                trackColor={{ false: '#767577', true: '#81e1b5' }}
                            />
                        </View>
                    </View> */}
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        backgroundColor: '#f6f6f6',
    },
    background: {
        flex: 1,
    },
    cardSection: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        margin: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#555',
        marginBottom: 12,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eaeaea',
    },
    rowIcon: {
        width: 40,
        height: 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rowLabel: {
        flex: 1,
        marginLeft: 16,
        fontSize: 16,
        color: '#333',
    },
    rowValue: {
        fontSize: 16,
        color: '#888',
        marginRight: 8,
    },
});
