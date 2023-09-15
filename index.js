let url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json";
let req = new XMLHttpRequest();

let data

let width = 800;
let height = 600;
let padding = 40;

let xAxisScale
let yAxisScale

let svg = d3.select('svg')
let tooltip = d3.select('#tooltip')

let drawCanvas = () => {
    svg.attr("height", height)
       .attr("width", width)
}

let generateScales = () => {          

    xAxisScale = d3.scaleLinear()
                   .domain([d3.min(data, d => {return d['Year']})-1, d3.max(data, d => {return d['Year']})+1])
                   .range([padding, width-padding])
    yAxisScale = d3.scaleTime()
                   .domain([d3.min(data, d => {return new Date(d['Seconds'] * 1000)}), d3.max(data, d => {return new Date(d['Seconds'] * 1000)})])
                   .range([padding, height - padding])

}

let generateAxis = () => {
    let xAxis = d3.axisBottom(xAxisScale)
                  .tickFormat(d3.format('d'))
    svg.append('g')
       .call(xAxis)
       .attr('id', 'x-axis')
       .attr('transform', 'translate(0,' + (height-padding) +')')

    let yAxis = d3.axisLeft(yAxisScale)
                  .tickFormat(d3.timeFormat('%M:%S'))
    svg.append('g')
        .call(yAxis)
        .attr('id', 'y-axis')
        .attr('transform', 'translate('+ padding + ',0)')

}

let generatePoints = () => {
    svg.selectAll('circle')
       .data(data)
       .enter()
       .append('circle')
       .attr('class', 'dot')
       .attr("r", '5')
       .attr('cx', (d) => {return xAxisScale(d['Year'])})
       .attr('cy', (d) => {return yAxisScale(new Date(d['Seconds'] * 1000))})
       .attr('fill', (d) => {
        if(d['Doping'] != ''){
            return 'blue'
        } else {
            return 'orange'
        }
    })
       .on('mouseover', d => {
        tooltip.transition()
               .style('visibility', 'visible')

        if (d['Doping'] != ''){
            tooltip.text(d['Year'] + '\n' + d['Name'] + '\n' + d['Nationality'] + '\n' + d['Time'] + '\n' + d['Doping'] + '\n' + d['URL'])
        }

        tooltip.attr()
       })
       .on('mouseout', d => {
        tooltip.transition()
               .style('visibility', 'hidden')
       })

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

