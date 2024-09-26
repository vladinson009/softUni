const section = document.getElementById('registerLink');
section.remove();

export function showRegister(main) {
  main.replaceChildren(section);
}
