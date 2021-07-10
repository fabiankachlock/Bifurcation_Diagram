# Bifurcation_Diagram
Explore the beauty of the bifurcation diagram!

# How to use?
1. Clone or download the repository
2. Open `Bifurcation_Diagram.html` in your browser
3. Open the developer tools of your browser
4. Call `help()` in the console and read the instructions

# API

## General

| Function | What it does |
| --- | --- |
| `resize()` | resize the canvas |
| `clearScreen()` | create a blank screen |
| `help()` | show help message in the console |
| `zoomHelp()` | show help message for zooming in the console |
| `showInput(visible)`| toggle the visibility of the on screen command input|

## Plotting

| Function | What it does |
| --- | --- | 
| `plot()`| show the diagram |
| `logPlot()` | show values for the current diagramm |
| `plotPoint2()` | show zoom section of the diagram _(r difference: 0.2)_ |
| `plotPoint1()` | show zoom section of the diagram _(r difference: 0.1)_ |
| `plotPoint02()` | show zoom section of the diagram _(r difference: 0.02)_ |
| `plotPoint005()` | show zoom section of the diagram _(r difference: 0.005)_ |
| `plotPoint0001()` | show zoom section of the diagram _(r difference: 0.0001)_ |
| `plotPoint00005()` | show zoom section of the diagram _(r difference: 0.00005)_ |
| `plotRange(from, to, minX, maxX)` | show a specifc section of the diagram |
| `setIterations(to)`| set the amount of iterations taken for a single plot |

## Zooming

| Function | What it does |
| --- | --- | 
| `zoomIn()`| enables zoom mode for zooming in |
| `zoomOut()`| enables zoom mode for zooming out |
| `disableZoom()`| disabled zoom mode |
| `setZoomRate(to)`| set the zoom factor to a custom value |
| `setZoomIterations(to)`| set the amount of iterations taken for a single plot while zooming |