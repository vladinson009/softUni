function solve() {
   document.querySelector('#btnSend').addEventListener('click', onClick);
   const input = document.querySelector('textarea');
   const bestRestaurantOutput = document.getElementById('bestRestaurant').lastElementChild;
   const workersOutput = document.getElementById('workers').lastElementChild;

   function onClick() {
      const restaurants = {};
      let avg = 0;
      let topRestaurantName = '';
      const parsedInput = JSON.parse(input.value)
      for (let currentRestaurant of parsedInput) {
         const [restaurant, rest] = currentRestaurant.split(' - ');
         const people = rest.split(', ');
         if (!restaurants.hasOwnProperty(restaurant)) {
            restaurants[restaurant] = {}
         }
         for (let currentStuff of people) {
            let [person, salary] = currentStuff.split(' ');
            salary = Number(salary);
            restaurants[restaurant][person] = salary;
         }
      }
      ///////////// CREATED OBJECT ////////
      for (let restaurant in restaurants) {
         const personal = Object.entries(restaurants[restaurant])
         let currentAvg = 0;
         let currentSalaries = [];
         for (let person of personal) {
            currentSalaries.push(person[1]);
         }
         currentAvg = Number((currentSalaries.reduce((acc, e) => acc + e, 0) / currentSalaries.length).toFixed(2));
         if (avg < currentAvg) {
            avg = currentAvg;
            topRestaurantName = restaurant;
         }
      }
      const sortedWorkers = Object.entries(restaurants[topRestaurantName])
         .sort((a, b) => b[1] - a[1]);
      const bestSalary = restaurants[topRestaurantName][sortedWorkers[0][0]];
      const peopleAndSalary = [];
      for (let [worker, salary] of sortedWorkers) {
         peopleAndSalary.push(`Name: ${worker} With Salary: ${salary}`)
      }
      bestRestaurantOutput.textContent = `Name: ${topRestaurantName} Average Salary: ${avg} Best Salary: ${bestSalary}`
      workersOutput.textContent = peopleAndSalary.join(' ');
   }
}

//["PizzaHut - Peter 500, George 300, Mark 800",
// "TheLake - Bob 1300, Joe 780, Jane 660"]