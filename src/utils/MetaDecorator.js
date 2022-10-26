import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";

// const hostName = "https://mybdga.com";

const MetaDecorator = ({ title, description, imageUrl, imageAlt }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />

      <meta property="og:title" content={title} />
      <meta property="og:type" content="website" />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      {/* <meta
        property="og:url"
        content={hostName + window.location.pathname + window.location.search}
      /> */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image:alt" content={imageAlt} />
    </Helmet>
  );
};

MetaDecorator.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  imageUrl: PropTypes.string,
  imageAlt: PropTypes.string,
};

export default MetaDecorator;
