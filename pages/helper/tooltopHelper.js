// tooltipHelper.js
export const getTooltip = ({ object }) => {
  return (
    object &&
    `Species: ${object[1]} 
    Latitude: ${object[6]} 
    Longitude: ${object[5]}`
  );
};
