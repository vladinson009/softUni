const errorTypes = {
  Error: customError,
  ValidationError: validationError,
};

export default function errorParser(error) {
  const parsedError = errorTypes[error.name];
  if (typeof parsedError == 'function') {
    return parsedError(error);
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
