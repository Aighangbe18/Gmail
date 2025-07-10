import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password })
      login(res.data.user)
      navigate('/inbox')
    } catch (err) {
      alert('Login failed: ' + err.response?.data?.error || err.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-900">
      <form onSubmit={handleLogin} className="bg-zinc-800 p-8 rounded-xl shadow-xl w-full max-w-sm space-y-4">
        <h2 className="text-2xl font-semibold text-center">Sign in to Mail</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 rounded bg-zinc-700 focus:outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 rounded bg-zinc-700 focus:outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded font-semibold">
          Login
        </button>
        <p className="text-sm text-center">
          Don’t have an account? <a href="/register" className="text-blue-400 underline">Register</a>
        </p>
      </form>
    </div>
  )
}
