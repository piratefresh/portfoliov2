import React, { Component } from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import Layout from '../components/layout'
import styled from 'styled-components'

import SEO from '../components/seo'

class PostTemplate extends Component {
  render() {
    const post = this.props.data.wordpressPost
    console.log(post)
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
        <PostImages>
          <img src={post.acf.image1} alt="" srcset="" />
          <img src={post.acf.image2} alt="" srcset="" />
          <img src={post.acf.image3} alt="" srcset="" />
        </PostImages>
      </Layout>
    )
  }
}

PostTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  edges: PropTypes.array,
}

const PostImages = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
`

export default PostTemplate

export const pageQuery = graphql`
  query currentPostQuery($id: String!) {
    wordpressPost(id: { eq: $id }) {
      title
      content
      acf {
        cloudinary
        featured_image_post
        image1
        image2
        image3
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
