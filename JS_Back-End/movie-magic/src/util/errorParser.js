const errorType = {
  Error: customError,
  ValidationError: validationError,
};

export function parseError(error) {
  const action = errorType[error.name];
  if (typeof action == 'function') {
    return action(error);
  }
}

function customError(error) {
  return error.message;
}
function validationError(error) {
  return Object.values(error.errors)[0].properties.message;
}
