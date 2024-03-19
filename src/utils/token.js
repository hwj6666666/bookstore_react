//封装和token相关的工具函数 存 取 删

const TOKENKEY = "token_key";
function setToken(token) {
  localStorage.setItem(TOKENKEY, token);
}

function getToken() {
    return localStorage.getItem(TOKENKEY);
}

function removeToken(token) {
    localStorage.removeItem(TOKENKEY);
}

export { setToken, getToken, removeToken };
