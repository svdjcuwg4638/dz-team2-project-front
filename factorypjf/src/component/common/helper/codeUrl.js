//도움창 code에 따른 url
export default function codeUrl(codeValue) {
  if (codeValue.includes('team')) {
    return "common-code/team";
  }
  if (codeValue.includes('item')) {
    return "code/item";
  }
  if(codeValue.includes('line')){
    return "code/line"
  }
}
