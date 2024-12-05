const errorTypes = {
  Error: customError,
  ValidationError: validationError,
};
// Parse user-friendly error message, depend on the error type
export default function errorParser(error) {
  const parsedError = errorTypes[error.name];
  if (typeof parsedError == 'function') {
    return parsedError(error);
  } else {
    return error;
  }
}
// Parsed error for custom error
function customError(error) {
  return error.message;
}
// Parsed error for mongoose schema error
function validationError(error) {
  return Object.values(error.errors).at(0).properties.message;
}
