import { Button } from "../components/ui/button"
import logoLogin from "../assets/logo-placeholder-image.png"
import actualLogo from "../assets/logo-placeholder-image.png"

const Login= ()=>{
    const handleLogin = ()=>{
        console.log("Login Requested");
    }
    return(
        <div className="flex flex-col   justify-center items-center h-screen w-screen p-20 " >
            <h1 className="mb-8">Login</h1>
            <div className=" items-center bg-black flex justify-center flex-row h-[26rem] w-[90%] rounded-3xl  ">
                <img src={logoLogin} className=" h-full w-1/2 object-cover border border-white rounded-l-3xl " />
                <div className="  border border-white rounded-r-3xl  h-full w-1/2 flex flex-col justify-center items-center  ">
                <img src={actualLogo} className=" h-1/4 w-full object-contain mb-16" />
                <Button type = "button" className=" w-1/2  " onClick={handleLogin} >Login with MetaMask</Button>
                </div>
            </div>
        </div>
    )
}

export default Login;