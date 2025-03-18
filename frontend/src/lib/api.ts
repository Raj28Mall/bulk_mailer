import axios from 'axios';

const BASE_URL='http://127.0.0.1:5000/api';

export const sendData = async (source: string, data: Record<string, unknown>) => {
    const url=`${BASE_URL}/${source}`;
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

export const fetchData= async(source: string)=>{
    const url=`${BASE_URL}/${source}`;
    try{
        const response=await axios.get(url);
        return response.data;
    } catch(error){
        console.error("Error fetching data: ", error);
        return null;
    }
};

export const deleteData= async(source: string, id: number)=>{
    const url=`${BASE_URL}/${source}/${id}`;
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

export const sendEmail= async(source:string, data: Record<string, unknown>)=>{
    const url=`${BASE_URL}/${source}`;
    try{
        const response=await axios.post(url, data);
        return response.data;
    } catch(error){
        console.error("Error sending email: ", error);
        return null;
    }
}