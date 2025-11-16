import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Signup() {
  const { signup } = useAuth()
  const nav = useNavigate()

  const [email, setEmail] = useState('')
  const [pw, setPw] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      await signup(email, pw)
      nav('/search')
    } catch (err) {
      setError(err.message)
    }

    setLoading(false)
  }

  return (
    <form onSubmit={submit} className="p-4 flex flex-col gap-2">
      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        placeholder='email'
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        placeholder='password'
        type='password'
        value={pw}
        onChange={e => setPw(e.target.value)}
      />

      <button disabled={loading}>
        {loading ? "Creating account..." : "Sign Up"}
      </button>
    </form>
  )
}
