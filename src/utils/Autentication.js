export const isAutenticated = () => localStorage.getItem("@Token") !== null;

export const getToken = () => localStorage.getItem("@Token");
export const getId = () => localStorage.getItem("@Id");
