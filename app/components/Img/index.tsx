/**
 *
 * Img.js
 *
 * Renders an image, enforcing the usage of the alt="" tag
 */

import * as React from 'react';

interface Props {
  src: string | object;
  alt?: string;
  className?: string;
}
function Img(props: Props) {
  return <img className={props.className} src={props.src as string} alt={props.alt} />;
}

export default Img;
