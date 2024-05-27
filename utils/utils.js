//function for generating id for new entity from last entity
const generateId = (arr) => {
  if (arr.length === 0) return 1;
  let lastElement = arr[arr.length - 1];
  let id = lastElement.id;
  return id + 1;
};

//function for validating the payload using schema
const payloadValidation = (arr, payload) => {
  let payloadKeys = Object.keys(payload);
  // console.log(payloadKeys);
  if (payloadKeys.length != 0) {
    let isOk;
    for (let i = 0; i < arr.length; i++) {
      let index = payloadKeys.findIndex((val) => val == arr[i]);
      if (index == -1) {
        isOk = false;
        break;
      } else {
        isOk = true;
      }
    }
    return isOk;
  } else return false;
};

//functin for changing the datatype to boolean from string for query params
const parseBool = (val) => {
  return val === true || val == "true";
};

const checkForVacancy = ({ room_id, date, start_time, end_time },bookings) => {
  // Filter bookings for the specific room
  const booking = bookings.filter((val) => val.room_id == room_id);

  // Parse date and times
  const parsedDate = new Date(date);
  const parsedStartTime = new Date(`${date}T${start_time}Z`);
  const parsedEndTime = new Date(`${date}T${end_time}Z`);

  // Check bookings for the same date
  const bookingsWithSameDate = booking.filter((val) => {
    const bookingDate = new Date(val.date);
    return (
      bookingDate.getFullYear() === parsedDate.getFullYear() &&
      bookingDate.getMonth() === parsedDate.getMonth() &&
      bookingDate.getDate() === parsedDate.getDate()
    );
  });

  // Check for time conflicts
  const conflicts = bookingsWithSameDate.filter((val) => {
    const bookingStartTime = new Date(val.start_time);
    const bookingEndTime = new Date(val.end_time);
    return (
      (parsedStartTime >= bookingStartTime &&
        parsedStartTime < bookingEndTime) ||
      (parsedEndTime > bookingStartTime && parsedEndTime <= bookingEndTime) ||
      (parsedStartTime <= bookingStartTime && parsedEndTime >= bookingEndTime)
    );
  });

  // Return the result
  if (conflicts.length > 0) {
    return false;
  } else {
    return true;
  }
};
export { generateId, payloadValidation, parseBool, checkForVacancy };
