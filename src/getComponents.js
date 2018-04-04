
import mapValueToProps from './utils/mapValueToProps'; 
export function getComponents(client, listOfComponent) {
  let returnObj = {};
  const extractedComponentList = client(listOfComponent);
  listOfComponent.forEach(componentName => {
    const extractedComponent = extractedComponentList[componentName];
    const { Tag, Type } = extractedComponent;

    if(Type === 'Component')
    {
      returnObj[componentName] = () => Tag;
    }
    else
    {
      returnObj[componentName] = Tag;
    }
  });
  return mapValueToProps(returnObj);
}
