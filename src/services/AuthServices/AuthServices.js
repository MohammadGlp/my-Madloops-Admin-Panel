import * as Storage from '../storage/storage';

const getCurrentUser = () => {
  try {
    const userInfo = JSON.parse(
      Storage.sessionGetItem('userInfo') ||
        Storage.getItem('userInfo')
    );
    return userInfo;
  } catch (error) {
    return null;
  }
};

const logOut = () => {
  Storage.clearStorage();
  Storage.clearSessionStorage();
};

const getToken = () => {
  return Storage.sessionGetItem('token') || Storage.getItem('token');
};

export { getCurrentUser, logOut, getToken };
