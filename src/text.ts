import * as dogeify from 'dogeify-js';

function color(): string {
  const colors: string[] = ['red', 'green', 'blue', 'pink', 'orange', 'yellow'];
  return (colors[Math.floor(Math.random() * colors.length)]);
}

function text(): void {
  const tags: HTMLElement[] = [
    ...Array.from(document.getElementsByTagName('h1')),
    ...Array.from(document.getElementsByTagName('h2')),
    ...Array.from(document.getElementsByTagName('h3')),
    ...Array.from(document.getElementsByTagName('h4')),
    ...Array.from(document.getElementsByTagName('h5')),
    ...Array.from(document.getElementsByTagName('h6')),
    ...Array.from(document.getElementsByTagName('p'))
  ];

  tags.forEach((tag: HTMLElement) => {
    const texts: string[] = [];
    tag.innerText.split('([^ ]+ [^ ]+) ').forEach((code: string) => {
      code.split(/(?<=[\\!\\?\\.])/).forEach((text: string) => {
        texts.push(`<span style="color: ${color()};">${(isNaN(Number(text))) ? dogeify(text) : text}</span>`);
      });
    });
    tag.innerHTML = texts.join(' ');
  });
}

text();