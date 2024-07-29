import {useEffect, useState} from 'react';
import {apiClient} from "../../services/ApiClient.tsx";

function Register() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    password2: '',
  });
  const [passwordsDoNotMatch, setPasswordsDoNotMatch] = useState(false)

  const [canRegister, setCanRegister] = useState(false)

    useEffect(() => {
        !formData["email"] || !formData["password"] || !formData["password2"] || passwordsDoNotMatch ?
            setCanRegister(false) : setCanRegister(true)

    }, [formData, passwordsDoNotMatch]);


  const handleChange = (e) => {
    const data = {...formData, [e.target.name]: e.target.value}
    if(data["password"] && data['password2'] && data["password"] != data['password2']){
        setPasswordsDoNotMatch(true)
    }
    else{
        setPasswordsDoNotMatch(false)
    }
    setFormData(data)

  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await apiClient.post("/api/register/", {email: formData["email"], password: formData["password"]})

    console.log(response)

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md m-1">
        <h2 className="text-2xl font-bold text-center">Wakacje.pl</h2>
        <form onSubmit={handleSubmit} className="space-y-4 py-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
            <input name="email" type="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="example@example.com" required onChange={handleChange}/>
          </div>
          <div>
             <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
             <input name="password" type="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required onChange={handleChange}/>
          </div>
          <div>
             <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Repeat password</label>
             <input name="password2" type="password" className={`bg-gray-50 border ${passwordsDoNotMatch? 'text-red-600 border-red-600':'border-gray-300 text-gray-900'}  text-sm rounded-lg block w-full p-2.5`} placeholder="•••••••••" required onChange={handleChange}/>
              {passwordsDoNotMatch && <p className="text-red-600">Passwords do not match</p>}
          </div>
          <div className="flex justify-center">
              <button className="bg-green-500 text-white py-1 px-5 rounded-xl hover:bg-green-700 disabled:bg-gray-300 disabled:opacity-50" disabled={!canRegister}>Register</button>
          </div>
        </form>
          <p>Already have an account? <a href="/login" className="text-green-500 underline">Login</a></p>
      </div>
    </div>
  );
}

export default Register;