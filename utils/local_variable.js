let rooms = [
  {
    id: 1,
    name: "Purvanchal",
    number_of_seats: 100,
    price: 3000,
    amenities: ["welcome gifts", "swimming pool", "complementary breakfast"],
    isBooked: false,
  },
  {
    id: 2,
    name: "Thotabeta",
    number_of_seats: 200,
    price: 4000,
    amenities: ["swimming pool", "indoor games"],
    isBooked: false,
  },
];

let bookings = [
  {
    id: 1,
    room_id: 1,
    customer_id: 1,
    customer_name: "kums",
    date: "2024-05-27T00:00:00.000Z",
    start_time: "2024-05-27T14:00:00.000Z",
    end_time: "2024-05-27T19:00:00.000Z",
  },
];

let customers = [
  {
    id: 1,
    name: "kums",
    bookings: [1],
    contact: "1234567890",
    address: "",
  },
];

export { rooms, bookings, customers };
