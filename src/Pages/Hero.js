import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getProfile, isLoggedIn, getStoredUser } from "../utils/api.js"

const Hero = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/login")
      return
    }

    // Show stored user data instantly, then verify with server
    const storedUser = getStoredUser()
    if (storedUser) {
      setUser(storedUser)
    }

    getProfile()
      .then((data) => {
        setUser(data.user)
      })
      .catch(() => {
        navigate("/login")
      })
  }, [navigate])

  return (
    <div style={{ padding: "40px", color: "white" }}>
      <h1>Welcome Back 🍔</h1>
      <h2>
        {user ? `Hello, ${user.fullName}!` : "Hero Dashboard"}
      </h2>
      {user && (
        <p style={{ opacity: 0.7, marginTop: "10px" }}>
          Logged in as {user.email}
        </p>
      )}
    </div>
  )
}

export default Hero
