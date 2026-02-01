import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "../css/Registration.css"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  
  useEffect(() => {
    console.clear()
  }, [])

  const handleLogin = (e) => {
    e.preventDefault()

    const users = JSON.parse(localStorage.getItem("foodieUsers")) || []

    const user = users.find(
      (u) => u.email === email && u.password === password
    )

    if (!user) {
      setError("Invalid email or password")
      return
    }

    
    console.clear()

    // Save logged-in user
    localStorage.setItem("loggedInUser", JSON.stringify(user))

   
    console.log(" USER LOGGED IN (CURRENT)")
    console.table(user)

    setEmail("")
    setPassword("")
    setError("")

    navigate("/hero")
  }

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleLogin}>
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="error-text">{error}</p>}

        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login
