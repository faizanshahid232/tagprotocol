import React, { useState, useEffect } from 'react'

const now = new Date()
const date_ = now.toUTCString()
function Timer() {
  const [count, setCount] = useState(date_)
  useEffect(() => {
    setTimeout(() => {
      setCount((date_) => date_)
    }, [count])
  })
  return <h1>I have rendered {count} times!</h1>
}
const AppHeaderDropdown = () => {
  return <div>{date_}</div>
}

export default AppHeaderDropdown
