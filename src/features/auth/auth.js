import Cookie from 'js-cookie'


const auth = {
    isAuthenticated ()
    {
        if (typeof window == 'undefined') { return false };

        if (Cookie.get('jwt'))
        {
            return JSON.parse(Cookie.get('jwt'))
        } else return false
    },
    setRoles (roles, cb)
    {

        if (typeof window !== 'undefined')
            if (!roles)
            {
                return console.error("Invalid data")
            }
        let filterRoles = roles?.map((item) =>
        {
            return {
                name: item?.name,
                permissions: item?.permissions
            }
        })
        const time = new Date();
        time.setDate(time.getDate() + 10);
        Cookie.set('roles', JSON.stringify(filterRoles),{expires:time});
        cb()

    },
    getRoles (){

        if (typeof window == 'undefined') { return [] };

        if (Cookie.get('roles'))
        {
            return JSON.parse(Cookie.get('roles'))
        } else return []
    },
    authenticate (jwt, cb)
    {
        if (typeof window !== 'undefined')
            if (!jwt)
            {
                return console.error("Invalid Login ID")
            }
        Cookie.set('jwt', JSON.stringify(jwt))
        cb()
    },
    clearJWT (cb)
    {
        if (typeof window !== 'undefined')
        {
            Cookie.remove('jwt')
        }
        cb()
        // signout().then((data)=>{
        //     document.cookie = "t=' expires=Thu,01 Jan 2030 00:00:00 UTC; path=/;"
        // })
    }
}

export default auth