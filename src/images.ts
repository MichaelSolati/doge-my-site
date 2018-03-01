import { GIPHY_KEY } from './keys';

interface Images { wide: string[], tall: string[], square: string[], all: string[] };

function giphy(callback: Function): void {
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = () => {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      const images: Images = { wide: [], tall: [], square: [], all: [] };
      JSON.parse(xmlhttp.responseText).data.map((result: any) => {
        const ratio: number = Number(result.images.original.width) / Number(result.images.original.height);
        if (ratio > 1.1) { images.wide.push(result.images.original.url); }
        if (ratio < 0.9) { images.tall.push(result.images.original.url); }
        if (ratio <= 1.1 && ratio >= 0.9) { images.square.push(result.images.original.url); }
        images.all.push(result.images.original.url)
      });
      callback(images);
    }
  }
  const url = `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_KEY}&q=doge&limit=100&offset=0&rating=R&lang=en`;
  xmlhttp.open('GET', url, true);
  xmlhttp.send();
}

function select(ratio: number, images: Images): string {
  let src: string;
  if (ratio > 1.1 && images.wide.length > 0) {
    src = images.wide[Math.floor(Math.random() * images.wide.length)];
  } else if (ratio < 0.9 && images.tall.length > 0) {
    src = images.tall[Math.floor(Math.random() * images.tall.length)];
  } else if (images.square.length > 0) {
    src = images.square[Math.floor(Math.random() * images.square.length)];
  }
  if (!src) { src = images.all[Math.floor(Math.random() * images.all.length)]; }

  return src;
}

function images(): void {
  const imgElements: NodeListOf<HTMLImageElement> = <NodeListOf<HTMLImageElement>>document.getElementsByTagName('img');
  const images: HTMLImageElement[] = Array.from(imgElements);
  giphy((results: Images) => {
    images.forEach((element: HTMLImageElement) => {
      const ratio: number = element.width / element.height;
      element.src = select(ratio, results);
    });
  });
}

images();