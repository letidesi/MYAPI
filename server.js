const app = require("./src/app");

const PORT = 9090;

app.listen(PORT, () => {
  console.log(`Servidor conectado na porta ${PORT}.`);
});
