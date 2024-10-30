import base_url from "./base_url";
import axios from "axios";
import commonApi from "./commonApi";

export const registerApi=async(data)=>{
    return await commonApi(`${base_url}/register`, 'POST', "", data)
}

export const loginApi=async(data)=>{
    return await commonApi(`${base_url}/login`, 'POST', "", data)
}

export const addProjectApi=async(header, data)=>{
    return await commonApi(`${base_url}/addproject`, 'POST', header, data)
}

export const getAllProjectsApi=async(header)=>{
    return await commonApi(`${base_url}/allprojects`, 'GET', header, "")
}

export const deleteProjectApi=async(id, header)=>{
    return await commonApi(`${base_url}/deleteProject/${id}`, 'DELETE', header, {})
}

export const editProjectApi=async(data, id, header)=>{
    return await commonApi(`${base_url}/editproject/${id}`, 'PUT', header, data)
}

export const editProfileApi=async(data, header)=>{
    return await commonApi(`${base_url}/editprofile`, 'PUT', header, data)
}

export const allProjectsApi=async()=>{
    return await commonApi(`${base_url}/getallprojects`, 'GET', "", "")
}