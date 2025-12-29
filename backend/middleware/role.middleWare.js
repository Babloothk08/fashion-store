export const confirmRoles = (...allowedRoles)=> {
    return (req, res, next) => {
        if(!req.user){
            return res.status(401).json({message : "Unauthorized User"}) // if not loggedIn
        }
        if(!allowedRoles.includes(req.user.role)){
           return res.status(403).json({
            message : "Access Denied, User don't have permission"
        });
        }
        next();
    };
};