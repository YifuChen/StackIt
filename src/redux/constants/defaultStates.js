const userInfoDefault = {
  isFetching: false,
  data: {},
};

const userDataDefault = {
  isFetching: false,
  data: {},
};

const leadersDataDefault = {
  isFetching: false,
  data: {},
};

const gameStateDefault = {
  score: 0,
  combo: 0,
  maxCombo: 0,
};

const appStateDefault = {
  userRegistered: false,
  aliasRegistered: false,
  currentSection: {
    app: 'start',
    startMenu: 'main',
    endMenu: 'scoreboard',
  },
};

const errorDefault = [];

// default state of the app
const rootDefault = {
  appState: appStateDefault,
  gameState: gameStateDefault,
  userInfo: userInfoDefault,
  userData: userDataDefault,
  leadersData: leadersDataDefault,
  error: errorDefault,
};

export {
  appStateDefault,
  gameStateDefault,
  userInfoDefault,
  userDataDefault,
  leadersDataDefault,
  errorDefault,
  rootDefault,
};
