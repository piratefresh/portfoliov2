import React, { Component } from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/layout'
import SEO from '../components/seo'
import StyledLink from '../components/StyledLink'

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
          keywords={[`blog`, `gatsby`, `javascript`, `react`]}
        />
        <Headline>
          Hey, I'm <span>Magnus</span> an aspiring web developer! Currently
          loving <span>React</span> and <span>Graphql</span>.
        </Headline>
        <Container>
          {data.allWordpressWpProjects.edges.map(({ node }) => (
            <Item key={node.slug}>
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
              {console.log(node.acf)}
              <div>
                <p>{node.acf.description}</p>
                <h4>{node.acf.tech}</h4>
                <h4>{node.acf.type}</h4>
              </div>
            </Item>
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
