export function convertToArray(string: string) {

  const array = string.split(',').map(item => (
    item.trim()
  ));

 return array;

};
