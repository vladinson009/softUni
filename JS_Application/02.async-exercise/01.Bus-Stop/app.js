async function getInfo() {
  const stopName = document.getElementById('stopName');
  const buses = document.getElementById('buses');
  buses.replaceChildren();
  stopName.textContent = '';

  try {
    const url = 'http://localhost:3030/jsonstore/bus/businfo/';
    const input = document.getElementById('stopId').value;

    const response = await fetch(url + input);
    if (response.status != 200) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    stopName.textContent = data.name;
    Object.entries(data.buses).forEach(([key, value]) => {
      const li = document.createElement('li');
      li.textContent = `Bus ${key} arrives in ${value} minutes`;
      buses.appendChild(li);
    });
  } catch (error) {
    stopName.textContent = 'Error';
    throw error.message;
  }
}
