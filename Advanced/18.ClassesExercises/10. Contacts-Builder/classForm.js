class Contact {
  constructor(firstName, lastName, phone, email) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
    this.email = email;
    this.onlineStatus = false;
  }
  get online() {
    return this.onlineStatus;
  }
  set online(value) {
    this.onlineStatus = value;
    if (this.divTitle) {
      this.divTitle.className = this.onlineStatus ? "title online" : "title";
    }
  }

  render(id) {
    this.article = document.createElement("article");
    this.divTitle = document.createElement("div");
    this.divInfo = document.createElement("div");
    this.divTitle.classList.add("title");

    this.divTitle.innerHTML = `${this.firstName} ${this.lastName}`;
    this.btn = document.createElement("button");
    this.btn.innerHTML = "&#8505;";
    this.divTitle.appendChild(this.btn);

    this.divInfo.classList.add("info");
    this.divInfo.innerHTML = `<span>&phone;${this.phone}</span>
    <span>&#9993; ${this.email}</span>`;
    this.divTitle.className = this.online ? "title online" : "title";
    this.divInfo.style.display = "none";

    this.article.appendChild(this.divTitle);
    this.article.appendChild(this.divInfo);

    document.getElementById(id).appendChild(this.article);

    this.btn.addEventListener("click", () => {
      if (this.divInfo.style.display != "none") {
        this.divInfo.style.display = "none";
      } else {
        this.divInfo.style.display = "block";
      }
    });
  }
}

let contacts = [
  new Contact("Ivan", "Ivanov", "0888 123 456", "i.ivanov@gmail.com"),
  new Contact("Maria", "Petrova", "0899 987 654", "mar4eto@abv.bg"),
  new Contact("Jordan", "Kirov", "0988 456 789", "jordk@gmail.com"),
];
contacts.forEach((c) => c.render("main"));

// After 1 second, change the online status to true
setTimeout(() => (contacts[1].online = true), 2000);
