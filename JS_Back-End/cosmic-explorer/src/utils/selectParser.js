// Create dynamic select options for game platforms
export default function createSelectOptions(arr, selected) {
  return arr.map((el) => {
    if (el == selected) {
      if (el == '---') {
        return { content: el, value: '', selected: true };
      }
      return { content: el, value: el, selected: true };
    } else {
      if (el == '---') {
        return { content: el, value: '', selected: false };
      }
      return { content: el, value: el, selected: false };
    }
  });
}
