const html = require('choo/html');
const choo = require('choo');

var app = choo();

app.route('/', mainView);
app.mount('main');

function mainView (state, emit) {
  return html`
    <main>
    <h1>hello world ${new Date()}</h1>
    </main>
  `
}
