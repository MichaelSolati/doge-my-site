var shapes = {
	"w_rect": ['w1.jpg','w2.jpg','w4.jpg','w5.jpg','w6.gif','w7.jpg','w8.jpg','w9.jpg','w10.gif','w11.gif','w12.gif','w13.gif','w14.gif','w15.jpg','w16.gif','w17.jpg','w18.gif','w19.jpg'],
	"t_rect": ['t1.jpg','t2.jpg','t3.jpg','t4.jpg','t5.gif','t10.jpg','t12.jpg','t13.jpg','t14.jpg','t15.jpg','t16.jpg','t17.jpg','t18.jpg','t19.jpg'],
	"square": ['s1.jpg','s2.jpg','s3.jpg','s4.jpg','s5.gif','s6.gif','s7.gif','s8.jpg','s9.jpg','s10.jpg','s11.jpg','s12.jpg']
};
img_path = "images/doge/";

function chooseImg(shape) {
	return img_path + shapes[shape][Math.floor(Math.random() * shapes[shape].length)]
}

function getShape(h, w) {
	return h === w ? "square" : h > w ? "t_rect" : "w_rect"
}
var imgs = document.getElementsByTagName("img"),
img, h, w, shape;
for (var i = 0, len = imgs.length; i < len; i++) {
	img = imgs[i], h = img.height, w = img.width, s = getShape(h, w);
	img.setAttribute("height", h);
	img.setAttribute("width", w);
	img.src = chrome.extension.getURL(chooseImg(s));
};
