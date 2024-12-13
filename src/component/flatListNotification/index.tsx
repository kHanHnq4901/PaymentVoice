import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface Notification {
    ID: string;
    NameApp: string;
    Title: string; 
    Time: string;
    Text: string;
    Money: string;  // Số tiền dưới dạng chuỗi
    Balance: string;
    AccountSend: string;
    Content: string;
    Created: string;
}

interface NotificationContextType {
    notifications: Notification[];
    totalMoney: string; // Tổng số tiền dưới dạng chuỗi
    totalMoneyThisMonth: string; // Tổng số tiền trong tháng này dưới dạng chuỗi
    moneyComparisonLastMonth: string; // Tỷ lệ tiền so với cùng kỳ tháng trước
    moneyComparisonYesterday: string; // Tỷ lệ tiền so với ngày hôm qua
    fetchNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [totalMoney, setTotalMoney] = useState<number>(0); // Khởi tạo tổng số tiền
    const [totalMoneyThisMonth, setTotalMoneyThisMonth] = useState<number>(0); // Tổng số tiền trong tháng này
    const [moneyComparisonLastMonth, setMoneyComparisonLastMonth] = useState<number>(0);
    const [moneyComparisonYesterday, setMoneyComparisonYesterday] = useState<number>(0);

    const fetchNotifications = async () => {
        const userId = 3; // Thay đổi UserID nếu cần
        const today = new Date(); // Định nghĩa biến today
        const startDate = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0]; // Ngày mùng 1 của tháng
        const endDate = today.toISOString().split('T')[0]; // Ngày hôm nay

        try {
            // Lấy thông báo
            const notificationResponse = await axios.post('https://tingbox.megahai.com/get_notification_by_userid.php', {
                UserID: userId,
                Days: 1 // Có thể thay đổi thành số ngày bạn muốn
            });

            if (notificationResponse.data.status === "success") {
                const data = notificationResponse.data.data;
                setNotifications(data);
                calculateTotalMoney(data); // Tính tổng số tiền khi nhận dữ liệu
            } else {
                console.error('Lỗi:', notificationResponse.data.message);
            }

            // Lấy tổng số tiền trong tháng
            const moneyResponse = await axios.post('https://tingbox.megahai.com/get_total_money_by_userid_date.php', {
                UserID: userId,
                StartDate: startDate,
                EndDate: endDate
            });

            if (moneyResponse.data.status === "success") {
                const totalMoney = parseFloat(moneyResponse.data.data.TotalMoney); // Lấy tổng tiền từ phản hồi
                setTotalMoneyThisMonth(totalMoney); // Cập nhật tổng số tiền trong tháng
                await fetchComparisonData(userId, startDate, endDate, today); // Gọi hàm để lấy dữ liệu so sánh
            } else {
                console.error('Lỗi:', moneyResponse.data.message);
            }
        } catch (error) {
            console.error("Không thể lấy dữ liệu từ API:", error);
        }
    };

    const fetchComparisonData = async (userId: number, startDate: string, endDate: string, today: Date) => {
        const lastMonthStartDate = new Date(new Date(startDate).setMonth(new Date(startDate).getMonth() - 1)).toISOString().split('T')[0];
        const lastMonthEndDate = new Date(new Date(endDate).setMonth(new Date(endDate).getMonth() - 1)).toISOString().split('T')[0];

        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        const yesterdayStartDate = yesterday.toISOString().split('T')[0];
        const yesterdayEndDate = yesterday.toISOString().split('T')[0];

        try {
            // Lấy tổng tiền của tháng trước
            const lastMonthResponse = await axios.post('https://tingbox.megahai.com/get_total_money_by_userid_date.php', {
                UserID: userId,
                StartDate: lastMonthStartDate,
                EndDate: lastMonthEndDate
            });

            if (lastMonthResponse.data.status === "success") {
                const lastMonthTotal = parseFloat(lastMonthResponse.data.data.TotalMoney);
                if (lastMonthTotal !== 0) { // Kiểm tra không chia cho 0
                    setMoneyComparisonLastMonth(((totalMoneyThisMonth - lastMonthTotal) / lastMonthTotal) * 100); // Tính tỷ lệ phần trăm
                } else {
                    setMoneyComparisonLastMonth(0); // Nếu tháng trước không có tiền, tỷ lệ là 0
                }
            }

            // Lấy tổng tiền của ngày hôm qua
            const yesterdayResponse = await axios.post('https://tingbox.megahai.com/get_total_money_by_userid_date.php', {
                UserID: userId,
                StartDate: yesterdayStartDate,
                EndDate: yesterdayEndDate
            });

            if (yesterdayResponse.data.status === "success") {
                const yesterdayTotal = parseFloat(yesterdayResponse.data.data.TotalMoney);
                if (yesterdayTotal !== 0) { // Kiểm tra không chia cho 0
                    setMoneyComparisonYesterday(((totalMoneyThisMonth - yesterdayTotal) / yesterdayTotal) * 100); // Tính tỷ lệ phần trăm
                } else {
                    setMoneyComparisonYesterday(0); // Nếu hôm qua không có tiền, tỷ lệ là 0
                }
            }
        } catch (error) {
            console.error("Không thể lấy dữ liệu so sánh từ API:", error);
        }
    };

    const calculateTotalMoney = (data: Notification[]) => {
        const total = data.reduce((sum, notification) => {
            const moneyValue = parseFloat(notification.Money); // Chuyển đổi chuỗi thành số
            return sum + (isNaN(moneyValue) ? 0 : moneyValue); // Cộng dồn, kiểm tra giá trị NaN
        }, 0);
        setTotalMoney(total); // Cập nhật tổng số tiền
    };

    const formatCurrency = (amount: number): string => {
        return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }); // Định dạng tiền tệ
    };

    useEffect(() => {
        fetchNotifications(); // Gọi hàm để lấy thông báo và tổng số tiền
    }, []);

    return (
        <NotificationContext.Provider value={{ 
            notifications, 
            totalMoney: formatCurrency(totalMoney), 
            totalMoneyThisMonth: formatCurrency(totalMoneyThisMonth), 
            moneyComparisonLastMonth: moneyComparisonLastMonth.toFixed(2) + '%', // Định dạng tỷ lệ
            moneyComparisonYesterday: moneyComparisonYesterday.toFixed(2) + '%', // Định dạng tỷ lệ
            fetchNotifications 
        }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotifications = () => {
    const context = React.useContext(NotificationContext);
    
    if (context === undefined) {
        throw new Error('useNotifications must be used within a NotificationProvider');
    }
    return context;
};