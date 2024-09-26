const section = document.getElementById('dashboard-holder');
section.remove();

export function showDashboard(main) {
  main.replaceChildren(section);
}
