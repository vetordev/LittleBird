export function convertToArray(string: String) {

  let array = string.split(',').map(item => (
    item.trim()
  ));

 return array;

};
