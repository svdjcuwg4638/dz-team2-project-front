function isUpperCase(char){
      return char===char.toUpperCase();
}

function camelToKebab(variable) {
    let result=''
  for (let i = 0; i < variable.length; i++) {
    let char = variable.charAt(i);
    if (isUpperCase(char)) {
      char = "-" + char.toLowerCase();
    }
    result+=char;
  }
  return result;
}
function kebabToCamel(variable){
    let result=''
    for (let i = 0; i < variable.length; i++) {
        let char = variable.charAt(i);
        if (char==='-') {
          char = variable.charAt(++i).toLowerCase();
        }
        result+=char;
      } 
      return result;
}

export {isUpperCase,camelToKebab,kebabToCamel}