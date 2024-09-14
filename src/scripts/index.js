const { default: axios } = require('axios');

(async () => {
  try {
    const [data1, data2] = await Promise.all([
      axios.get('http://localhost:4999/user/claim/john'),
      axios.get('http://localhost:5999/user/claim/john'),
    ]);

    console.log(data1, data2);
  } catch (e) {
    console.error(e);
  }
})();
