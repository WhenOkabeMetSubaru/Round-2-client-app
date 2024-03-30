import auth from "../auth/auth";
import {serverLink} from './userApi'

export const addNewRoleByAdmin = async (roleDetails) =>
{
    try
    {
        let response = await fetch(`${serverLink}/api/v1/role/new`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization":"Bearer " + auth?.isAuthenticated()
            },
            body: JSON.stringify(roleDetails)
        })

        return await response.json()
    } catch (error)
    {
        return error.message;
    }
}

export const updateRoleByIDAdmin = async (roleDetails,roleId) =>
{
    try
    {
        let response = await fetch(`${serverLink}/api/v1/role/${roleId}/update`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization":"Bearer " + auth?.isAuthenticated()
            },
            body: JSON.stringify(roleDetails)
        })

        return await response.json()
    } catch (error)
    {
        return error.message;
    }
}


export const deleteRoleByIDAdmin = async ( roleId) =>
{
    try
    {
        let response = await fetch(`${serverLink}/api/v1/role/${roleId}/delete`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization":"Bearer " + auth?.isAuthenticated()
            }
        })

        return await response.json()
    } catch (error)
    {
        return error.message;
    }
}



export const getAllRolesByAdmin = async ({ token }) =>
{
    try
    {
        let response = await fetch(`${serverLink}/api/v1/role/all`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + auth?.isAuthenticated() || token
            }
        })

        return await response.json()
    } catch (error)
    {
        return error.message;
    }
}


export const addNewRoleToUser = async (roleId,userId) =>
{
    try
    {
        let response = await fetch(`${serverLink}/api/v1/user/${userId}/add/role/${roleId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + auth?.isAuthenticated()
            }
        })

        return await response.json()
    } catch (error)
    {
        return error.message;
    }
}

export const deleteUserRole = async (roleId, userId) =>
{
    try
    {
        let response = await fetch(`${serverLink}/api/v1/user/${userId}/delete/role/${roleId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + auth?.isAuthenticated()
            }
        })

        return await response.json()
    } catch (error)
    {
        return error.message;
    }
}


