import auth from "../auth/auth";

// export const serverLink = "https://newtestserver.vercel.app";
export const serverLink = "http://localhost:4000";

export const userLogin = async ({ email, password }) =>
{

    try
    {
       
        let response = await fetch(`${serverLink}/api/v1/signin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({ email, password })
        })

        return await response.json();
    } catch (error)
    {
        return error.message;
    }
}


export const userSignup = async (userDetails) =>
{
    try
    {
        let response = await fetch(`${serverLink}/api/v1/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(userDetails)
        })

        return await response.json()
    } catch (error)
    {
        return error.message;
    }
}


export const getAllUsersByAdmin = async ({ token }) =>
{
    try
    {
        let response = await fetch(`${serverLink}/api/v1/users`, {
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

export const getAllUsersPaginationByAdmin = async ({pageNumber,pageSize}) =>
{
    try
    {
        let response = await fetch(`${serverLink}/api/v1/users/all/pagination?pageNumber=${pageNumber}&pageSize=${pageSize}`, {
            method: "GET",
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

export const updateUserByID = async (userDetails,userId) =>
{
    try
    {
        let response = await fetch(`${serverLink}/api/v1/user/${userId}/update`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization":"Bearer " + auth?.isAuthenticated()
            },
            body: JSON.stringify(userDetails)
        })

        return await response.json()
    } catch (error)
    {
        return error.message;
    }
}

export const deleteUserByID = async (userId) =>
{
    try
    {
        let response = await fetch(`${serverLink}/api/v1/user/${userId}/delete`, {
            method: "DELETE",
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

