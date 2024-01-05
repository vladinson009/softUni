function tickets(description, criteria) {
    class Ticket {
        constructor(destination, price, status) {
            this.destination = destination;
            this.price = Number(price);
            this.status = status;

        }
    }
    const tickets = [];
    for (let ticket of description) {
        [destination, price, stat] = ticket.split('|');
        tickets.push(new Ticket(destination, price, stat))
    }
    sorted = tickets.sort((a, b) => {
        if (typeof a[criteria] != 'number') {
            return a[criteria].localeCompare(b[criteria])
        } else {
            return a - b
        }
    });
    return sorted

}

console.log(tickets(['Philadelphia|94.20|available',
        'aNew York City|95.99|available',
        'zNew York City|95.99|sold',
        'Boston|126.20|departed'
    ],
    'price'));