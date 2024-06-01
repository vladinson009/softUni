class Movie {
  constructor(movieName, ticketPrice) {
    this.movieName = movieName;
    this.ticketPrice = Number(ticketPrice);
    this.screenings = [];
    this.totalProfit = 0;
    this.totalTickets = 0;
  }
  newScreening(date, hall, description) {
    if (
      this.screenings.some(
        (screening) => screening.date == date && screening.hall == hall
      )
    ) {
      throw new Error(`Sorry, ${hall} hall is not available on ${date}`);
    } else {
      this.screenings.push({ date, hall, description });
      return `New screening of ${this.movieName} is added.`;
    }
  }
  endScreening(date, hall, soldTickets) {
    const index = this.screenings.findIndex(
      (a) => a.date == date && a.hall == hall
    );
    if (index == -1) {
      throw new Error(
        `Sorry, there is no such screening for ${this.movieName} movie.`
      );
    } else {
      const currentProfit = this.ticketPrice * soldTickets;
      this.totalProfit += currentProfit;
      this.totalTickets += soldTickets;
      this.screenings.splice(index, 1);
      return `${this.movieName} movie screening on ${date} in ${hall} hall has ended. Screening profit: ${currentProfit}`;
    }
  }
  toString() {
    let result = '';
    result += `${this.movieName} full information:\n`;
    result += `Total profit: ${this.totalProfit.toFixed(0)}$\nSold Tickets: ${
      this.totalTickets
    }\n`;
    if (this.screenings.length > 0) {
      const sortedMovies = this.screenings.sort((a, b) =>
        a.hall.localeCompare(b.hall)
      );
      result += 'Remaining film screenings:\n';
      for (let movie of sortedMovies) {
        result += `${movie.hall} - ${movie.date} - ${movie.description}\n`;
      }
    } else {
      result += `No more screenings!`;
    }
    return result.trim();
  }
}

let m = new Movie('Wonder Woman 1984', '10.00');
console.log(m.newScreening('October 2, 2020', 'IMAX 3D', `3D`));
console.log(m.newScreening('October 3, 2020', 'Main', `regular`));
console.log(m.newScreening('October 4, 2020', 'IMAX 3D', `3D`));
console.log(m.endScreening('October 2, 2020', 'IMAX 3D', 150));
console.log(m.endScreening('October 3, 2020', 'Main', 78));
console.log(m.toString());

m.newScreening('October 4, 2020', '235', `regular`);
m.newScreening('October 5, 2020', 'Main', `regular`);
m.newScreening('October 3, 2020', '235', `regular`);
m.newScreening('October 4, 2020', 'Main', `regular`);
console.log(m.toString());
