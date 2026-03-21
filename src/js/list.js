import { stamps, GRID_COUNT } from './data.js';
import { bindLogoutButton, requireAuth } from './auth.js';

const session = await requireAuth();
if (session) {
  bindLogoutButton();

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
}
