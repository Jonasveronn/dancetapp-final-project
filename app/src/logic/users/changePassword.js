import { validate, errors } from "com"

const { SystemError } = errors

export default (oldPassword, newPassword, newPasswordRepeat) => {
  validate.password(newPassword)
  validate.passwordsMatch(newPassword, newPasswordRepeat)

  return fetch(`${import.meta.env.VITE_API_URL}/users/changePassword`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ oldPassword, newPassword, newPasswordRepeat }),
  })
    .catch((error) => {
      throw new SystemError(error.message)
    })
    .then((res) => {
      if (res.ok) return

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
