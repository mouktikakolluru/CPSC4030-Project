d3.csv("Visualization1Data.csv").then(

    function(dataset){
        console.log("working")

        console.log(dataset)

        /*var dimensions = {
            width: 800,
            height: 800,
            margin: {
                top: 10,
                right: 50,
                bottom: 45,
                left: 20
            }
        }

        var name = dataset.columns[1]

       var svg = d3.select("#barchart")
                    .style("width", dimensions.width)
                    .style("height", dimensions.height)


        var xScale = d3.scaleLinear()
                        .domain(d3.extent(dataset, function(d){return +d.year}))
                        .range([dimensions.margin.left, dimensions.width - dimensions.margin.right])

        console.log(d3.extent(dataset, function(d){return +d.year}))

        var yScale = d3.scaleLinear()
                       .domain([0, d3.max(d3.extent(dataset, function(d){return +d[name]}))])
                       .range([dimensions.height-dimensions.margin.bottom, dimensions.margin.top])

        console.log(d3.extent(dataset, function(d){return +d[name]}))
        console.log([0, d3.max(d3.extent(dataset, function(d){return +d[name]}))])

        var bars = svg.append("g")
                      .selectAll("rect")
                      .data(dataset)
                      .enter()
                      .append("rect")
                      .attr("x", d => xScale(+d.year))
                      .attr("y", d => yScale(+d[name]))
                      .attr("width", 5)
                      .attr("height", function(d){return dimensions.height - dimensions.margin.bottom - yScale(+d[name])})
                      .attr("fill", "pink")

        var xAxisGen = d3.axisBottom().scale(xScale)
                         .ticks(28)
                         .tickFormat(d3.format(""))

        
        var xAxis = svg.append("g")
                       .call(xAxisGen)
                       .style("transform", `translateY(${dimensions.height - dimensions.margin.bottom}px)`)
                       .selectAll("text")
                       .style("text-anchor", "end")
                       .attr("dx", "-.8em")
                       .attr("dy", ".15em")
                       .attr("transform", "rotate(-65)");
        
        var yAxisGen = d3.axisRight().scale(yScale)
                         .ticks(16)

        var yAxis = svg.append("g")
                       .call(yAxisGen)*/
    }  
)