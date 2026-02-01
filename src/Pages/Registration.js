import React, { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import "../css/Registration.css"

const Registration = () => {
  const navigate = useNavigate()

  // Form states
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState({})

  // Form validation
  const validateForm = () => {
    let errors = {}
    const emailRegex = /\S+@\S+\.\S+/

    if (!fullName.trim()) {
      errors.fullName = "Full name is required"
    }

    if (!email.trim()) {
      errors.email = "Email is required"
    } else if (!emailRegex.test(email)) {
      errors.email = "Enter a valid email"
    }

    if (!password) {
      errors.password = "Password is required"
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters"
    }

    if (!confirmPassword) {
      errors.confirmPassword = "Confirm password is required"
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match"
    }

    setError(errors)
    return Object.keys(errors).length === 0
  }

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validateForm()) return

    const newUser = {
      fullName,
      email,
      password
    }

    const users =
      JSON.parse(localStorage.getItem("foodieUsers")) || []

    // Duplicate email check
    const alreadyExists = users.some(
      (user) => user.email === email
    )

    if (alreadyExists) {
      setError({ email: "Email already registered" })
      return
    }

    // Save user
    users.push(newUser)
    localStorage.setItem("foodieUsers", JSON.stringify(users))

    // Console logs (for learning/debug)
    console.log(" USER REGISTERED SUCCESSFULLY")
    console.table(newUser)
    console.log(" ALL REGISTERED USERS:", users)

    // Reset form
    setFullName("")
    setEmail("")
    setPassword("")
    setConfirmPassword("")
    setError({})

    // 👉 Redirect to LOGIN page
    navigate("/login")
  }

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Create Account</h2>

        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        {error.fullName && (
          <p className="error-text">{error.fullName}</p>
        )}

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {error.email && (
          <p className="error-text">{error.email}</p>
        )}

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error.password && (
          <p className="error-text">{error.password}</p>
        )}

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {error.confirmPassword && (
          <p className="error-text">{error.confirmPassword}</p>
        )}

        <button type="submit">Sign Up</button>

        <p className="login-link">
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  )
}

export default Registration
