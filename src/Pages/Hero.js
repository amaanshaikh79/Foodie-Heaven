import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Hero = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"))

    if (!user) {
      navigate("/login") // protection
    } else {
      console.log(" LOGGED IN USER (HERO PAGE)")
      console.table(user)
    }
  }, [navigate])

  return (
    <div style={{ padding: "40px", color: "white" }}>
      <h1>Welcome Back 🍔</h1>
      <h2>Hero Dashboard</h2>
    </div>
  )
}

export default Hero
