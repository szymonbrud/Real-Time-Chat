const errorHandler = ({res, errorDescription, errorCode, err}) => {
  if (err) {
    console.error(errorDescription, err);
  } else {
    console.log(errorDescription);
  }
  res.status(errorCode).send(errorDescription);
};

export default errorHandler;
