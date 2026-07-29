import React, { useState } from 'react'

const NewPassword = () => {
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: wire API call to update the password
    console.log('New password submitted:', password)
  }

  return (
    <div style={{ maxWidth: 420, margin: '48px auto', padding: 24 }}>
      <h2>Set New Password</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 12 }}>
          <input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: 8, fontSize: 16 }}
          />
        </div>
        <button type="submit" disabled={!password} style={{ padding: '8px 16px', fontSize: 16 }}>
          Set Password
        </button>
      </form>
    </div>
  )
}

export default NewPassword;
