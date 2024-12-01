const errorType = {
  Error: customError,
  ValidationError: validationError,
  MongoServerError: mongoError,
};

export function errorParser(error) {
  const action = errorType[error.name];
  if (typeof action == 'function') {
    return action(error);
  } else {
    return error;
  }
}

function customError(error) {
  return error.message;
}
function validationError(error) {
  return Object.values(error.errors).at(0).properties.message;
}
function mongoError(error) {
  console.log(error);
}
