// ALL THE COMMENTED LINES ARE FOR BACK END!!!

// import axios from "axios";
//
// const api = axios.create({
//     baseURL: 'https://localhost:44388',
//     timeout: 10000,
//     headers: {
//         'Content-Type': 'application/json',
//     }
// })
const getLocalStorage = (key : any) => {
    const storedItem = localStorage.getItem(key);
    return storedItem ? JSON.parse(storedItem) : null;
}
const setLocalStorage = (key : any, data : any) => {
    localStorage.setItem(key, JSON.stringify(data));
}
export const registerUser = async (user : any) => {
    try {
        // const response = await api.post('/register', user);
        // const data = response.data;
        const currentItems = getLocalStorage('items') || [];
        currentItems.push(user);
        setLocalStorage('items', currentItems);
        console.log("SUCCESS");
        // FOR BACK END ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        // return data;
        // FOR BACK END ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    } catch(e)
    {
        console.log("eroare");
        throw e;
    }
}
export const loginUser = async(userData : any) => {
    const localStorage = getLocalStorage("items");
    try {
        // const response = await api.post('/api/Users/Login', userData);
        // const data = response.data;
        let user = localStorage.find((user: { email: any; }) => user.email === userData.email);
        if(user.password === userData.password)
        {
            const currentUser = getLocalStorage('currentUser') || [];
            currentUser.push('currentUser', JSON.stringify(user));
            setLocalStorage('currentUser', currentUser);
            console.log("Logged in");
        }
    } catch (error)
    {
        console.log(error);
        throw error;
    }
}
export const checkIfUserLoggedIn  = (key : any) => {
    return !!localStorage.getItem("currentUser");
}
export const getCurrentUser = async (): Promise<any> => {
        try {
            return JSON.parse(getLocalStorage("currentUser")[1]);
        } catch (error) {
            console.error('Error getting user', error);
        }
}
export const getUser = async (userEmail : any) => {
    try {
        const localStorage = getLocalStorage("items");
        return localStorage.find((user: { email: any; }) => user.email === userEmail);
    //     const response = await api.get('/get-user/{id}');
    //     const resp = response.data;
    //     setLocalStorage('items', data); // Store data in local storage
    //     return resp;
    } catch (error) {
        console.error('Error getting the user:', error);
        throw error;
    }
}
