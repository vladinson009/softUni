export function urlValidator() {
  return {
    validator: function (url) {
      return url.includes('http');
    },
    message: (props) =>
      `${props.value} is not a valid URL. It must start with http:// or https://`,
  };
}
