import { stamps } from './data.js';
import { supabase } from './supabase.js';
import { bindLogoutButton, requireAuth } from './auth.js';

const session = await requireAuth();
if (session) {
  bindLogoutButton();

  const params = new URLSearchParams(location.search);
  const stampId = Number(params.get('id'));

  const stamp = stamps.find((item) => item.id === stampId);

  const dateEl = document.querySelector('#detail-date');
  const imageEl = document.querySelector('#detail-image');
  const titleEl = document.querySelector('#detail-title');
  const commentListEl = document.querySelector('#comment-list');
  const commentForm = document.querySelector('#comment-form');
  const commentInput = document.querySelector('#comment');

  if (!stamp) {
    alert('page does not exist');
    location.href = './list.html';
  } else {
    dateEl.textContent = stamp.date;
    imageEl.src = stamp.image;
    imageEl.alt = stamp.title;
    titleEl.textContent = stamp.title;
  }

  async function renderComments() {
    const { data: comments, error } = await supabase
      .from('comments')
      .select('id, content, created_at, user_id')
      .eq('stamp_id', stampId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error(error);
      commentListEl.innerHTML = '';
      return;
    }

    const { data: profiles } = await supabase
      .from('profiles')
      .select('id, display_name, avatar_url');

    const profileMap = {};
    (profiles || []).forEach((profile) => {
      profileMap[profile.id] = profile;
    });

    commentListEl.innerHTML = comments.map((comment) => {
      const profile = profileMap[comment.user_id];

      return `
        <li>
          <figure class="user-avatar">
            <img src="${profile?.avatar_url || '../avatar/0.jpg'}" alt="${profile?.display_name || 'user'}">
          </figure>
          <p class="user-comment">${comment.content}</p>
        </li>
      `;
    }).join('');
  }

  commentForm?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const content = commentInput.value.trim();
    if (!content) return;

    const { data: userData } = await supabase.auth.getUser();
    const user = userData.user;

    if (!user) {
      alert('Login required');
      return;
    }

    const { error } = await supabase.from('comments').insert({
      stamp_id: stampId,
      user_id: user.id,
      content
    });

    if (error) {
      console.error(error);
      alert('Failed to register comment');
      return;
    }

    commentInput.value = '';
    renderComments();
  });

  renderComments();
}
