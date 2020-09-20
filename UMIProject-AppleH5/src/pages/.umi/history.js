// create history
const history = require('history/createHashHistory').default({
  basename: '/Project-SC9/Apple/',
});
window.g_history = history;
export default history;
