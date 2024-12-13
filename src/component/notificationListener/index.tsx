import { Alert, AppRegistry } from 'react-native';
import RNAndroidNotificationListener, { RNAndroidNotificationListenerHeadlessJsName } from 'react-native-android-notification-listener';
import axios from 'axios';
import Tts from 'react-native-tts';
// Assume useNotifications is defined and imported here
import { useNotifications } from '../flatListNotification';

type Notification = {
    time: string;
    app: string;
    title: string;
    titleBig: string;
    text: string;
    subText: string;
    summaryText: string;
    bigText: string;
    audioContentsURI: string;
    imageBackgroundURI: string;
    extraInfoText: string;
    groupedMessages: Array<{
        title: string;
        text: string;
    }>;
    icon: string;
    image: string;
};

// Kiểm tra quyền thông báo
const checkNotificationPermission = async () => {
    const status = await RNAndroidNotificationListener.getPermissionStatus();
    console.log(status);
    if (status !== 'authorized') {
        await RNAndroidNotificationListener.requestPermission();
    }
};

// Gửi thông báo đến URL
const sendNotificationData = async (parsedNotification: Notification, updateNotifications: (() => void) | undefined) => {
    try {
        const money = extractMoneyFromText(parsedNotification.text);
        const balance = extractBalanceFromText(parsedNotification.text);
        const accountSend = extractAccountFromText(parsedNotification.text);
        const content = extractContentFromText(parsedNotification.text);

        if (money !== null) {
            console.log('Số tiền:', money);
            const data = {
                UserID: 3,
                NameApp: parsedNotification.app,
                Title: parsedNotification.title,
                Text: parsedNotification.text,
                Money: money,
                Balance: balance,
                AccountSend: accountSend,
                Content: content,
            };
            console.log('Dữ liệu gửi:', data);

            const response = await axios.post('https://tingbox.megahai.com/save_notification.php', data);
            console.log("Dữ liệu thông báo đã được gửi thành công:", response.data);

            if (response.data.status === "success") {
                console.log('Gửi thành công');
                Tts.speak(`Nhận ${money} từ tài khoản ${accountSend}`, {
                    iosVoiceId: 'default',
                    rate: 1.0, 
                    androidParams: {
                        KEY_PARAM_PAN: -1,
                        KEY_PARAM_VOLUME: 0.5,
                        KEY_PARAM_STREAM: 'STREAM_MUSIC',
                    },
                });

                if (updateNotifications) {
                    updateNotifications(); // Gọi hàm để cập nhật notifications
                }
            } else {
                console.error('Lỗi:', response.data.message); // Hiển thị thông báo lỗi từ API
            }
        } else {
            console.log("Không tìm thấy số tiền trong thông báo, không gửi dữ liệu.");
        }
    } catch (error) {
        console.error("Không thể gửi dữ liệu thông báo:", error);
    }
};

const extractMoneyFromText = (text: string): number | null => {
    const regex = /\+(\s*\d+(?:,\d{3})*(?:\.\d{1,2})?)\s*VND/;
    const match = text.match(regex);
    if (match) {
        const moneyString = match[1].replace(/,/g, '');
        return parseFloat(moneyString);
    }
    return null; // Return null if not found
};

const extractBalanceFromText = (text: string): number | null => {
    const regex = /(?:Số dư:\s*|Số dư\s*|So du\s*|SD:\s*)(\d{1,3}(?:,\d{3})*(?:\.\d{1,2})?)/i;
    const match = text.match(regex);
    if (match) {
        const balanceString = match[1].replace(/,/g, '');
        return parseFloat(balanceString);
    }
    return null;
};

const extractAccountFromText = (text: string): string | null => {
    const regex = /(?:Tài khoản:\s*|TK:\s*|TK\s*)(\S+)/;
    const match = text.match(regex);
    return match ? match[1] : null; // Return account or null
};

const extractContentFromText = (text: string): string | null => {
    const regex = /ND:\s*(.*)/;
    const match = text.match(regex);
    return match ? match[1].trim() : null; // Return content or null
};

let isListening = false;
// Xử lý thông báo khi nhận được
const headlessNotificationListener = async ({ notification, updateNotifications }: { notification: string; updateNotifications: () => void }) => {
    try {
        if (isListening) {
        const parsedNotification: Notification = JSON.parse(notification);
        console.log("Received notification:", parsedNotification);
        await sendNotificationData(parsedNotification, updateNotifications);
        }else {
            console.log('Đang ko bắt đầu')
        }
    } catch (error) {
        console.error("Failed to parse notification:", error);
    }
};

// Hàm hủy bỏ tác vụ không giao diện
const headlessTaskCanceller = () => {
    console.log("Headless task cancelled");
};

// Bắt đầu lắng nghe thông báo
export const startListening = async () => {
    try {
        await checkNotificationPermission();

        // Only register the headless task if not already listening
        if (!isListening) {
            // Đăng ký tác vụ không giao diện
            AppRegistry.registerHeadlessTask(
                RNAndroidNotificationListenerHeadlessJsName,
                () => headlessNotificationListener,
            );

            isListening = true; // Set the flag to true after successful registration
            console.log("Started listening for notifications.");
        } else {
            console.log("Already listening for notifications.");
        }
    } catch (error) {
        console.error("Failed to start listening for notifications:", error);
    }
};

// Dừng lắng nghe thông báo
export const stopListening = () => {
    try {
        if (isListening) { // Check if currently listening
            // Hủy bỏ tác vụ không giao diện
            AppRegistry.registerCancellableHeadlessTask(
                RNAndroidNotificationListenerHeadlessJsName,
                () => headlessNotificationListener, // taskProvider
                () => headlessTaskCanceller // taskCancelProvider
            );


            headlessTaskCanceller()

            isListening = false; // Set the flag to false after unregistering
            console.log("Stopped listening for notifications.");
        } else {
            console.log("Not currently listening for notifications.");
        }
    } catch (error) {
        console.error("Failed to stop listening for notifications:", error);
    }
};