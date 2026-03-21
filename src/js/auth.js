import { supabase } from './supabase.js';

const LOGIN_REQUIRED_MESSAGE = 'Login required.';

export async function requireAuth() {
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    console.error('session check failed:', error);
  }

  if (data?.session) {
    return data.session;
  }

  alert(LOGIN_REQUIRED_MESSAGE);
  location.replace('./login.html');
  return null;
}

export async function redirectIfAuthenticated() {
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    console.error('session check failed:', error);
    return null;
  }

  if (data?.session) {
    location.replace('./list.html');
    return data.session;
  }

  return null;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error('logout failed:', error);
    alert('Logout failed');
    return false;
  }

  location.replace('./login.html');
  return true;
}

export function bindLogoutButton() {
  const logoutButton = document.querySelector('[data-logout]');

  logoutButton?.addEventListener('click', async () => {
    await logout();
  });
}
