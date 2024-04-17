export const baseUrl = "http://127.0.0.1:8000/api/"


export const token = JSON.parse(localStorage.getItem("token"))
console.log("token=====>",token)

export const pageSizeArr = [10,15,25,55]