import React from 'react';
import map from 'lodash/map';

const registerComponent = (components) => tag => {
  const TagComponent = components[tag];
  if (TagComponent) {
    return { Tag: TagComponent, Type: 'Component' } ;
  }
  return { Tag: null, Type: '' };
};

function getCurrentTag(getTag, tagName) {
  const { Tag, Type } = getTag(tagName);
  if(Tag) {
    return { Tag, Type };
  }
  
  return null;
}

export const registerAllComponent = (TagMainOut, TagOverrideOut) => Tags => {
  const TagMain = registerComponent(TagMainOut);
  const TagOverride = registerComponent(TagOverrideOut);

  const components = {};
  map(Tags, tag => {
    if(TagOverride)
    {
      const CurrentTag = getCurrentTag(TagOverride, tag);
      components[tag] = CurrentTag || getCurrentTag(TagMain, tag);
    }
    else
    {
      components[tag] = getCurrentTag(TagMain, tag);
    }
    
  });
   return {...components};
};