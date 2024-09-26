const section = document.getElementById('createLink');
section.remove();

export function showCreate(main) {
  main.replaceChildren(section);
}
