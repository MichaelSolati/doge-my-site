var dogeTalk = {
  'modifiers': ["so", "such", "many", "much", "very"],
  'words': ["wow", "amaze", "excite", "doge"]
};

function chooseModifier() {
  return (dogeTalk['modifiers'][Math.floor(Math.random() * dogeTalk['modifiers'].length)]);
}
function chooseWord() {
  return (dogeTalk['words'][Math.floor(Math.random() * dogeTalk['words'].length)]+".");
}

var tags = [];
tags.push(document.getElementsByTagName("h1"));
tags.push(document.getElementsByTagName("h2"));
tags.push(document.getElementsByTagName("h3"));
tags.push(document.getElementsByTagName("h4"));
tags.push(document.getElementsByTagName("h5"));
tags.push(document.getElementsByTagName("h6"));
tags.push(document.getElementsByTagName("li"));
tags.push(document.getElementsByTagName("a"));
tags.push(document.getElementsByTagName("p"));

for (var p = 0; p <= tags.length; p++) {
  try {
    for (var i = 0, len = tags[p].length; i < len; i++) {
      tag = tags[p][i], text = tag.innerHTML, splitTag = text.split(' ');
      for (var o = 0; o < splitTag.length; o++) {
        // Make sure not to replace img tags
        if (splitTag[o] === "<img") {
          while (((splitTag[o]).search(/>/i)) === -1){
            o++;
          }
          o++;
        } else {
          if (splitTag.length === 1) {
            splitTag[o] = chooseModifier() +" "+ chooseWord();
          } else {
            if (o%2 !== 0) {
              splitTag[o] = chooseWord();
            } else {
              splitTag[o] = chooseModifier()
            }
          }
        }
      }
      text = splitTag.join(' ');
      tag.innerHTML = text;
    }
  } catch (e) {
  }
};
