import Link from 'next/link'
import React from 'react'

type Props = {}

const Navbar = (props: Props) => {
  return (
      <div>
          <Link href={'/mytransactions'}>
            My Transactions
          </Link>
    </div>
  )
}

export default Navbar