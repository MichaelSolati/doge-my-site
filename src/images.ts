import { GIPHY_KEY } from './keys';

interface Images { expires: number; wide: string[], tall: string[], square: string[], all: string[] };

function giphy(callback: Function): void {
  chrome.storage.local.get(['library'], (storage) => {
    let library: Images = storage.library;
    if (library && library.expires > (new Date()).getTime()) {
      callback(library);
    } else {
      const xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = () => {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
          library = { expires: ((new Date()).getTime() + 24 * 60 * 60 * 1000), wide: [], tall: [], square: [], all: [] };
          JSON.parse(xmlhttp.responseText).data.map((result: any) => {
            const ratio: number = Number(result.images.original.width) / Number(result.images.original.height);
            const image = `https://i.giphy.com/media/${result.id}/200.gif`;
            if (ratio > 1.1) { library.wide.push(image); }
            if (ratio < 0.9) { library.tall.push(image); }
            if (ratio <= 1.1 && ratio >= 0.9) { library.square.push(image); }
            library.all.push(image)
          });
          chrome.storage.local.set({ library }, () => callback(library));
        }
      }
      const url = `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_KEY}&q=doge&limit=100&offset=0&rating=R&lang=en`;
      xmlhttp.open('GET', url, true);
      xmlhttp.send();
    }
  });
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
  const imgElements: HTMLCollectionOf<HTMLImageElement> = <HTMLCollectionOf<HTMLImageElement>>document.getElementsByTagName('img');
  const images: HTMLImageElement[] = Array.from(imgElements);
  giphy((results: Images) => {
    images.forEach((element: HTMLImageElement) => {
      const ratio: number = element.width / element.height;
      element.src = select(ratio, results);
    });
  });
}

images();