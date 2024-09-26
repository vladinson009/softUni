const section = document.getElementById('loginLink');
section.remove();

export function showLogin(main) {
  main.replaceChildren(section);
}
