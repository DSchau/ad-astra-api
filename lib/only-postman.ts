export function onlyPostman({ request }) {
  const token = request.headers.get('Postman-Token')
  if (!token) {
    throw new Error('Only works with Postman!')
  }
}
