import axios from "axios"

const commonApi=async(apiUrl, apiMethod, apiHeaders, apiData)=>{
    const config = {
        url: apiUrl,
        method: apiMethod,
        headers: apiHeaders ? apiHeaders : {'Content-Type': 'application/json'},
        data: apiData
    }
    return await axios(config).then(res=>res).catch(err=>{
        console.log(err)
        return err
    })
}

export default commonApi