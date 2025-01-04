import { errors } from "com"

const { SystemError } = errors

export default () => {
  return fetch(`${import.meta.env.VITE_API_URL}/users/profile`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.token}`,
    },
  }).then((res) => {
    if (res.ok)
      return res.json().catch((error) => {
        throw new SystemError(error.message)
      })

    return res
      .json()
      .catch((error) => {
        throw new SystemError(error.message)
      })
      .then(({ error, message }) => {
        throw new errors[error](message)
      })
  })
}
