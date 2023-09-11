import React, { useState } from 'react'

export default function Parent() {

    const [response, setresponse] = useState(second)
    
  return (
    <div><PopUp setresponse={setresponse} /></div>
  )
}
