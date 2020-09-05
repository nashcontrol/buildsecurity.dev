import React from 'react';

/**
 * Paste in your SVG logo and return it from this component.
 * Make sure you have a height set for your logo.
 * It is recommended to keep the height within 25-35px.
 * Logo comes with a property value called `fill`. `fill` is useful 
 * when you want to change your logo depending on the theme you are on. 
 */
export default function Logo({ fill }) {
  return (
    <div>
      <svg
        width="192"
        height="23"
        viewBox="0 0 192 23"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <text x="0" y="11" dx fontFamily="Helvetica Neue" fontWeight="bold" textAnchor="start" fill={fill}>
          BuildSecurity.dev
        </text>
      </svg>
    </div>
  );
}