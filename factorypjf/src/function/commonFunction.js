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
          char = variable.charAt(++i).toUpperCase();
        }
        result+=char;
      } 
      return result;
}
function camelToSnake(variable){
  let result=''
  for (let i = 0; i < variable.length; i++) {
    let char = variable.charAt(i);
    if (isUpperCase(char)) {
      char = "_" + char.toLowerCase();
    }
    result+=char;
  }
  return result;
}
function snakeToCamel(variable){
  let result=''
  for (let i = 0; i < variable.length; i++) {
      let char = variable.charAt(i);
      if (char==='_') {
        char = variable.charAt(++i).toUpperCase();
      }
      result+=char;
    } 
    return result;
}

//YYYY-MM-DD 구하기
function getToday(){
  let today = new Date();   

  let year = today.getFullYear(); // 년도
  let month = today.getMonth() + 1;  // 월
  let date = today.getDate();  // 날짜

  if(`${month}`.length===1){
    month='0'+month
  }
  if(`${date}`.length===1){
    date='0'+date
  }

  return `${year}-${month}-${date}`
}

//timeZone US -> KR
function timeToKR(date){
  const TIME_ZONE = 9 * 60 * 60 * 1000; // 9시간
          const utcDate = new Date(date);
          const dateKR= new Date(utcDate.getTime() + TIME_ZONE).toISOString().replace('T', ' ').slice(0, -5);
          return dateKR
}

export {isUpperCase,camelToKebab,kebabToCamel,camelToSnake,snakeToCamel,getToday,timeToKR}