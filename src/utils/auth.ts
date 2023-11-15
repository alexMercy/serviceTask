export const isAuthentication = () => !!JSON.parse(localStorage.getItem("isAuth")!)
export const setAuth = (value: boolean) => localStorage.setItem("isAuth", JSON.stringify(value))