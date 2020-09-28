const errorHandler = ({res, errorDescription, errorCode, err}) => {
  console.error(errorDescription, err);
  res.status(errorCode).send(errorDescription);
};

export default errorHandler;
