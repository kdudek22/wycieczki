import {useState, useRef} from "react";
import {apiClient} from "../../services/ApiClient.tsx";
import userStore from "../../store/userStore.tsx";
import useUserStore from "../../store/userStore.tsx";


const Login = () => {
    const email = useRef(null);
    const password = useRef(null)

    const [loginError, setLoginError] = useState(false)
    const userStore = useUserStore()

    const submitLogin = async (e) => {
        e.preventDefault()
        setLoginError(false)

        const response = await apiClient.post("/api/login/", {email: email.current.value, password: password.current.value})

        if (!response.ok){
            setLoginError(true)
            return
        }
        const user_response = await requestForUserGroups()
    }

    const requestForUserGroups = async () => {
        const response = await apiClient.get("/api/user")
        console.log(response.data)
        return "x"
    }

    return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md m-1">
        <h2 className="text-2xl font-bold text-center">Wakacje.pl</h2>
        <form  onSubmit={submitLogin} className="space-y-4 py-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
            <input type="text" className={`bg-gray-50 border  text-sm rounded-lg  block w-full p-2.5 ${loginError? 'border-red-600 text-red-600': 'border-gray-300 text-gray-900'}`} placeholder="example@example.com" required ref={email} />
          </div>
          <div>
             <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
             <input ref={password} type="password" className={`bg-gray-50 border  text-sm rounded-lg  block w-full p-2.5 ${loginError? 'border-red-600 text-red-600': 'border-gray-300 text-gray-900'}`} placeholder="•••••••••" required />
          </div>
            {loginError && (<p className="text-red-600">Username or password incorrect</p>)}
          <div className="flex justify-center">
              <button className="bg-green-500 py-1 px-5 rounded-xl hover:bg-green-600">Login</button>
          </div>
        </form>
          <p>Dont have an account? <a href="/register" className="text-green-500 underline">Register</a></p>
      </div>
    </div>
    );
};

export default Login;