const params = new URLSearchParams(location.search)
const stampId = params.get('id')

const { data } = await supabase
  .from('comments')
  .select(`
  id,
  content,
  created_at,
  profiles (
    display_name,
    avatar_url
  )
`)
  .eq('stamp_id', stampId)
  .order('created_at')

const container = document.querySelector('.comment-list')

container.innerHTML = data.map(comment => `
  <div class="comment">
    <img src="${comment.profiles.avatar_url}">
    <div>
      <div>${comment.profiles.display_name}</div>
      <div>${comment.content}</div>
    </div>
  </div>
`).join('')

const form = document.querySelector('#comment-form')

form.addEventListener('submit', async (e) => {
  e.preventDefault()

  const input = document.querySelector('#comment-input')

  const { data: { user } } = await supabase.auth.getUser()

  await supabase.from('comments').insert({
    stamp_id: stampId,
    user_id: user.id,
    content: input.value
  })

  input.value = ''
})