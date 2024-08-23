import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


const ProtectRoutes =({children})=>{
    const user = useSelector((store) => store.auth.userInfo);

  console.log("ldkfjsdkhfusdhfuihsduifhds")
  console.log(user)


    return (
        <div>
            {!user ? children : <Navigate to='/home' />}
        </div>
    );

}

export default ProtectRoutes