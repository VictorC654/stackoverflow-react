// ALL THE COMMENTED LINES ARE FOR BACK END!!!
import {AxiosResponse} from "axios";
import { Topic } from "pages/topics-page/models/topicModel";
import { createAxiosClient } from "./client";
import {get, parseInt} from "lodash";
import * as repl from "repl";
let api = createAxiosClient();
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
 export const saveReply = async (replyData: { newMessage: string; id: string | undefined })=> {
    try {
        // const allComments = JSON.parse(localStorage.getItem('details-comments') || '{}');
        if( replyData.id != null )
        {
            let intId = parseInt(replyData.id);
            api.post("/api/Reply/" + intId, replyData.newMessage);
            console.log("SUCCESS")
        }
    } catch(error)
    {
        console.log("Error when adding a reply");
    }
 }
 export const fetchTopicReplies = async( id: string | undefined)=>
{
    localStorage.removeItem("topicComments");
    try {
        if(id != null)
        {
            let intTopicId = parseInt(id);
            const resp = await api.get("/api/Reply/topic/" + intTopicId);
            if(resp.data != null)
            {
                let commentsArray : any = [];
                resp.data.forEach((comment : any)  => commentsArray.push(comment));
                setLocalStorage("topicComments", commentsArray);
            } else {
                setLocalStorage("topicComments", []);
            }
        }
    } catch
    {
        console.log("Eroare");
    }
}
export const getComments = () => {
    return getLocalStorage("topicComments");
}
export const registerUser = async (userData: { FullName:string, Email: string, Password: string, JobTitle:string  }) => {
    try {
        const response = await api.post('/api/Auth/register', userData );
        console.log("SUCCESS");
    } catch(e)
    {
        console.log("eroare" + e);
        throw e;
    }
}
export const loginUser = async (userData: { Email: string; Password: string }) => {
    try {
         const response = await api.post("/api/Auth/login",  userData);
         const token = response.data;
         setLocalStorage("jwttoken", token);
         api = createAxiosClient();
         const user = await api.get('/api/Auth/getUser/me');
         setLocalStorage("currentUser", user.data);
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
            return getLocalStorage("currentUser");
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


export const createQuestion = async (question: { title: string; description: string; tags: string[]; }) => {
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
    console.log(response.data);
    return response; // Returnează datele întrebării
};