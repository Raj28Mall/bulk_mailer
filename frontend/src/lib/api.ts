import axios from 'axios';

const BASE_URL='http://127.0.0.1:5000/api';

export const sendTemplate = async (data: Record<string, unknown>) => {
    const url=`${BASE_URL}/email_template`;
    try{
        await axios.post(url, data, {
            headers:{
                "Content-Type": "application/json",
            },
        });
    } catch(error){
        console.error("Error sending data: ", error);
    }
  };

export const fetchTemplate= async()=>{
    const url=`${BASE_URL}/email_template`;
    try{
        const response=await axios.get(url);
        return response.data;
    } catch(error){
        console.error("Error fetching data: ", error);
        return null;
    }
};

export const deleteTemplate= async(id: number)=>{
    const url=`${BASE_URL}/email_template/${id}`;
    try{
        const response=await axios.delete(url);
        return response;
    } catch(error){
        console.error("Error deleting data: ", error);
    }
}

export const sendContacts= async (data: File)=>{
    const url=`${BASE_URL}/contacts`;
    const fileData=new FormData();
    fileData.append("file", data);
    try{
        const response=await axios.post(url, fileData);
        return response.data;
    } catch(error){
        console.error("Error sending contacts: ", error);
        return null;
    }
}

export const userWelcome= async()=>{
    const url=`${BASE_URL}/auth`;
    try{
        const response=await axios.post(url);
        return response.data;
    } catch(error){
        console.error("Error entering user into db: ", error);
        return null;
    }
}

export const sendTestMail= async(subject:string, body:string, recipient:string)=>{
    const url=`${BASE_URL}/test_mail`;
    const data={'subject':subject, 'body':body, 'to_email':recipient};
    try{
        const response=await axios.post(url, data);
        return response.data;
    } catch(error){
        console.error("Error sending test mail: ", error);
        return null;
    }
}

export const sendAllMail= async(subject:string, body:string, recipients:string[])=>{
    const url=`${BASE_URL}/all_mail`;
    const data={'subject':subject, 'body':body, 'to_emails':recipients};
    try{
        const response=await axios.post(url, data);
        return response.data;
    } catch(error){
        console.error("Error sending all mail: ", error);
        return null;
    }
}