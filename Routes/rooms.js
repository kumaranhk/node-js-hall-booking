import express from "express";
import { bookings, rooms } from "../utils/local_variable.js";
import { generateId, payloadValidation, parseBool } from "../utils/utils.js";

const roomRouter = express.Router();
roomRouter.use(express.json());
//schema for room
const SCHEMA = ["name", "number_of_seats", "price", "amenities"];

//post request for creating a room
roomRouter.post("/create-room", (req, res) => {
  let { body } = req;
  //validating the payload
  let payload = payloadValidation(SCHEMA, body);
  if (payload) {
    //adding entity to bookings array
    let id = generateId(rooms);
    rooms.push({
      id,
      ...body,
      isBooked: false,
    });
    res.send({ message: "Room created" });
  } else res.status(400).send({ message: "Invalid payload schema" });
});

//get request for getting room with bookings 
roomRouter.get("/:id?", (req, res) => {
  const { id } = req.params;
  //getting query param from req
  const isBookings = parseBool(req.query.isBookings);
  if (isBookings) {
    if (id) {
      //filtering entity based on id
      const room = rooms.filter((room) => room.id == id);
      if (room.length == 0) {
        res.status(404).send({ message: "Room not found" });
      } else {
        //manioulating entity based on its booking status
        if (room[0].isBooked) {
          let booking = bookings.filter(
            (booking) => booking.room_id == room[0].id
          );
          res.send([{ ...room[0], bookings: booking }]);
        } else {
          res.send(room);
        }
      }
    } else {
      //manipulating the rooms array based on its booking status
      let data = rooms.map((room) => {
        if (room.isBooked) {
          let booking = bookings.filter(
            (booking) => booking.room_id == room.id
          );
          return {
            ...room,
            bookings: booking,
          };
        } else {
          return { ...room };
        }
      });
      res.send(data);
    }
  } else {
    if (id) {
      const room = rooms.filter((room) => room.id == id);
      if (room.length == 0) {
        res.status(404).send({ message: "Room not found" });
      } else res.send(room);
    } else {
      res.send(rooms);
    }
  }
});

export default roomRouter;
