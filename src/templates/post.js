import React, { Component } from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import Layout from '../components/layout'

import SEO from '../components/seo'

class PostTemplate extends Component {
  render() {
    const post = this.props.data.wordpressPost

    return (
      <Layout>
        <SEO
          title={post.title}
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
        <h1 dangerouslySetInnerHTML={{ __html: post.title }} />
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </Layout>
    )
  }
}

PostTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  edges: PropTypes.array,
}

export default PostTemplate

export const pageQuery = graphql`
  query currentPostQuery($id: String!) {
    wordpressPost(id: { eq: $id }) {
      title
      content
      acf {
        cloudinary
      }
    }
    site {
      siteMetadata {
        title
        subtitle
      }
    }
  }
`
