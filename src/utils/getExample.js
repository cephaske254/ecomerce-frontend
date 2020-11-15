import { get } from "./apiUtils";

get("/user/5")
  .then((data) => {
    // do something with User #5
  })
  .catch((errorMessage) => {
    // the error has already been handled by handleError
    // the message get's passed here
    // do something like store it in redux, etc.
  });
