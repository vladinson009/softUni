export function urlValidator() {
  return {
    validator: function (url) {
      return url.includes('http');
    },
    message: (props) =>
      `${props.value} is not a valid URL. It must start with http:// or https://`,
  };
}
export const inputValidation = {
  validator: function (value) {
    return /^[A-Za-z0-9 ]+$/.test(value);
  },
  message: function (props) {
    return `${props.value} Must contain only letters, digits or whitespaces`;
  },
};
