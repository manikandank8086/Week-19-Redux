import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Store from "../src/store/store";


const AdminProtect =({children})=>{
    const admin = useSelector((store) => store.auth.adminInfo);

  console.log("protector admindfdkfdsjfjdsfsdkjfkldsjfsjfkljdskfj")
  console.log(admin)


    return (
        <div>
            {admin ? children : <Navigate to='/adminLogin' />}

        </div>
    );

}




export default AdminProtect