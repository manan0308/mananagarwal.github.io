import React from "react";
import PropTypes from "prop-types";

export default function HTML(props) {
  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-182376999-1"></script>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-TLRJBEVB1S"></script>
        <script>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'UA-182376999-1', {
              send_page_view: true,
              cookie_expires: 2592000,
              cookie_prefix: 'my_ga_cookie',
              cookie_domain: 'mananagarwal.in',
              cookie_update: true,
              cookie_flags: 'SameSite=None;Secure',
            });

            gtag('config', 'G-TLRJBEVB1S', {
              send_page_view: true,
              cookie_expires: 2592000,
              cookie_prefix: 'my_ga_cookie',
              cookie_domain: 'mananagarwal.in',
              cookie_update: true,
              cookie_flags: 'SameSite=None;Secure',
            });
          `}
        </script>
        {props.headComponents}
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
      </body>
    </html>
  );
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
};
