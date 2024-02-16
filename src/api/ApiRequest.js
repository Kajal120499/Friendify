import { Base_Url } from "../utils/String"

export const postApiRequest=async(endpoint,data)=>{
    const res = await fetch(Base_Url+endpoint,{
        method:'post',
        body:data,
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
    })
    const json = await res.json()
    return json;
}