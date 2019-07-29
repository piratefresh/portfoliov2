import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import { Link } from 'gatsby'
import styled from 'styled-components'

const BlogPage = props => {
  const data = props.data
  console.log(data)
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
      {data.allWordpressPost.edges.map(post => (
        <BlogWrapper>
          <h2>{post.node.title}</h2>
          <img
            src={post.node.acf.featured_image_post}
            alt=""
            srcset=""
            className="featured-image"
          />
          <div dangerouslySetInnerHTML={{ __html: post.node.excerpt }} />
          <Link className="readmore-link" to={post.node.acf.posturl}>
            Read More
          </Link>
        </BlogWrapper>
      ))}
    </Layout>
  )
}

const BlogWrapper = styled.div`
  li {
    list-style: none;
  }
  .featured-image {
    width: 100%;
    height: 300px;
    object-fit: cover;
  }
  readmore-link {
    margin-left: auto;
  }
`

export default BlogPage

// Set here the ID of the home page.
export const pageQuery = graphql`
  query {
    allWordpressPost {
      edges {
        node {
          id
          content
          excerpt
          title
          acf {
            posturl
            image5
            image4
            image3
            image2
            image1
            featured_image_post
          }
        }
      }
    }
  }
`
