import express from "express";
import { customers } from "../utils/local_variable.js";
import { generateId, payloadValidation, parseBool } from "../utils/utils.js";

const customerRouter = express.Router();
customerRouter.use(express.json());
//Schema for customer
const SCHEMA = ["name", "contact", "address"];

//post request for Creating a customer
customerRouter.post("/create", (req, res) => {
  const { body } = req;
  //generating id for new entity
  const id = generateId(customers);
  //validating the payload
  const payload = payloadValidation(SCHEMA, body);
  if (payload) {
    //adding new entity to customer array
    customers.push({
      ...body,
      id,
      bookings : []
    });
    res.send({ message: "Customer created", customer_details: body });
  } else res.status(400).send({ message: "Invalid payload schema" });
});

//get request for customer with query param to get booking and path param to get particular customer
customerRouter.get("/:id?", (req, res) => {
  const { id } = req.params;
  //getting data from query param for booking count
  const isBookings = parseBool(req.query.isBookings);
  if (isBookings == true) {
    if (id) {
      //filterng customer based on id from req
      const customer = customers.filter((customer) => customer.id == id);
      if (customer.length == 0) {
        res.status(404).send({ message: "Customer not found" });
      } else {
        //adding new key for booking count
        customer[0] = {
          ...customer[0],
          number_of_bookings: customer[0].bookings.length,
        };
        res.send(customer);
      }
    } else {
      let customer = customers.map((val) => {
        //adding new key for booking count
        return {
          ...val,
          number_of_bookings: val.bookings.length,
        };
      });
      res.send(customer);
    }
  } else {
    if (id) {
      const customer = customers.filter((customer) => customer.id == id);
      if (customer.length == 0) {
        res.status(404).send({ message: "Customer not found" });
      } else res.send(customer);
    } else {
      res.send(customers);
    }
  }
});
export default customerRouter;
