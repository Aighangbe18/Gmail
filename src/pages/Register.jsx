import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const navigate = useNavigate()

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:5000/api/auth/register', form)
      navigate('/login')
    } catch (err) {
      alert(err.response?.data?.error || 'Registration failed')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-900">
      <form onSubmit={handleSubmit} className="bg-zinc-800 p-8 rounded-xl shadow-xl w-full max-w-sm space-y-4">
        <h2 className="text-2xl font-semibold text-center">Create an Account</h2>
        <input name="name" placeholder="Name" onChange={handleChange} className="w-full px-4 py-2 rounded bg-zinc-700" />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} className="w-full px-4 py-2 rounded bg-zinc-700" />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} className="w-full px-4 py-2 rounded bg-zinc-700" />
        <button className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded font-semibold">Register</button>
        <p className="text-sm text-center">
          Already have an account? <a href="/login" className="text-blue-400 underline">Login</a>
        </p>
      </form>
    </div>
  )
}
