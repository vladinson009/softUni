class Company {
    constructor() {
        this.departments = {};
    }
    addEmployee(name, salary, position, department) {
        for (let arg of arguments) {
            if (arg == '' || arg == undefined || arg == null || salary < 0) {
                throw new Error('Invalid input!');
            }
        }
        if (this.departments[department] == undefined) {
            this.departments[department] = [];
        }
        this.departments[department].push({
            name,
            salary,
            position
        });
        return `New employee is hired. Name: ${name}. Position: ${position}`;
    }
    bestDepartment() {
        const result = [];
        let bestDepartment = '';
        let avg = 0;
        for (let depart in this.departments) {
            let tempAvg = 0
            for (let person of Object.values(this.departments[depart])) {
                tempAvg += Number(person.salary);
            }
            tempAvg = tempAvg / this.departments[depart].length;
            if (tempAvg >= avg) {
                avg = tempAvg;
                bestDepartment = depart;
            }
        }
        let sortedEmployees = this.departments[bestDepartment].sort((a, b) => {
            return b.salary - a.salary || a.name.localeCompare(b.name)
        });
        result.push(`Best Department is: ${bestDepartment}`, `Average salary: ${avg.toFixed(2)}`);
        for (let person of sortedEmployees) {
            result.push(`${person.name} ${person.salary} ${person.position}`)
        }
        return result.join('\n')
    }
}

let c = new Company();
console.log(c.addEmployee("Stanimir", 2000, "engineer", "Construction"));
console.log(c.addEmployee("Pesho", 1500, "electrical engineer", "Construction"));
console.log(c.addEmployee("Slavi", 500, "dyer", "Construction"));
console.log(c.addEmployee("Stan", 2000, "architect", "Construction"));
console.log(c.addEmployee("Stanimir", 1200, "digital marketing manager", "Marketing"));
console.log(c.addEmployee("Pesho", 1000, "graphical designer", "Marketing"));
console.log(c.addEmployee("Gosho", 1350, "HR", "Human resources"));
console.log(c.bestDepartment());
module.export = Company;