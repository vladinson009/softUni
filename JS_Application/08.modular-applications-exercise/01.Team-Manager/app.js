import { page } from '/lib.js';
import { decorateContext, updateNavBar } from './util.js';
import { showHome } from './src/views/homeView.js';
import { showLogin } from './src/views/loginView.js';
import { showRegister } from './src/views/registerView.js';
import { showBrowseTeams } from './src/views/browseView.js';
import { showCreateTeam } from './src/views/createTeamView.js';
import { showMyTeam } from './src/views/myTeamsView.js';
import { logout } from './api.js';
import { showTeamDetail } from './src/views/teamDetailsView.js';

document.getElementById('logoutBtn').addEventListener('click', onLogout);

page(decorateContext);
page('/', showHome);
page('/login', showLogin);
page('/register', showRegister);
page('/browse-teams', showBrowseTeams);
page('/create-team', showCreateTeam);
page('/my-teams', showMyTeam);
page('/browse-teams/details/:id', showTeamDetail);

page.start();

// next task

// Logged user, who is not a member of the team (there is no request with _ownerId matching the Id of the current user) can see the list with member names and the button "Join Team"

async function onLogout(e) {
  e.preventDefault();
  await logout();
  updateNavBar();
  page.redirect('/');
}
