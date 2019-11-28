const api = "http://localhost:7000/api";

let token = localStorage.token;
console.log('token:', token)
if (!token)
    token = localStorage.token = Math.random()
        .toString(36)
        .substr(-8);

const headers = {
    Authorization: token
};

// Add new user
export const addUser = user =>
    fetch(`${api}/users/add`, {
        method: "POST",
        headers: {
            ...headers,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    }).then(res => res.json())
        .then(data => data);

// Login
export const login = user =>
    fetch(`${api}/users/login`, {
        method: "POST",
        headers: {
            ...headers,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    }).then(res => res.json())
        .then(data => data);


// Add new item
export const addItem = item =>
    fetch(`${api}/findersFee/addItem`, {
        method: "POST",
        headers: {
            ...headers,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(item)
    }).then(res => res.json())
        .then(data => data);

// Get items by user
export const getItemsbyUser = id =>
    fetch(`${api}/findersFee/searchbyuser/${id}`, { headers })
        .then(res => res.json())
        .then(data => data);

// Get all items 
export const getAll = () =>
    fetch(`${api}/findersFee/getAll`, { headers })
        .then(res => res.json())
        .then(data => data);

// Update item to found with finderEmail
export const updateItem = (id, finderEmail) =>
    fetch(`${api}/findersFee/updateItemFound`, {
        method: "POST",
        headers: {
            ...headers,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ id: id, finderEmail: finderEmail })
    }).then(res => res.json());