import React from 'react';
import map from 'lodash/map';

export const registerComponent = (components) => tag => {
  const TagComponent = components[tag];

  if (TagComponent) {
    return { Tag: TagComponent, Type: 'Component' } ;
  }
  return null;
};

function getCurrentTag(getTag, tagName) {
  const { Tag, Type } = getTag(tagName);

  if(!Tag) return null;
  return { Tag, Type };
  // if(Type === 'Component')
  // {
  //   return props => <Tag {...props} />;
  // }
  // else
  // {
  //   return Tag;
  // }

  // if (CurrentTag) { 
  //   return props => <CurrentTag {...props} />;
  // }
  // if (CurrentTag) { 
  //   return CurrentTag;
  // }
  // return null;
}

export const registerAllComponent = (TagMain, TagOverride) => Tags => {
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