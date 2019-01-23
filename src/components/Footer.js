import React from 'react'
import styled from 'styled-components'

const FooterStyle = styled.footer`
  display: flex;
  flex-shrink: 0;
  font-family: 'Sarabun', sans-serif;
  justify-content: space-evenly;
  align-items: center;
  background: #f3c325;
  margin: 0;
  margin-top: 10%;
  position: relative;
  p {
    color: #33202b;
  }
  @media (max-width: 700px) {
    p {
      font-size: 0.5rem;
    }
  }
`

const Footer = () => (
  <FooterStyle>
    <p>Magnus Nilsen</p>
    <p>(484)470-9045</p>
    <p>tug36870@temple.edu</p>
  </FooterStyle>
)

export default Footer
