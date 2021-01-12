import React, { useState } from "react"
import { Redirect } from "react-router-dom"

import { 
  Form, Button
} from 'react-bootstrap';

function LoginForm({ authenticated, login, location }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleClick = () => {
    try {
      login({ email, password })
    } catch (e) {
      alert("Failed to login")
      setEmail("")
      setPassword("")
    }
  }

  const { from } = location.state || { from: { pathname: "/" } }
  if (authenticated) return <Redirect to={from} />

  return (
  
  <div className="LoginForm">
    <h1> Login </h1>
      <Form>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control 
        value={email} 
        onChange={({ target: { value } }) => setEmail(value)}
        type="email" 
        placeholder="email"   
        />

        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control 
        value={password}
        onChange={({ target: { value } }) => setPassword(value)}
        type="password"
        placeholder="password"
        />

      </Form.Group>
      <Form.Group controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button onClick={handleClick} variant="primary">
        Login
      </Button>
      </Form>
  </div>

  )
}

export default LoginForm