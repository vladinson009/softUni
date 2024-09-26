const section = document.getElementById('homeLink');
section.remove();

export function showHome(main) {
  main.replaceChildren(section);
}
