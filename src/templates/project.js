import React, { Component } from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import SEO from '../components/seo'
import Layout from '../components/layout'
const GithubLogo =
  'https://res.cloudinary.com/da91pbpmj/image/upload/v1547619060/GitHub_Logo.png'

const PageLayout = styled.div`
  .item {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 5%;
    margin: 5% 0;
    @media (max-width: 700px) {
      grid-template-columns: 1fr;
      grid-template-rows: 1fr;
    }
  }
  p {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
  }
`
const Buttons = styled.div`
  img {
    height: 32px;
    width: 32px;
  }
  button {
    background: #3498db;
    width: 100px;
    padding: 4px 0;
  }
`

class ProjectTemplate extends Component {
  render() {
    const project = this.props.data.wordpressWpProjects

    return (
      <Layout>
        <SEO
          title="All posts"
          keywords={[`blog`, `gatsby`, `javascript`, `react`]}
        />
        <h1 dangerouslySetInnerHTML={{ __html: project.title }} />
        <h4>Tech: {project.acf.tech}</h4>
        <Buttons>
          <a href={project.acf.githublink}>
            <img className="githubLogo" src={GithubLogo} alt="Github Link" />
          </a>
          <button>
            <a href={project.acf.livelink} />
          </button>
        </Buttons>

        <img src={project.acf.cloudinary} alt="test" />
        <PageLayout>
          <div className="item">
            <img src={project.acf.img1} alt="" />
            <p>{project.acf.desc1}</p>
          </div>

          <div className="item">
            <p>{project.acf.desc2}</p>
            <img src={project.acf.img2} alt="" />
          </div>

          <div className="item">
            <img src={project.acf.img3} alt="" />
            <p>{project.acf.desc3}</p>
          </div>
        </PageLayout>
      </Layout>
    )
  }
}

ProjectTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  edges: PropTypes.array,
}

export default ProjectTemplate

export const projectQuery = graphql`
  query currentProjectQuery($id: String!) {
    wordpressWpProjects(id: { eq: $id }) {
      title
      content
      acf {
        cloudinary
        img1
        img2
        img3
        desc1
        desc2
        desc3
        tech
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
