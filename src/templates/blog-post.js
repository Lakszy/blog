import React from "react"
import { Link, graphql } from "gatsby"
import { kebabCase } from "lodash"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import SubscribeForm from "../components/subscribe-form"
import { rhythm, scale } from "../utils/typography"
import ViewCounter from "../components/view-counter"

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const { previous, next } = pageContext
  const { canonical, canonicalName, date, slug, tags } = post.frontmatter
  const { timeToRead } = post

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
        canonical={canonical}
        coverImage={post.frontmatter.coverImage.publicURL}
        blogOgImage={post.frontmatter.blogOgImage.publicURL}
      />
      <article>
        <header>
          <h1
            style={{
              marginTop: rhythm(1),
              marginBottom: 0,
            }}
          >
            {post.frontmatter.title}
          </h1>
          <p
            style={{
              ...scale(-1 / 5),
              display: `block`,
              marginBottom: rhythm(1),
              color: `#b3b3b3`,
            }}
          >
            {date} | <ViewCounter hideText slug={slug} />
            about {timeToRead} {timeToRead === 1 ? "minute" : "minutes"} to read{" "}
          </p>
        </header>
        <section dangerouslySetInnerHTML={{ __html: post.html }} />

        {canonical && (
          <>
            <hr
              style={{
                marginBottom: rhythm(1),
              }}
            />
            <section style={{ marginLeft: rhythm(1) }}>
              <p>
                <i>
                  This article was originally posted on{" "}
                  <a href={canonical}>{canonicalName}</a>
                </i>
              </p>
            </section>
          </>
        )}
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />

        <p className="tags" style={{ display: `block` }}>
          Tagged as:{" "}
          {tags.map((tag) => (
            <span key={tag}>
              <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
            </span>
          ))}
        </p>

        <footer>
          <Bio />
        </footer>

        <SubscribeForm />
      </article>

      <nav>
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        canonical
        canonicalName
        coverImage {
          publicURL
        }
        blogOgImage {
          publicURL
        }
        slug
        tags
      }
      timeToRead
    }
  }
`