import React from "react"
import { Link } from "gatsby"
import { Helmet } from "react-helmet"
import styled, { createGlobalStyle } from "styled-components"

import { rhythm, scale } from "../utils/typography"

const GlobalStyle = createGlobalStyle`
  html {
    height: 100%;
  }
  body {
    color: ${props => (props.theme === "purple" ? "purple" : "#161032")};
    height: 100%;
  }
  #___gatsby {
    height: 100%;
  }
  #gatsby-focus-wrapper {
    height: 100%;
  }
  a {
    color: #E06D06;
  }
  h1, h2, h3, h1 > a, h2 > a, h3 > a {
    font-family: 'Josefin Sans', sans-serif;
    color: #B26700;
  }
  p, a, footer {
    font-family: 'Roboto', sans-serif;
  }
  .photo-caption {
    font-family: 'Roboto', sans-serif;
    text-align: center;
    font-style: italic;
    font-size: 0.9rem;
    margin-top: -1rem;
    margin-bottom: 1rem;
  }
`

const Container = styled.div`
  min-height: 100%;
  margin-left: auto;
  margin-right: auto;
  max-width: ${rhythm(24)};
  padding: ${rhythm(1.5)} ${rhythm(3 / 4)};
  display: flex;
  flex-direction: column;
`

const Main = styled.header`
  flex: 1 0 auto;
`

const Footer = styled.footer`
  flex-shrink: 0;
`

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  let header

  if (location.pathname === rootPath) {
    header = (
      <h1
        style={{
          ...scale(1.5),
          marginBottom: rhythm(1.5),
          marginTop: 0,
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            textDecoration: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
        </Link>
      </h1>
    )
  } else {
    header = (
      <h3
        style={{
          marginTop: 0,
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            textDecoration: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
        </Link>
      </h3>
    )
  }
  return (
    <Container>
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css?family=Josefin+Sans:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i|Roboto&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <GlobalStyle theme="white" />
      <Main>
        <header>{header}</header>
        {children}
      </Main>
      <Footer>
        © {new Date().getFullYear()} Nikola Đuza. All Rights Reserved.
      </Footer>
    </Container>
  )
}

export default Layout
