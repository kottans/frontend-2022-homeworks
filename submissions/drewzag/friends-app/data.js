export const getRandomUsers = async (amount) => {
  try {
    const response = await fetch(`https://randomuser.me/api/?results=${amount}&page=${1}&seed=drew`)
    const data = await response.json()
    return data.results
  } catch (error) {
    console.log(error)
  }
}
