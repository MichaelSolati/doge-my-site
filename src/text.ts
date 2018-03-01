function modifier(): string {
  const modifiers: string[] = ['so', 'such', 'many', 'much', 'very'];
  return (modifiers[Math.floor(Math.random() * modifiers.length)]);
}

function word(): string {
  const words: string[] = ['wow', 'amaze', 'excite', 'doge']
  return words[Math.floor(Math.random() * words.length)];
}

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
    tag.innerText.split('([^ ]+ [^ ]+) ').forEach((text: string) => {
      texts.push(`<span style="color: ${color()};">${modifier()}</span> <span style="color: ${color()};">${word()}</span>`);
    });
    tag.innerHTML = texts.join(' ');
  });
}

text();