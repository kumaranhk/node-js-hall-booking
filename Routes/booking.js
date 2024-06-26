import express from "express";
import { bookings, customers, rooms } from "../utils/local_variable.js";
import { checkForVacancy, generateId, payloadValidation } from "../utils/utils.js";

const bookingRouter = express.Router();
bookingRouter.use(express.json());

//schema for booking
const SCHEMA = [
  "room_id",
  "customer_id",
  "customer_name",
  "date",
  "start_time",
  "end_time",
];

//get request for booking
bookingRouter.get("/:id?", (req, res) => {
  let { id } = req.params;
  if (id) {
    const booking = bookings.filter((booking) => booking.id == id);
    if (booking.length == 0) {
      res.status(404).send({ message: "booking not found" });
    } else res.send({ bookings: booking });
  } else {
    console.log(typeof bookings[bookings.length - 1].date);
    res.send(bookings);
  }
});

//post request for bookings a room
bookingRouter.post("/room", (req, res) => {
  let { body } = req;
  //validating the payload
  let payload = payloadValidation(SCHEMA, body);
  const isRoomAvailable = checkForVacancy({ ...body },bookings);
  if(isRoomAvailable){
  if (payload) {
    //generating id for new entity
    let id = generateId(bookings);
    //adding entity to bookings array
    bookings.push({
      id,
      ...body,
      date: new Date(body.date),
      start_time: new Date(`${body.date}T${body.start_time}Z`),
      end_time: new Date(`${body.date}T${body.end_time}Z`),
    });
    //manipulating the room array
    let roomIndex = rooms.findIndex((e) => e.id == body.room_id);
    rooms[roomIndex] = {
      ...rooms[roomIndex],
      isBooked: true,
    };
    //manipulating the customer array
    let cutomerIndex = customers.findIndex(
      (customer) => customer.id == body.customer_id
    );
    let customerBooking = customers[cutomerIndex].bookings;
    customerBooking.push(id);
    customers[cutomerIndex] = {
      ...customers[cutomerIndex],
      bookings: customerBooking,
    };
    res.send({ message: "Room booked" });
  } else {
    res.status(400).send({ message: "Invalid payload schema" });
  }
}
else res.send({message : "Room is not available at the requested time "})
});

export default bookingRouter;
