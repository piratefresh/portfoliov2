import React, { Component } from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'

class IndexPage extends Component {
  render() {
    const data = this.props.data

    return (
      <Layout>
        <SEO
          title="All posts"
          keywords={[`blog`, `gatsby`, `javascript`, `react`]}
        />
        <div>
          <h1>Pages</h1>
          {data.allWordpressPage.edges.map(({ node }) => (
            <div key={node.slug}>
              <Link to={node.slug} css={{ textDecoration: `none` }}>
                <h3>{node.title}</h3>
              </Link>
              <div dangerouslySetInnerHTML={{ __html: node.excerpt }} />
              <span>{node.date}</span>
            </div>
          ))}
        </div>
        <hr />
        <h1>Posts</h1>
        {data.allWordpressPost.edges.map(({ node }) => (
          <div key={node.slug}>
            <Link to={node.slug} css={{ textDecoration: `none` }}>
              <h3>{node.title}</h3>
            </Link>
            <div dangerouslySetInnerHTML={{ __html: node.excerpt }} />
          </div>
        ))}
        <hr />
        <h1>Projects</h1>
        {data.allWordpressWpProjects.edges.map(({ node }) => (
          <div key={node.slug}>
            <Link to={'projects/' + node.slug} css={{ textDecoration: `none` }}>
              <h3>{node.title}</h3>
            </Link>
            <div dangerouslySetInnerHTML={{ __html: node.excerpt }} />
            <img src={node.acf.cloudinary} alt={node.title + 'feature image'} />
          </div>
        ))}
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
    allWordpressWpProjects {
      edges {
        node {
          id
          title
          excerpt
          slug
          acf {
            cloudinary
          }
        }
      }
    }
  }
`
