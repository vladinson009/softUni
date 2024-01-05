function getPersons() {
    class Person {
        constructor(firstName, lastName, age, email) {
            this.firstName = firstName;
            this.lastName = lastName;
            this.age = age;
            this.email = email;
        }
        toString() {
            return `${this.firstName} ${this.lastName} (age: ${this.age}, email: ${this.email})`;
        }
    }

    let guy1 = new Person('Anna', 'Simpson', 22, 'anna@yahoo.com');
    let guy2 = new Person('SoftUni');
    let guy3 = new Person('Stephan', 'Johnson', 25);
    let guy4 = new Person('Gabriel', 'Peterson', 24, 'g.p@gmail.com');

    return [guy1, guy2, guy3, guy4]

}
console.log(getPersons());