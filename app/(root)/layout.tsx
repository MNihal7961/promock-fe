import React, { ReactNode } from 'react'

interface RootLayoutProps {
    children: ReactNode
}
const RootLayout: React.FC<RootLayoutProps> = ({children}) => {
  return (
    <div>{children}</div>
  )
}

export default RootLayout