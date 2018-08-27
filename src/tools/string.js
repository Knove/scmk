function insertFlg(str, flg, sn) {
  const start = str.substr(0, sn);
  const end = str.substr(sn, str.length);
  const newstr = start + flg + end;
  return newstr;
}

exports = module.exports = {
  insertFlg
};
