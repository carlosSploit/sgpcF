function getaverageColor(imagen, idCanvas = 'canvas') {
    var r=0, g=0, b=0, count = 0, canvas, ctx, imageData, data;
    canvas = document.getElementById(idCanvas);
    // canvas.id = idCanvas;
    // console.log(canvas);
    ctx = canvas.getContext("2d");
    canvas.width = imagen.width;
    canvas.height = imagen.height;
    ctx.drawImage(imagen, 0, 0);
    imageData = ctx.getImageData(0, 0, imagen.width, imagen.height);
    data = imageData.data;
    for(let i = 0, n = data.length; i < n; i += 4) {
      ++count;
      r += data[i];
      g += data[i+1];
      b += data[i+2];
    }
    r = ~~(r/count);
    g = ~~(g/count);
    b = ~~(b/count);
    return [r, g, b];
}
  
function rgbToHex(arr) {
    return ((1 << 24) + (arr[0] << 16) + (arr[1] << 8) + arr[2]).toString(16).slice(1);
}

function switchImage(image,canvasKey) {
    var averagecolor = getaverageColor(image,canvasKey);
    var color = rgbToHex(averagecolor);
    let rbg = averagecolor.reduce((pv,cv,ind)=>{
        return pv + cv + ((ind == (averagecolor.length - 1))? "": ",");
    },'');
    return {
        hex: color,
        rbg: rbg
    };
}

export async function setDefaultImage(url,canvasKey) {
    var image = new Image();
    image.src = url;
    image.crossOrigin = "Anonymous";
    let dataColor = await new Promise((exce,reject)=>{
        image.onload = function() {
            exce(switchImage(this,canvasKey));
        }
    });
    return dataColor;
}