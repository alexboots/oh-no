export const setAuthToken = (token: string) => {
  localStorage.setItem('token', token);
  localStorage.setItem('userHasLoggedinBefore', JSON.stringify(true));
}
export const getAuthToken = () => localStorage.getItem('token');
export const clearAuthToken = () => localStorage.removeItem('token');
export const getLoggedInStatus = () => getAuthToken() ? true : false;

export const getHasUserLoggedinBefore = () => {
  const hasUserLoggedInBefore: string | null = localStorage.getItem('userHasLoggedinBefore');
  if(hasUserLoggedInBefore !== null) {
    return true;
  } else {
    return false;
  }
};