export function createSession(user) {
  const data = {
    _id: user._id,
    email: user.email,
    token: user.accessToken,
  };
  localStorage.setItem('auth', JSON.stringify(data));
}
export function checkSession() {
  const auth = localStorage.getItem('auth');
  if (!auth) {
    return null;
  }
  return JSON.parse(auth);
}
export function clearSession() {
  localStorage.removeItem('auth');
}
