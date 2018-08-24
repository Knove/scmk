function insertFlg(str, flg, sn) {
  var start = str.substr(0, sn);
  var end = str.substr(sn, str.length);
  var newstr = start + flg + end;
  return newstr;
}

exports = module.exports = {
  insertFlg
};
