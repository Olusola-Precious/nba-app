import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({
    user,
    component:Comp,
    ...rest
})=>{
    return<Route 
        {...rest}
        component={(props)=>{
            return rest.restricted ? 
            (
                user ? 
                <Redirect to="/dashboard"/>
                :
                <Comp user={user} {...props} />
            )
            :
            <Comp user={user} {...props}/>
        }}
    />
}

export default PublicRoute;