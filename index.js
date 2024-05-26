import express from "express";
import roomRouter from "./Routes/rooms.js";
import bookingRouter from "./Routes/booking.js";
import customerRouter from "./Routes/customer.js";

const app = express();
app.use(express.json());
app.use("/rooms", roomRouter);
app.use("/bookings", bookingRouter);
app.use("/customers", customerRouter);
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});
