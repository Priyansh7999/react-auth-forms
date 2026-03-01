export const getRole=()=>{
    return localStorage.getItem("role");
}
export const getToken=()=>{
    return localStorage.getItem("token");
}
export const signOut=()=>{
    localStorage.removeItem('token')
    localStorage.removeItem('role')
}