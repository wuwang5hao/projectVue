class ImgUtil {
  mergeImage(imgUrl, subImageUrl, offset, callback) {
    let img = new Image()
    img.src = imgUrl
    img.crossOrigin = 'Anonymous'
    let canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    let context = canvas.getContext("2d");

    context.rect(0 , 0 , canvas.width, canvas.height);
    context.fillStyle = "#fff";
    context.fill();

    img.onload = function () {
      context.drawImage(img, 0, 0, 700, 700);
      let subImage = new Image();
      subImage.src = subImageUrl;
      subImage.crossOrigin = 'Anonymous';

      subImage.onload = function () {
        context.drawImage(subImage, offset.x, offset.y, subImage.width, subImage.height);
        let base64 = canvas.toDataURL("image/png");
        if (callback) {
          callback(base64)
        }
      }
    }
  }

  getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
}

export var imgUtil = new ImgUtil()
