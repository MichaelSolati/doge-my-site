function style() {
  const styleID = 'doge-my-site-style';
  const css =
    '* { font-family: "Comic Sans MS", "Comic Sans", cursive !important; }';
  let style: HTMLStyleElement = document.getElementById(
    styleID,
  ) as HTMLStyleElement;

  if (style) {
    document.body.removeChild(style);
  }

  style = document.createElement('style');
  style.setAttribute('type', 'text/css');
  style.setAttribute('id', styleID);
  style.appendChild(document.createTextNode(css));

  document.body.appendChild(style);
}

style();
