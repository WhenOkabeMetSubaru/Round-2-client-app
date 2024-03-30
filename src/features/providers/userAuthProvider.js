import { useHistory } from "react-router";
import auth from "../auth/auth";

import { createContext, useContext, useState, useEffect } from "react";
import { serverLink } from "../api/userApi";


const UserAuthContext = createContext({});

const UserAuth = ({ children }) =>
{
    const { verify, logout, loggedIn, updateData, currentUser, setCurrentUser,refreshUserData } = UserProviderAuth();
    // const { error, data, loading } = useQuery(GET_USER_BY_ID);



    useEffect(() =>
    {
        if (auth.isAuthenticated() == false)
        {
            verify();
        }
    }, [])

    return (
        <UserAuthContext.Provider value={ { verify, logout, loggedIn, updateData, currentUser, setCurrentUser,refreshUserData } }>
            <div>
                { children }
            </div>
        </UserAuthContext.Provider>
    )
}

export default UserAuth;

export const UserAuthFinal = () =>
{
    return useContext(UserAuthContext)
}


const UserProviderAuth = () =>
{
    const [isUpdated, setIsUpdated] = useState(false);
    const [currentUser, setCurrentUser] = useState([]);

    const abortController = new AbortController()
    const signal = abortController.signal;

    const history = useHistory()

    useEffect(() =>
    {



        fetch(`${serverLink}/api/v1/user/single`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + auth?.isAuthenticated()
            }
        }).then(res => res.json())
            .then(data =>
            {

                setCurrentUser(data.data)
                auth.setRoles(data?.data?.roles, () => { })
            })


        // fetch(`${serverLink}/api/v1/user/cart/unique`, {
        //     method: "GET",
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': 'Bearer ' + auth?.isAuthenticated()
        //     }
        // }).then((res) => res.json())
        //     .then(data =>
        //     {
        //         if (data.status == false)
        //         {

        //             setCurrentCart(data.data)
        //         }
        //     })
    }, [auth.isAuthenticated()])



    // const userData = async ()=>{
    //     if(auth.isAuthenticated()!==false){

    //         if(!data.getUserByID.error){
    //             setCurrentUser(data.getUserByID.data)
    //         }
    //     }


    // }
    const updateData = () =>
    {
        setIsUpdated(true);
    }

    const loggedIn = () =>
    {
        if (auth.isAuthenticated() !== false)
        {
            return true;
        }
        return false;
    }

    const verify = () =>
    {
        console.log("inside")
        if (auth.isAuthenticated() !== false)
        {
            history.push("/")
        } else
        {
            history.push('/sign-in');
        }
    }

    const logout = () =>
    {
        auth.clearJWT(() =>
        {

        })

        history.push('/sign-in')
    }

    const refreshUserData = () =>
    {
        fetch(`${serverLink}/api/v1/user/single`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + auth?.isAuthenticated()
            }
        }).then(res => res.json())
            .then(data =>
            {

                setCurrentUser(data.data)
                auth.setRoles(data?.data?.roles, () => { })
            })
    }




    return {
        verify, logout, loggedIn, updateData, currentUser, setCurrentUser,
        refreshUserData
    }
}

