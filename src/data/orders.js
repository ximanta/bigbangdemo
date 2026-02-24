export const mockOrders = [
  {
    id: "ORD001",
    date: "2023-10-26",
    total: 274.98,
    status: "Delivered",
    items: [
      {
        productId: "1",
        name: "Premium Wireless Headphones",
        price: 199.99,
        quantity: 1,
        image: "https://via.placeholder.com/80x80/007bff/ffffff?text=Headphones"
      },
      {
        productId: "4",
        name: "Organic Coffee Beans - 1kg",
        price: 25.00,
        quantity: 3,
        image: "https://via.placeholder.com/80x80/dc3545/ffffff?text=Coffee+Beans"
      }
    ]
  },
  {
    id: "ORD002",
    date: "2023-11-10",
    total: 89.99,
    status: "Processing",
    items: [
      {
        productId: "5",
        name: "Portable Bluetooth Speaker",
        price: 79.99,
        quantity: 1,
        image: "https://via.placeholder.com/80x80/17a2b8/ffffff?text=Bluetooth+Speaker"
      },
      {
        productId: "9",
        name: "Stainless Steel Water Bottle",
        price: 18.50,
        quantity: 1,
        image: "https://via.placeholder.com/80x80/28a745/ffffff?text=Water+Bottle"
      }
    ]
  },
  {
    id: "ORD003",
    date: "2023-11-01",
    total: 349.50,
    status: "Shipped",
    items: [
      {
        productId: "3",
        name: "Ergonomic Office Chair",
        price: 349.50,
        quantity: 1,
        image: "https://via.placeholder.com/80x80/ffc107/ffffff?text=Office+Chair"
      }
    ]
  }
];