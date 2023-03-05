function solve(data, criteria) {
    let employees = JSON.parse(data);
    const [key, value] = criteria.split('-');

    if (key != 'all') {
        employees = employees.filter(el => el[key] == value);
    }
    console.log(employees.map((el, index) => `${index}. ${el.first_name} ${el.last_name} - ${el.email}`).join('\n'))

}

solve(`[{
    "id": "1",
    "first_name": "Ardine",
    "last_name": "Bassam",
    "email": "abassam0@cnn.com",
    "gender": "Female"
  }, {
    "id": "2",
    "first_name": "Kizzee",
    "last_name": "Jost",
    "email": "kjost1@forbes.com",
    "gender": "Female"
  },  
{
    "id": "3",
    "first_name": "Evanne",
    "last_name": "Maldin",
    "email": "emaldin2@hostgator.com",
    "gender": "Male"
  }]`,
    'gender-Female')