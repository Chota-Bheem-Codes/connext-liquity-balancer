import styled from '@emotion/styled'
import Link from 'next/link'
import React from 'react'
import Sprinkle from '../../assets/sprinkle-removebg-preview.png';

type Props = {}

const MainLogo = styled.img`
  width: 100px;
`

const Wrapper = styled.div`
  display: flex;
`

const Navbar = (props: Props) => {
  return (
      <Wrapper>
          <MainLogo src={Sprinkle} />
          <Link href={'/mytransactions'}>
            My Transactions
          </Link>
    </Wrapper>
  )
}

export default Navbar