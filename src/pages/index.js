import React, { Component, useState, useRef } from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import { animated, useSpring } from 'react-spring/hooks'

import Layout from '../components/layout'
import SEO from '../components/seo'
import StyledLink from '../components/StyledLink'
const GithubLogo =
  'https://res.cloudinary.com/da91pbpmj/image/upload/v1547619060/GitHub_Logo.png'

const Headline = styled.h1`
  display: block;
  color: #33202b;
  justify-content: center;
  align-content: center;
  font-family: 'Sarabun', sans-serif;
  span {
    color: #f3c325;
  }
`
const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-gap: 2%;
  @media (max-width: 700px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
  }
`
const GithubImg = styled.img`
  height: 40px;
`
const Item = styled.div`
  display: flex;
  flex-direction: column;
  img {
    height: 40vh;
    object-fit: cover;
  }
  p {
    font-size: 0.7rem;
    color: #616161;
    padding: 0;
    margin: 0;
  }
  h3 {
    text-transform: uppercase;
  }
  h4 {
    color: #33202b;
    padding: 0;
    margin: 1% 0;
  }
`

class IndexPage extends Component {
  render() {
    const data = this.props.data

    return (
      <Layout>
        <SEO
          title="All posts"
          keywords={[
            `portfolio`,
            `gatsby`,
            `javascript`,
            `react`,
            'web dev',
            'magnus',
            'nilsen',
          ]}
        />
        <Headline>
          Hey, I'm <span>Magnus</span> an aspiring web developer! Currently
          loving <span>React</span> and <span>Graphql</span>.
        </Headline>
        <a href="https://github.com/piratefresh/">
          <GithubImg src={GithubLogo} alt="github link" srcset="" />
        </a>
        <Container>
          {data.allWordpressWpProjects.edges.map(({ node }) => (
            <Card key={node.slug}>
              <Item>
                <StyledLink
                  to={'projects/' + node.slug}
                  css={{ textDecoration: `none` }}
                >
                  <h3>{node.title}</h3>
                </StyledLink>
                <StyledLink
                  to={'projects/' + node.slug}
                  css={{ textDecoration: `none` }}
                >
                  <img
                    src={node.acf.cloudinary}
                    alt={node.title + 'feature image'}
                  />
                </StyledLink>
                <div>
                  <p>{node.acf.description}</p>
                  <h4>{node.acf.tech}</h4>
                  <h4>{node.acf.type}</h4>
                </div>
              </Item>
            </Card>
          ))}
        </Container>
      </Layout>
    )
  }
}

export default IndexPage

// Set here the ID of the home page.
export const pageQuery = graphql`
  query {
    allWordpressPage {
      edges {
        node {
          id
          title
          excerpt
          slug
          date(formatString: "MMMM DD, YYYY")
        }
      }
    }
    allWordpressPost(sort: { fields: [date] }) {
      edges {
        node {
          title
          excerpt
          slug
        }
      }
    }
    allWordpressWpProjects(sort: { fields: [date], order: DESC }) {
      edges {
        node {
          id
          title
          excerpt
          slug
          acf {
            cloudinary
            tech
            description
          }
        }
      }
    }
  }
`

function Card({ children }) {
  // ref to get card elements offsett and dimensions
  const ref = useRef(null)

  // Keep track of whether card is hovered so we can increment ...
  // ... zIndex to ensure it shows up above other cards when animation causes overlap.
  const [isHovered, setHovered] = useState(false)

  // The useSpring hook
  const [props, set] = useSpring(() => ({
    // Array containing [rotateX, rotateY, and scale] values.
    // We store under a single key (xys) instead of separate keys ...
    // ... so that we can use animatedProps.xys.interpolate() to ...
    // ... easily generate the css transform value below.
    xys: [0, 0, 1],
    // Setup physics
    config: { mass: 5, tension: 350, friction: 40 },
  }))

  return (
    <animated.div
      ref={ref}
      className="card"
      onMouseEnter={() => setHovered(true)}
      onMouseMove={({ clientX, clientY }) => {
        // Get mouse x position within card
        const x =
          clientX -
          (ref.current.offsetLeft -
            (window.scrollX || window.pageXOffset || document.body.scrollLeft))

        // Get mouse y position within card
        const y =
          clientY -
          (ref.current.offsetTop -
            (window.scrollY || window.pageYOffset || document.body.scrollTop))

        // Set animated values based on mouse position and card dimensions
        const dampen = 50 // Lower the number the less rotation

        const xys = [
          -(y - ref.current.clientHeight / 2) / dampen, // rotateX
          (x - ref.current.clientWidth / 2) / dampen, // rotateY
          1.07, // Scale
        ]
        // Update values to animate to
        set({ xys: xys })
      }}
      onMouseLeave={() => {
        setHovered(false)
        // Set xys back to original
        set({ xys: [0, 0, 1] })
      }}
      style={{
        // If hovered we want it to overlap other cards when it scales up
        zIndex: isHovered ? 2 : 1,
        // Interpolate function to handle css changes
        transform: props.xys.interpolate(
          (x, y, s) =>
            `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`
        ),
      }}
    >
      {children}
    </animated.div>
  )
}
