export const isQueryParams = (url, query) => {
  if (url.searchParams.has(query)) {
    if (url.searchParams.get(query) === '') {
      url.searchParams.delete(query)
      history.pushState('', '', url.href)
      return false
    }
    return true
  }
}

export const filterByName = (users, params, value) => {
  const filtredUsers = users.filter((user) =>
    user[params].first.toUpperCase().match(value.toUpperCase())
  )
  return filtredUsers
}

export const filterByGender = (users, params, value) => {
  const filtredUsers = users.filter((user) => user[params].toUpperCase() === value.toUpperCase())
  return filtredUsers
}

export const sortUsers = (users, order) => {
  const sortedUsers = [...users]

  switch (order) {
    case 'age_asc':
      sortedUsers.sort((user, nextUser) => user.dob.age - nextUser.dob.age)
      return sortedUsers
    case 'age_desc':
      sortedUsers.sort((user, nextUser) => nextUser.dob.age - user.dob.age)
      return sortedUsers
    case 'name_acs':
      sortedUsers.sort((user, nextUser) => {
        if (user.name.first.toUpperCase() === nextUser.name.first.toUpperCase()) return 0
        else if (user.name.first.toUpperCase() < nextUser.name.first.toUpperCase()) return -1
        else return 1
      })
      return sortedUsers
    case 'name_desc':
      sortedUsers.sort((user, nextUser) => {
        if (user.name.first.toUpperCase() === nextUser.name.first.toUpperCase()) return 0
        else if (user.name.first.toUpperCase() < nextUser.name.first.toUpperCase()) return 1
        else return -1
      })
      return sortedUsers
    default:
      return sortedUsers
  }
}
