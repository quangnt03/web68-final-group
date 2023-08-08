import { v4 as uuidv4 } from 'uuid';

const mockPopularDish = [
    {
        title: "Pizza Hải Sản Pesto Xanh",
        price: 169000,
        image: "../images/mock-images/popular-pizza-1.jpg",
        content: "Tôm, thanh cua, mực và bông cải xanh tươi ngon trên nền sốt Pesto Xanh",
        id: uuidv4()
    },
    {
        title: "Pizza Hải Sản Cao Cấp",
        price: 149000,
        image: "../images/mock-images/popular-pizza-2.jpg",
        content: "Tôm, cua, mực và nghêu với sốt Marinara",
        id: uuidv4()
    },
    {
        title: "Pizza Thịt Xông Khói",
        price: 139000,
        image: "../images/mock-images/popular-pizza-3.jpg",
        content: "Thịt giăm bông, thịt xông khói và hai loại rau của ớt xanh, cà chua",
        id: uuidv4()
    },
    {
        title: "Pizza 5 Loại Thịt Đặc Biệt",
        price: 139000,
        image: "../images/mock-images/popular-pizza-4.jpg",
        content: "Xúc xích lợn và bò đặc trưng của Ý, giăm bông, thịt xông khói",
        id: uuidv4()
    }
]

export default mockPopularDish