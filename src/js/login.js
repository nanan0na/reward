import { supabase } from './supabase.js';
import { redirectIfAuthenticated } from './auth.js';

const form = document.querySelector('#login-form');

await redirectIfAuthenticated();

form?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.querySelector('#userId').value.trim();
  const password = document.querySelector('#userPw').value.trim();

  if (!email || !password) {
    alert('Enter your information');
    return;
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    alert('Login failed');
    console.error(error);
    return;
  }

  location.href = './list.html';
});
