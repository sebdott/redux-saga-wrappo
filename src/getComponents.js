import mapProps from 'map-props';
import isFunction from 'lodash-es/isFunction';

export default function getComponents(client, listOfComponent) {
  const returnObj = {};
  if (!isFunction(client)) {
    return null;
  }
  const extractedComponentList = client(listOfComponent);
  listOfComponent.forEach(componentName => {
    const { Tag, Type } = extractedComponentList[componentName];

    if (Type === 'Component') {
      returnObj[componentName] = () => Tag;
    }
    else {
      returnObj[componentName] = Tag;
    }
  });

  return mapProps(returnObj);
}
