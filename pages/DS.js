import styled from '@emotion/styled'

const Page = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #FFFFFF;
  display: flex;
  flex-direction: column;
`

const Header = styled.header`
  padding: 120px 80px 0;
  background: #FFFFFF;
`

const Title = styled.h1`
  font-family: 'Inter', sans-serif;
  font-size: 2rem;
  font-weight: 500;
  color: black;
  letter-spacing: -0.02em;
`

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: black;
  opacity: 0.2;
  margin: 1rem 0;
`

const Main = styled.main`
  padding: 0 80px;
  flex: 1;
  background: #FFFFFF;
`

const Text = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 1.125rem;
  line-height: 1.6;
  color: #333;
  max-width: 800px;
  margin-bottom: 500px;
`

const Box = styled.div`
  width: 100%;
  height: 400px;
  border: 1px solid black;
  margin-top: 120px;
  background: #FFFFFF;
`

const Footer = styled.footer`
  padding: 40px 80px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  background: #FFFFFF;
`

const DesignSystem = () => {
  return (
    <Page>
      <Header>
        <Title>A Design System For UPI</Title>
        <Divider />
      </Header>
      <Main>
        <Text>
          A comprehensive design system that unifies the visual language and interaction patterns across UPI applications. 
          This system provides a consistent, accessible, and scalable foundation for building digital products that serve 
          millions of users across India.
        </Text>
        <Box />
      </Main>
      <Footer>
        <Text style={{ fontSize: '0.875rem', color: '#666' }}>
          © 2024 UPI Design System. All rights reserved.
        </Text>
      </Footer>
    </Page>
  )
}

export default DesignSystem