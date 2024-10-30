import React, { createContext, useState } from 'react'

export const addProjResContext = createContext()
export const editProjResContext = createContext()
export const authContext = createContext()

function Contextapi({ children }) {

  const [addResponse, setAddResponse] = useState("")
  const [editResponse, setEditResponse] = useState("")
  const [authContextStatus, setAuthContextStatus] = useState(false)

  return (
    <>
      <addProjResContext.Provider value={{ addResponse, setAddResponse }}>
        <editProjResContext.Provider value={{ editResponse, setEditResponse }}>
          <authContext.Provider value={{ authContextStatus, setAuthContextStatus }}>
            {children}
          </authContext.Provider>
        </editProjResContext.Provider>
      </addProjResContext.Provider>
    </>
  )
}

export default Contextapi