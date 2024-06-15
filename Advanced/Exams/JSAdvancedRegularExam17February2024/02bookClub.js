class BookClub {
  constructor(library, books = [], members = []) {
    this.library = library;
    this.books = books;
    this.members = members;
  }
  addBook(title, author) {
    const existingBook = this.books.find(
      (book) => book.title == title && book.author == author
    );
    if (existingBook) {
      return `The book "${title}" by ${author} is already in ${this.library} library.`;
    }
    this.books.push({ title, author });
    return `The book "${title}" by ${author} has been added to ${this.library} library.`;
  }
  addMember(memberName) {
    if (this.members.includes(memberName)) {
      return `Member ${memberName} is already a part of the book club.`;
    } else {
      this.members.push(memberName);
      return `Member ${memberName} has been joined to the book club.`;
    }
  }
  assignBookToMember(memberName, bookTitle) {
    if (!this.members.includes(memberName)) {
      throw new Error(`Member ${memberName} not found.`);
    } else {
      const bookIndex = this.books.findIndex((book) => book.title == bookTitle);
      if (bookIndex == -1) {
        throw new Error(`Book "${bookTitle}" not found.`);
      } else {
        const assignedBook = this.books.splice(bookIndex, 1)[0];
        return `Member ${memberName} has been assigned the book "${assignedBook.title}" by ${assignedBook.author}.`;
      }
    }
  }
  generateReadingReport() {
    if (this.members.length < 1) {
      return `No members in the book club.`;
    }
    if (this.books.length < 1) {
      return `No available books in the library.`;
    }
    const result = [`Available Books in ${this.library} library:`];

    for (let book of this.books) {
      result.push(`"${book.title}" by ${book.author}`);
    }
    return result.join('\n');
  }
}
const myBookClub = new BookClub('The Bookaholics');
console.log(myBookClub.addBook('To Kill a Mockingbird', 'Harper Lee'));
console.log(myBookClub.addBook('1984', 'George Orwell'));
console.log(myBookClub.addMember('Alice'));
console.log(myBookClub.addMember('Peter'));
console.log(myBookClub.assignBookToMember('Peter', '1984'));
console.log(myBookClub.assignBookToMember('Alice', 'To Kill a Mockingbird'));
console.log(myBookClub.generateReadingReport());
