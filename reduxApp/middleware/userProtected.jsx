import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


const UserProtected =({children})=>{
    const user = useSelector((store) => store.auth.userInfo);



    return (
        <div>
            {user ? children : <Navigate to='/signup'/>}
        </div>
    );

}

export default UserProtected