# OW Web Developer Assessment

## Structure 
This submission includes two independent solutions:
- **Question 1:** Interactive 3D Earth Globe
- **Question 2:** Interactive Radar Chart

Each folder contains its own `index.html` and supporting files.
Open each file using any local server (e.g. VSCode Live Server Extension)

---

## Question 1 - Globe
### Features
- Implemented with Three.js
- Globe is rotatable and can be zoomed in and out.
- Pins are plotted using latitude and longitude conversion and CSS overlay with location's name.
- Each pin is a clickable `<a>` tag linked to the location's website.


### Built With
- HTML5
- CSS3
- Javascript
- [Three.js](https://threejs.org/)

---

## Question 2 - Radar Chart
### Features
- Built with Chart.js
- Dynamically displays data based on the hidden input's `city_name`.
- Shows three legends: Global, Region, and City.
- Labels and legends are dynamically pulled from the dataset.
- Chart updates automatically based on query parameters in the URL.

### Passing Query Parameters

You can set the city displayed on the radar chart by adding a `city_name` query parameter in the URL

**Format:**

index.html?city_name=<city-name>

**Examples:**

| City | URL |
|------|-----|
| Kuala Lumpur | `http://127.0.0.1:5500/question-two/index.html?city_name=kuala%20lumpur` |
| Mexico | `http://127.0.0.1:5500/question-two/index.html?city_name=mexico%20city` |

> **Note:**  
> - The default city is **Warsaw**.  
> - If the `city_name` parameter is missing or misspelled, the chart will automatically fall back to **Warsaw**.  

### Built With
- HTML5
- CSS3
- Javascript
- [Chart.js](https://www.chartjs.org/) 

---

## How to Run
1. Clone this repository.
2. Open the folder in VS Code.
3. Right-click `index.html` in each question folder -> **"Open with Live Server"**.
4. Interact with the globe and radar chart in the browser.

## Author
**Nur Shafin Athirah**
