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
    console.log(url);
    try{
        const response=await axios.delete(url);
        console.log(response);
        return response;
    } catch(error){
        console.error("Error deleting data: ", error);
    }
}

export const sendContacts= async (source:string, data: File)=>{
    const url=`${BASE_URL}/${source}`;
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

export const userWelcome= async(source:string, data)=>{

}