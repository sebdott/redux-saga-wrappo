import React from 'react';
import map from 'lodash/map';

export const registerComponent = (components) => tag => {
  const TagComponent = components[tag];

  if (TagComponent) {
    return TagComponent;
  }
  return null;
};

function getCurrentTag(getTag, tagName) {
  const CurrentTag = getTag(tagName);
  if (CurrentTag) { 
    return props => <CurrentTag {...props} />;
  }
  return null;
}

export const registerAllComponent = (TagMain, TagOverride) => Tags => {
  const components = {};
  map(Tags, tag => {
    const CurrentTag = getCurrentTag(TagOverride, tag);
    components[tag] = CurrentTag || getCurrentTag(TagMain, tag);
  });

  return components;
};
