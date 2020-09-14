export const isAutenticated = () => localStorage.getItem("@Token") !== null;

export const getToken = () => localStorage.getItem("@Token");
