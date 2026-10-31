import Link from 'next/link'
import Image from 'next/image'
import styled from '@emotion/styled'

const LogoBox = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0;
  margin-top: -6px;
  margin-bottom: 6px;

  img {
    transition: opacity 0.2s ease, transform 0.2s ease;
  }

  &:hover img {
    opacity: 0.75;
    transform: scale(1.03);
  }
`

const Logo = () => {
  const logoImg = '/muk.svg'

  return (
    <Link href="/" scroll={false}>
      <LogoBox>
        <Image
          src={logoImg}
          width={110}
          height={59}
          alt="Mukil"
          priority
          style={{ width: '110px', height: 'auto', display: 'block' }}
        />
      </LogoBox>
    </Link>
  )
}

export default Logo
