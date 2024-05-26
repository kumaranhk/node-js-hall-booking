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
  console.log(payloadKeys);
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
function parseBool(val) {
  return val === true || val == "true";
}
export { generateId, payloadValidation, parseBool };
