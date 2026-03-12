import { supabase } from './supabase.js'

const form = document.querySelector('#login-form')

form?.addEventListener('submit', async (e) => {
  e.preventDefault()

  const email = document.querySelector('#email').value
  const password = document.querySelector('#password').value

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) {
    alert('로그인 실패')
    return
  }

  location.href = './list.html'
})