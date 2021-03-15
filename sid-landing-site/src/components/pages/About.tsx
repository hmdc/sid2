import React from 'react'
import { UrlConstants } from '../../utils/UrlUtils'

const About = () => {
  return (
    <div id="about">
      <div className="description">
        <h2 className="content-hide">About</h2>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae voluptatum quas, quo deleniti neque sed nisi unde, quisquam, minima maiores soluta repellat eaque aliquam vel dolorum necessitatibus eius corrupti distinctio. Corporis architecto earum doloremque quia blanditiis minus voluptas accusamus at.</p>
      </div>

      <section>
        <h3 className="section-title">About Section 1</h3>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae voluptatum quas, quo deleniti neque sed nisi unde, quisquam, minima maiores soluta repellat eaque aliquam vel dolorum necessitatibus eius corrupti distinctio. Corporis architecto earum doloremque quia blanditiis minus voluptas accusamus at.</p>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae voluptatum quas, quo deleniti neque sed nisi unde, quisquam, minima maiores soluta repellat eaque aliquam vel dolorum necessitatibus eius corrupti distinctio. Corporis architecto earum doloremque quia blanditiis minus voluptas accusamus at.</p>
        <a className="learn-more" href={UrlConstants.URL_ABOUT_SECTION1}>Learn more</a>
      </section>

      <section>
        <h3 className="section-title">About Section 1</h3>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae voluptatum quas, quo deleniti neque sed nisi unde, quisquam, minima maiores soluta repellat eaque aliquam vel dolorum necessitatibus eius corrupti distinctio. Corporis architecto earum doloremque quia blanditiis minus voluptas accusamus at.</p>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae voluptatum quas, quo deleniti neque sed nisi unde, quisquam, minima maiores soluta repellat eaque aliquam vel dolorum necessitatibus eius corrupti distinctio. Corporis architecto earum doloremque quia blanditiis minus voluptas accusamus at.</p>
        <a className="learn-more" href={UrlConstants.URL_ABOUT_SECTION2}>Learn more</a>
      </section>

      <section>
        <h3 className="section-title">About Section 1</h3>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae voluptatum quas, quo deleniti neque sed nisi unde, quisquam, minima maiores soluta repellat eaque aliquam vel dolorum necessitatibus eius corrupti distinctio. Corporis architecto earum doloremque quia blanditiis minus voluptas accusamus at.</p>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae voluptatum quas, quo deleniti neque sed nisi unde, quisquam, minima maiores soluta repellat eaque aliquam vel dolorum necessitatibus eius corrupti distinctio. Corporis architecto earum doloremque quia blanditiis minus voluptas accusamus at.</p>
        <a className="learn-more" href={UrlConstants.URL_ABOUT_SECTION3}>Learn more</a>
      </section>
    </div>
  )
}

export default About
