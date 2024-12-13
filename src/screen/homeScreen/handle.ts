

export const getTotalMoneyByUserIdDate = async (userId: number, startDate: string, endDate: string) => {
    const url = 'https://tingbox.megahai.com/get_total_money_by_userid_date.php';

    const data = {
        UserID: userId,
        StartDate: startDate,
        EndDate: endDate,
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (result.status === "success") {
            console.log('Tổng số tiền:', result.data);
            return result.data; // Giả sử dữ liệu trả về có trường data chứa tổng số tiền
        } else {
            console.error('Lỗi:', result.message);
            return null;
        }
    } catch (error) {
        console.error("Không thể lấy dữ liệu:", error);
    }
};

