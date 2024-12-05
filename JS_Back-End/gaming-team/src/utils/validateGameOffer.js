const platforms = ['PC', 'Nintendo', 'PS4', 'PS5', 'XBOX'];
// validation for "Game" schema
export function validateGameOffer(data) {
  const parsedNumber = parseFloat(data.price);
  if (platforms.indexOf(data.platform) < 0) {
    throw new Error('Please select a valid platform!');
  } else if (data.name.length < 4) {
    throw new Error('The name should be at least 4 characters.');
  } else if (!/^https?:\/\//.test(data.image)) {
    throw new Error('The game image should start with "http://" or "https://".');
  } else if (isNaN(parsedNumber) || parsedNumber < 0) {
    throw new Error('The price should be a positive number.');
  } else if (data.genre.length < 2) {
    throw new Error('The genre should be at least 2 characters long.');
  } else if (data.description.length < 10) {
    throw new Error('The description should be at least 10 characters long.');
  }
}
