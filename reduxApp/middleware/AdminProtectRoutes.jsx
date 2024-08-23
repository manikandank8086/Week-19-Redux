import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


const AdminProtectRoutes =({children})=>{
    const admin = useSelector((store) => store.auth.adminInfo);

  console.log("protector admindfdkfdsjfjdsfsdkjfkldsjfsjfkljdskfj")
  console.log(admin)


    return (
        <div>
            {!admin ? children : <Navigate to='/adminHome' />}

        </div>
    );

}




export default AdminProtectRoutes