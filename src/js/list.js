import { supabase } from './supabase.js'
import { stamps } from './data.js'

const { data } = await supabase.auth.getSession()
const container = document.querySelector('.stamp-list')

if (!data.session) {
  location.href = './login.html'
}

container.innerHTML = stamps.map(stamp => `
  <a href="./detail.html?id=${stamp.id}">
    <img src="${stamp.thumbnail}">
    <div>${stamp.title}</div>
  </a>
`).join('')