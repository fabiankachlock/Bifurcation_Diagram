// canvas Dimensions
let w;
let h;
// iterations of function
let iterations = 500000;

// activate Zoom mode
let isZoom = false;
let zoomRate = 2; // factor for zoom
let zoomFactor = 1; // actual zoom
let isZoomout = false;
let zoomIterations = 250000; // less interations for more speed

//plot variables
let from;
let to;
let minX;
let maxX;

function setup() {
	createCanvas(windowWidth, windowHeight);
	w = windowWidth;
	h = windowHeight;
	// x-axsis: growth rate
	// y-axsis: population
	// console.clear();
	// alert('Tip: For controls or and more information open the console!');
	console.info('If you want to know the controls or don\'t know what to do, call help()');
}

function resize() {
	w = windowWidth;
	h = windowHeight;
	resizeCanvas(w, h);
}

function draw() {
	background(30);
	if (from === undefined) {
		plot();
	}
	noLoop();
}

function clearScreen() {
	draw();
}

function logPlot() {
	var it = isZoom || isZoomout ? zoomIterations : iterations;
	console.log({
		From_R: from,
		To_R: to,
		Min_X: minX,
		Max_X: maxX,
		iterations: it
	});
}

function setIterations(to) {
	if (to < 1) {
		console.error('Error: The Iterations Value has to be at least 1')
		return
	}
	iterations = to;
}

function help() {
	console.info('Here you can see the Bifurcation diagram plotted on a canvas.\nThe the x-axis represents the growth rate r.\nThe y-axis represents the relative population x.\nFor more Infos about the currently plotted graph, you can call logPlot().\n\nControls:\n\nYou can plot various ranges with the plotRange() function. It takes as parameters: 0: From r, 1: to r, 2: min x, 3: max x, 4: iterations. Remember: The bifurcation diagram takes the only r-values between 0 and 4!\n\nFinding a beautiful spot on the diagram can be hard, therefore I added some pre-made ones. You can call them with plotPointx. I created 0.1, 0.2, 0.02, 0.005, 0.0001, 0.00005 ex: plotPoint005(). These values represent ranges from r, which means, that r will increase by this value from the left to the right of your screen.\n\nFor more information about zooming, call zoomHelp()!');
}

//plotting
function plot() {
	plotRange(2.9, 4, 0, 1, iterations);
}

function plotPoint2() {
	plotRange(3.5, 3.7, 0.2, 0.7, iterations);
}

function plotPoint1() {
	plotRange(3.54, 3.64, 0.2, 0.7, iterations);
}

function plotPoint02() {
	plotRange(3.56, 3.58, 0.4, 0.6, iterations);
}

function plotPoint005() {
	plotRange(3.569, 3.574, 0.46, 0.54, iterations);
}

function plotPoint0001() {
	plotRange(3.5713, 3.5714, 0.465, 0.521, iterations);
}

function plotPoint00005() {
	plotRange(3.57135, 3.57140, 0.469, 0.519, iterations);
}

function plotRange(_from, _to, _minX, _maxX, _iterations = iterations, zoom = false) {
	// check values
	console.time('plotting')

	const diff = _to - _from;
	const diffX = _maxX - _minX;
	if (diff <= 0 || diffX <= 0) {
		console.error('Error: The ranges upperbound can\'t be greater than the lowerbound.')
		return
	}
	if (_from < 0 || _to > 4) {
		console.error('Error: control parameter r out of range')
		return
	}
	if (_minX < 0 || _maxX > 4) {
		console.warn('Warning: The range for x is out of bounds, this doesn\'t affect the algorithm, but the visual results might not be as expected.')
	}

	const sx = w / diff;
	const sy = h / diffX;
	let add = diff / _iterations;
	let r = _from; // growth rate
	let x = (_minX + _maxX) / 2; // population size (% of theoretical Max)

	from = _from;
	to = _to;
	minX = _minX;
	maxX = _maxX;

	if (!zoom) {
		zoomFactor = 1;
	}

	stroke(255);
	strokeWeight(1);
	clearScreen();

	for (r = _from; r < _to; r += add) {
		point((r - _from) * sx, h - (x - _minX) * sy);
		x = r * x * (1 - x);
	}

	noLoop();
	console.timeEnd('plotting')
	/*
	nice exp:
	plotRange(3.5976, 3.5979, 0.4, 0.6, 500000)
	plotRange(3.5976, 3.5979, 0.3, 0.7, 500000)
	*/
}

// Zooming
function zoomHelp() {
	console.info('You can zoom by clicking the canvas. For activating the zoom-mode, you have to call zoomIn() or zoomOut(). You can leave the zoom-mode with disableZoom().\nThe center of the next plot is going to be the location, where you clicked.\nWhile the zoom-mode is activated, the iteration rate is lower. You can set it to a custom value with setZoomIterations(x).\nYou can also vary the zoom rate with setZoomRate(x), the default one is 2.')
}

function mouseClicked() {
	if (!isZoom) return

	const px = mouseX / w;
	const py = mouseY / h;

	const currDiff = to - from;
	const currDiffX = maxX - minX;

	const newDiff = isZoom ? currDiff / zoomRate : currDiff * zoomRate;
	const newDiffX = isZoom ? currDiffX / zoomRate : currDiffX * zoomRate;

	const newCenterR = from + (currDiff * px);
	const newCenterX = maxX - (currDiffX * py);

	const newfrom = newCenterR - (newDiff / 2);
	const newto = newCenterR + (newDiff / 2);
	const newminX = newCenterX - (newDiffX / 2);
	const newmaxX = newCenterX + (newDiffX / 2);
	zoomFactor = isZoom ? zoomFactor * zoomRate : zoomFactor / zoomRate;

	console.info('current zoom: x' + zoomFactor.toString());

	return plotRange(newfrom, newto, newminX, newmaxX, zoomIterations, true);
}

function zoomIn() {
	isZoomout = false;
	isZoom = true;
}

function zoomOut() {
	isZoomout = true;
	isZoom = false;
}

function disableZoom() {
	isZoomout = false;
	isZoom = false;
}

function setZoomIterations(to) {
	if (to < 1) {
		console.error('Error: The Iterations Value has to be at least 1')
		return
	}
	zoomIterations = to;
}

function setZoomRate(to) {
	if (to < 0) {
		console.error('Error: The zoom factor can\'t be smaller than 0')
		return
	}
	zoomRate = to;
}

// Enable functionality for mobile devices
const showInput = visible => {
	if (visible) {
		document.getElementById('command').classList.add('forceActive')
		document.getElementById('command').classList.remove('forceInactive')
	} else {
		document.getElementById('command').classList.add('forceInactive')
		document.getElementById('command').classList.remove('forceActive')
	}
}

const Commands = {
	"resize": resize,
	"clearScreen": clearScreen,
	"plot": plot,
	"setIterations": setIterations,
	"plotRange": plotRange,
	"plotPoint1": plotPoint1,
	"plotPoint2": plotPoint2,
	"plotPoint02": plotPoint02,
	"plotPoint005": plotPoint005,
	"plotPoint0001": plotPoint0001,
	"plotPoint00005": plotPoint00005,
	"help": help,
	"logPlot": logPlot,
	"zoomHelp": zoomHelp,
	"zoomIn": zoomIn,
	"zoomOut": zoomOut,
	"disableZoom": disableZoom,
	"setZoomIterations": setZoomIterations,
	"setZoomRate": setZoomRate,
	"showInput": showInput,
	"": () => { }
}

const ARG_TYPE = {
	num: 'number',
	bool: 'bool',
	str: 'string'
}

const ArgConfig = {
	"resize": [],
	"clearScreen": [],
	"plot": [],
	"setIterations": [ARG_TYPE.num],
	"plotRange": [ARG_TYPE.num, ARG_TYPE.num, ARG_TYPE.num, ARG_TYPE.num, ARG_TYPE.num],
	"plotPoint1": [],
	"plotPoint2": [],
	"plotPoint02": [],
	"plotPoint005": [],
	"plotPoint0001": [],
	"plotPoint00005": [],
	"help": [],
	"logPlot": [],
	"zoomHelp": [],
	"zoomIn": [],
	"zoomOut": [],
	"disableZoom": [],
	"setZoomIterations": [ARG_TYPE.num],
	"setZoomRate": [ARG_TYPE.num],
	"showInput": [ARG_TYPE.bool],
	"": [],
}

const parseCommand = cmd => {
	const parts = cmd.split('(');
	const fName = parts.length > 0 ? parts[0] : '';
	const args = parts.length > 1 ? parts[1].split(',') : [];

	if (args.length > 0) {
		// remove closing ')'
		const lastElm = args[args.length - 1]
		args[args.length - 1] = lastElm.substring(0, lastElm.length - 1)
	}

	return {
		command: fName,
		arguments: args
	}
}

const cleanUpArgs = (args, config) => {
	for (let i = 0; i < args.length; i++) {
		if (config[i] === ARG_TYPE.num)
			args[i] = Number(args[i])
		else if (config[i] === ARG_TYPE.str)
			args[i] = args[i].replaceAll('"', '').replaceAll("'", '').trim()
		else if (config[i] === ARG_TYPE.bool)
			args[i] = args[i].trim() === "true"
	}

	return args
}

const executeCommand = (command, args) => {
	const fn = Commands[command]
	if (fn) setTimeout(() => fn(...args), 0)
	else alert("Command not found")
}

document.addEventListener('DOMContentLoaded', () => {
	let inputElement = document.getElementById('command')

	inputElement.addEventListener('keydown', (evt) => {
		if (evt.code == 'Enter') {
			const config = parseCommand(inputElement.value);
			const argConfig = ArgConfig[config.command]

			if (argConfig) {
				const cleanedArgs = cleanUpArgs(config.arguments, argConfig)
				executeCommand(config.command, cleanedArgs)
			} else {
				executeCommand('@@unknown')
			}

			inputElement.value = '';
		}
	});
})