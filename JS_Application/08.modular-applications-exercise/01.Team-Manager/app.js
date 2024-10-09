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
import { showEditTeam } from './src/views/editTeamView.js';

document.getElementById('logoutBtn').addEventListener('click', onLogout);

page(decorateContext);
page('/', showHome);
page('/login', showLogin);
page('/register', showRegister);
page('/browse-teams', showBrowseTeams);
page('/create-team', showCreateTeam);
page('/my-teams', showMyTeam);
page('/browse-teams/details/:id', showTeamDetail);
page('/browse-teams/edit/:id', showEditTeam);

page.start();

// next task

// approve membership
// leave team, declinq request, remove member from team

async function onLogout(e) {
  e.preventDefault();
  await logout();
  updateNavBar();
  page.redirect('/');
}
