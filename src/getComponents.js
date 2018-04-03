
import mapValueToProps from './utils/mapValueToProps'; 
export function getComponents(client, listOfComponent) {
  let returnObj = {};

  const extractedComponentList = client(listOfComponent);

  listOfComponent.forEach((componentName)=> {
    const extractedComponent = extractedComponentList[componentName];

    if(extractedComponent)
    {
      returnObj[componentName] = () => extractedComponent;
    }
  })
  
  return mapValueToProps(returnObj);
}
