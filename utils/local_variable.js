let rooms = [
  {
    id: 1,
    name:"Purvanchal",
    number_of_seats: 100,
    price: 3000,
    amenities: ["welcome gifts", "swimming pool", "complementary breakfast"],
    isBooked: true,
  },
  {
    id: 2,
    name : "Thotabeta",
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
    date: "",
    start_time: "",
    end_time: "",
  },
];

let customers = [
  {
    id: 1,
    name: "kums",
    bookings: [1],
    contact: "1234567890",
    address : ""
  },
];

export { rooms, bookings, customers };
