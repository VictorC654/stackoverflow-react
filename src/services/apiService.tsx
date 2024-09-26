// ALL THE COMMENTED LINES ARE FOR BACK END!!!
import axios, {AxiosResponse} from "axios";
import { Topic } from "pages/topics-page/models/topicModel";
import { createAxiosClient } from "./client";


const api = createAxiosClient(); 
const getLocalStorage = (key : any) => {
    const storedItem = localStorage.getItem(key);
    return storedItem ? JSON.parse(storedItem) : null;
}
const setLocalStorage = (key : any, data : any) => {
    localStorage.setItem(key, JSON.stringify(data));
}

export const logoutUser = () => {
    localStorage.removeItem("currentUser");
}

 export const getTopics = async () : Promise<Topic[]>  => {  
     return await api.get('/api/Topic').then(
         (response: AxiosResponse) => {
            console.log(response.data);
             return response.data;
         }
     );
 }

export const registerUser = async (user : any) => {
    try {
        const response = await api.post('/api/Auth/register', user);
        const data = response.data;
        // const currentItems = getLocalStorage('items') || [];
        // currentItems.push(user);
        setLocalStorage('items', data);
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
export const loginUser = async (userData: { email: string; password: string }) => {
    try {
        const response = await api.post("/api/Auth/login", userData);
        const { token, user } = response.data;

        if (localStorage.getItem("jwttoken")) {
            localStorage.removeItem("jwttoken");
        }

        setLocalStorage("jwttoken", token);
        setLocalStorage("currentUser", user);

        console.log("Logged in successfully");
    } catch (error) {
        console.log(error);
        throw error;
    }
};
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


export const createQuestion = async (question: { title: string; description: string; tags: string[]; userId: number }) => {
    try {
        // POST request către endpoint-ul API care gestionează întrebările
        const response = await api.post('/api/Topic', question); // Endpoint-ul trebuie să fie corect definit în backend
        console.log("Question created successfully:", response.data);
        return response;
    } catch (error) {
        console.error('Error creating question:', error);
        throw error;
    }
};

export const getQuestionDetails = async (questionId: string) => {
    const response = await api.get(`/api/Topic/${questionId}`); // Modifică URL-ul în funcție de API
    return response; // Returnează datele întrebării
};