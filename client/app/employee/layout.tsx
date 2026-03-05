import React from 'react'
import EmployeeNavbar from '../_components/EmployeeNavbar'

const layout = ({children}: {children : React.ReactNode}) => {
  return <>
  {/* <div>Employee Navbar</div> */}
  <EmployeeNavbar/>
  {children}
  </>
}

export default layout