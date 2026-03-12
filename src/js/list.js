import { stamps, GRID_COUNT } from './data.js';
import { supabase } from './supabase.js';

const { data, error } = await supabase.auth.getSession();
console.log('session check:', data, error);

if (!data.session) {
  location.href = './login.html';
}

const listEl = document.querySelector('#stamp-list');
console.log('listEl:', listEl);

if (listEl) {
  const items = Array.from({ length: GRID_COUNT }, (_, index) => stamps[index] || null);

  listEl.innerHTML = items.map((stamp) => {
    if (!stamp) {
      return `
        <li class="empty">
          <span class="empty-slot" aria-hidden="true"></span>
        </li>
      `;
    }

    return `
      <li>
        <a href="./detail.html?id=${stamp.id}">
          <img src="${stamp.thumbnail}" alt="${stamp.title}">
        </a>
      </li>
    `;
  }).join('');
}