//도움창 code에 따른 url
export default function codeUrl(codeValue) {
  if (codeValue === "teamCode") {
    return "common-code/team";
  }
  if (codeValue === "itemName" || codeValue === "itemCode") {
    return "item/all";
  }
}
