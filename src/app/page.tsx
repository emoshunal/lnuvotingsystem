
'use client'

import Link from 'next/link'

const Page = () => {
  return (
    <div>
      <h1>Welcome to CICS powered voting system.</h1>
      <p>Login to continue.</p>
       <Link href='/auth/login'>Login</Link>
    </div>

  )
}

export default Page