import { page } from '/lib.js';
import { decorateContext } from '/util.js';
import { showHome } from './src/views/homeView.js';
import { showLogin } from './src/views/loginView.js';
import { showRegister } from './src/views/registerView.js';
import { showBrowseTeams } from './src/views/browseView.js';
import { showCreateTeam } from './src/views/createTeamView.js';
import { showMyTeam } from './src/views/myTeamsView.js';

page(decorateContext);
page('/', showHome);
page('/login', showLogin);
page('/register', showRegister);
page('/browse-teams', showBrowseTeams);
page('/create-team', showCreateTeam);
page('/my-teams', showMyTeam);
page.start();

// next task

// LOGOUT
