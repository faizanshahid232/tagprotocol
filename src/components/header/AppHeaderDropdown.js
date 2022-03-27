import React, { useState, useEffect } from 'react'

const now = new Date()
const date_ = now.toUTCString()
function Timer() {
  const [dateState, setDateState] = useState(new Date().toUTCString())
  useEffect(() => {
    setInterval(() => setDateState(new Date().toUTCString()), 100)
  }, [])
  return (
    <p>
      {dateState.toLocaleString('', {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
      })}
    </p>
  )
}
const AppHeaderDropdown = () => {
  return (
    <>
      <div>
        <Timer></Timer>
      </div>
    </>
  )
}

export default AppHeaderDropdown
