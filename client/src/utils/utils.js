export function isSmallScreen() {
  return window.innerWidth <= 768;
}
export function autoLogout() {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  window.location.reload();
}
