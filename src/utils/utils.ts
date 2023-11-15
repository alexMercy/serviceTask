export const isAuthentication = () => !!JSON.parse(localStorage.getItem("isAuth")!)

export const setAuth = (value) => localStorage.setItem("isAuth", JSON.stringify(value))