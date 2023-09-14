let url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json";
let req = new XMLHttpRequest();

let data

let width = 800;
let height = 600;
let padding = 40;

let yScale
let xScale 

let xAxisScale
let yAxisScale

let svg = d3.select('svg')

let drawCanvas = () => {
    svg.attr("height", height)
       .attr("width", width)
}

let generateScales = () => {
    yScale = d3.scaleLinear()
               .domain([0, d3.max(data, d => {return d[0]})])
               .range([0, height-2*padding])
    xScale = d3.scaleLinear()
               .domain([0, data.length-1])
               .range([padding, width-padding])

             

    xAxisScale = d3.scaleLinear()
                   .domain([d3.min(data, d => {return d[4]})], d3.max(data, d => {return d[4]}))
                   .range([padding, width-padding])
    yAxisScale = d3.scaleTime()
                   .domain([d3.min(data, d => {return d[0]})], d3.max(data, d => {return d[0]}))
                   .range([padding, height - padding])

}

let generateAxis = () => {
    let xAxis = d3.axisBottom(xAxisScale)
    svg.append('g')
       .call(xAxis)
       .attr('id', 'x-axis')
       .attr('transform', 'translate(0,' + (height-padding) +")")

    let yAxis = d3.axisLeft(yAxisScale)
    svg.append('g')
        .call(yAxis)
        .attr('id', 'y-axis')
        .attr('transform', "translate("+ padding + ",0)")

}

let generatePoints = () => {
    svg.selectAll('circle')
       .data(data)
       .enter()
       .append('circle')
       .attr('class', 'dot')
       .attr("r", 5)
       .attr("cx",)
       .attr("cy",)


}

req.open('GET', url, true)
req.onload = () => {
    data = JSON.parse(req.responseText)
    drawCanvas()
    generateScales()
    generateAxis()
    generatePoints()
}
req.send()

