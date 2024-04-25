const randomAlphaNumeric = (length) => {
  let s = "";
  Array.from({ length }).some(() => {
    s += Math.random().toString(36).slice(2);
    return s.length >= length;
  });
  return s.slice(0, length);
};

const getIp = () => {
  var ip = "";
  
    
};

// randomAlphaNumeric(5); // '0afad'

module.exports = { randomAlphaNumeric, getIp };
