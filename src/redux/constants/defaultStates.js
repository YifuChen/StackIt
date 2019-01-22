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

const gameDefault = {
  score: 0,
  combo: 0,
  maxCombo: 0,
};

const appDefault = {
  userRegistered: false,
  aliasRegistered: false,
};

const errorDefault = [];

// default state of the app
const rootDefault = {
  app: appDefault,
  game: gameDefault,
  userInfo: userInfoDefault,
  userData: userDataDefault,
  leadersData: leadersDataDefault,
  error: errorDefault,
};

export {
  appDefault,
  gameDefault,
  userInfoDefault,
  userDataDefault,
  leadersDataDefault,
  errorDefault,
  rootDefault,
};
