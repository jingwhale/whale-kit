import sketch from 'sketch';
import QRCode from 'whale-qrcode';
import UI from 'sketch/ui';
// documentation: https://developer.sketchapp.com/reference/api/

var doc = sketch.getSelectedDocument();
var selection = doc.selectedLayers;
var buttonRect = "";
selection.forEach(layer => (buttonRect=layer));

var dist = (buttonRect.frame.width>buttonRect.frame.height)?buttonRect.frame.width:buttonRect.frame.height;

export default function onRun(context) {
    UI.getInputFromUser(
        "Please fill in the QR code content：",
        {
            initialValue: 'https://www.jingwhale.cc/',
        },
        (err, value) => {
            if(buttonRect && (buttonRect.shapeType == "Rectangle")){
                if(!!value){
                    generate("", value);
                }else{
                    UI.message("Please fill in the QR code content!");
                }
            }else{
                UI.message("Please select a Rectangle!");
            }

            if (err) {
                // most likely the user canceled the input
                return
            }
        }
    )
}

function generate(inputSettings, value){
  const qrcode = new QRCode(`${value}`)
  const options = Object.assign(getDefaultSettings(), inputSettings)
  const modules = qrcode.qrcode.modules
  const width = options.width
  const height = options.height
  const length = modules.length
  const xsize = width / (length + 2 * options.padding)
  const ysize = height / (length + 2 * options.padding)

  let layers = []
  for (let y = 0; y < length; y++) {
    for (let x = 0; x < length; x++) {
      let module = modules[x][y]
      if (module) {
        let px = (x * xsize + options.padding * xsize).toString()
        let py = (y * ysize + options.padding * ysize).toString()
        layers.push({
          type: sketch.Types.Shape,
          frame: {
            x: px,
            y: py,
            width: xsize,
            height: ysize,
          },
          style: {
            fills: [
              {
                color: `${options.color}`,
                fill: `${options.background}`
              }
            ],
            borders: []
          }
        })
      }
    }
  }

  const group = new sketch.Group({
    name: `qr-${value}`,
    parent: buttonRect.parent,
      frame: {
          x: buttonRect.frame.x,
          y: buttonRect.frame.y,
          width: options.width,
          height: options.height
      },
    layers:layers
  });

  buttonRect.remove();
}

function getDefaultSettings(){
  return {
		padding: 2,
		width: dist,
		height: dist,
		typeNumber: 4,
		color: "#000000",
		background: "#ffffff",
		ecl: "M"
	}
}
