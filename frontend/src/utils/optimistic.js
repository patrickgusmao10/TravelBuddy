export async function runOptimistic({ apply, request, confirm }) {
  const undo = apply()

  try {
    const response = await request()
    confirm(response.data)
    return true
  } catch {
    undo()
    return false
  }
}