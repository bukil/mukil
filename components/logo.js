import Link from 'next/link'
import Image from 'next/image'
import {useColorModeValue } from '@chakra-ui/react'
import styled from '@emotion/styled'

const LogoBox = styled.span`
  font-weight: bold;
  font-size: 18px;
  display: inline-flex;
  align-items: center;
  height: 30px;
  line-height: 20px;
  padding: 10px;

  img {
    transition: 250ms ease;
    transform: rotate(-10deg);
  }

  &:hover img {
    transform: rotate(0deg);
  }
`

const Logo = () => {
  const footPrintImg = `/images/logo${useColorModeValue('', '-dark')}.png`

  return (
    <Link href="/" scroll={false}>
      
        <LogoBox>
      <Image src={footPrintImg} width={100} height={40} alt="logo" priority/>
          {/* <Text
            color={useColorModeValue('gray.800', 'whiteAlpha.900')}
            fontFamily='M PLUS Rounded 1c", sans-serif'
            fontWeight="bold"
            ml={3}
          >
            MUKIL KUMAR
          </Text> */}
        </LogoBox>
      
    </Link>
  )
}

export default Logo
