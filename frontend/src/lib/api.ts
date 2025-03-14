/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';

const BASE_URL='http://127.0.0.1:5000/api';

export const sendData = async (source: string, data: Record<string, unknown>) => {
    const url=`${BASE_URL}/${source}`;
    try{
        const response=await axios.post(url, data, {
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
    try{
        const response=await axios.delete(url);
        console.log("DELETE Response:", response.data);
    } catch(error){
        console.error("Error deleting data: ", error);
    }
}