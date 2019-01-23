import PropTypes from 'prop-types'
import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import MediaQuery from 'react-responsive'

import NavLink from './NavLink'
import StyledLink from './StyledLink'
import { elastic as Menu } from 'react-burger-menu'
import './Navbar.css'

const ContainerNav = styled.header`
  display: flex;
  color: #000;
`
const Nav = styled.ul`
  font-family: 'Sarabun', sans-serif;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: transparent;
  margin: 0;
  padding: 0 5%;
  color: #33202b;
  @media (max-width: 1200px) {
    font-size: 1rem;
    padding: 0;
  }
  a {
    color: #33202b;
    text-decoration: none;
  }
`
const Logo = styled.h1`
  font-size: 4rem;
  margin-left: 2rem;
  position: relative;
  z-index: 2;

  @media (max-width: 1200px) {
    font-size: 1rem;
  }
`
class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      menuOpen: false,
    }
  }
  showSettings(event) {
    event.preventDefault()
  }

  handleStateChange(state) {
    this.setState({ menuOpen: state.isOpen })
  }

  closeMenu() {
    this.setState({ menuOpen: false })
  }

  toggleMenu() {
    this.setState({ menuOpen: !this.state.menuOpen })
  }
  render() {
    return (
      <StaticQuery
        query={graphql`
          query {
            allWordpressWpProjects {
              edges {
                node {
                  id
                  title
                  slug
                }
              }
            }
          }
        `}
        render={data => (
          <>
            <ContainerNav>
              <MediaQuery query="(min-width: 1200px)">
                <Nav>
                  <Logo>
                    <StyledLink to="/">{this.props.siteTitle}</StyledLink>
                  </Logo>
                  <a href="https://github.com/piratefresh/">Github Profile</a>
                  {data.allWordpressWpProjects.edges.map(link => {
                    return (
                      <NavLink
                        to={`projects/${link.node.slug}`}
                        key={link.node.id}
                      >
                        {link.node.title}
                      </NavLink>
                    )
                  })}
                </Nav>
              </MediaQuery>
              <MediaQuery query="(max-width: 1200px)">
                <Nav>
                  <Menu
                    pageWrapId={'page-wrap'}
                    outerContainerId={'outer-container'}
                    isOpen={this.state.menuOpen}
                    left
                  >
                    <Logo>
                      <StyledLink to="/">{this.props.siteTitle}</StyledLink>
                    </Logo>
                    <a href="https://github.com/piratefresh/">Github Profile</a>
                    {data.allWordpressWpProjects.edges.map(link => {
                      return (
                        <NavLink
                          to={`projects/${link.node.slug}`}
                          key={link.node.id}
                        >
                          {link.node.title}
                        </NavLink>
                      )
                    })}
                  </Menu>
                </Nav>
              </MediaQuery>
            </ContainerNav>
          </>
        )}
      />
    )
  }
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
