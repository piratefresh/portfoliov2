import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'

import Header from './header'
import Footer from './Footer'
import './layout.css'

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 6fr;
  grid-gap: 3%;
  flex: 1 0 auto;
  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <div id="outer-container">
        <Container>
          <Header siteTitle={data.site.siteMetadata.title} />
          <div
            id="page-wrap"
            style={{
              margin: `0 auto`,
              marginTop: '12%',
              maxWidth: 1200,
              padding: `0px 1.0875rem 1.45rem`,
              paddingTop: 0,
            }}
          >
            {children}
          </div>
        </Container>
        <Footer />
      </div>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
