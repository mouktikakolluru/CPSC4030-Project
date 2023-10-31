/*d3.csv("Visualization1Data.csv").then(

    function(dataset){

        console.log(dataset)

       var dimensions = {
            width: 800,
            height: 800,
            margin: {
                top: 10,
                right: 50,
                bottom: 45,
                left: 20
            }
        }

        var svg = d3.select("#linechart")
                    .style("width", dimensions.width)
                    .style("height", dimensions.height)

        var xScale = d3.scaleLinear()
                       .domain(d3.extent(dataset, function(d){return +d.pctile}))
                       .range([dimensions.margin.left, dimensions.width - dimensions.margin.right])

        var yScale = d3.scaleLinear()
                       .domain(d3.extent(dataset, function(d){return +d.le_agg}))
                       .range([dimensions.height-dimensions.margin.bottom, dimensions.margin.top])
        //console.log(d3.extent(dataset, function(d){return +d.le_agg}))

        const line = d3.line()
                        .x(d => xScale(+d.pctile))
                        .y(d => yScale(+d.le_agg))

        svg.append("g")
            .attr("transform", `translate(0,${dimensions.height - dimensions.margin.bottom})`)
            .call(d3.axisBottom(xScale).ticks(dimensions.width / 80).tickSizeOuter(0));
           //.attr("transform", 'translate(0, %{height - marginBottom})')

        svg.append("g")
           .attr("transform", `translate(${dimensions.margin.left},0)`)
           .call(d3.axisLeft(yScale).ticks(dimensions.height / 40))
           //.call(g => g.select(".domain").remove())
           .call(g => g.selectAll(".tick line").clone()
               .attr("x2", dimensions.width - dimensions.margin.left - dimensions.margin.right)
               .attr("stroke-opacity", 0.1))
           .call(g => g.append("text")
               .attr("x", -dimensions.margin.left)
               .attr("y", 10)
               .attr("fill", "currentColor")
               .attr("text-anchor", "start"));

        svg.append("path")
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 1.5)
            .attr("d", line(dataset));
    }  
)*/

d3.csv("Visualization2Data.csv").then(

    function(dataset){

        console.log(dataset)

       var dimensions = {
            width: 800,
            height: 800,
            margin: {
                top: 10,
                right: 50,
                bottom: 45,
                left: 50
            }
        }


        //var xAccessor = d => d.stateabbrv //function(d) {return d.stateabbrv}
        //d => d.stateabbrv
        //console.log(function(d) {return d.stateabbrv})

        var yAccessor = d => +d.le_agg_slope_q1_F

        //console.log(d => d.stateabbrv)
        //console.log(d => d.le_agg_slope_q1_F)

        var svg = d3.select("#scatterplot")
                    .style("width", dimensions.width)
                    .style("height", dimensions.height)

        /*var xScale = d3.scaleLinear()
                       .domain(d3.extent(dataset, xAccessor))
                       .range([dimensions.margin.left,dimensions.width - dimensions.margin.right])
        console.log(d3.extent(dataset, xAccessor))*/

      var yMax = d3.max(dataset, function(d){
            var max = Math.max(+d.le_agg_slope_q1_F, +d.le_agg_slope_q2_F, +d.le_agg_slope_q3_F, +d.le_agg_slope_q4_F,
                +d.le_agg_slope_q1_M, +d.le_agg_slope_q2_M, +d.le_agg_slope_q3_M, +d.le_agg_slope_q4_M);

                return max
            }
        )

        console.log(yMax)
        
        var yMin = d3.min(dataset, function(d){
           var min = Math.min(+d.le_agg_slope_q1_F, +d.le_agg_slope_q2_F, +d.le_agg_slope_q3_F, +d.le_agg_slope_q4_F,
                +d.le_agg_slope_q1_M, +d.le_agg_slope_q2_M, +d.le_agg_slope_q3_M, +d.le_agg_slope_q4_M);

                return min
            }
        )

        console.log(yMin)

        var xScale = d3.scaleLinear()
                       .domain(d3.map(dataset, d => d.stateabbrv))
                       //.domain(d3.extent(dataset, function(d) {d.stateabbrv}))
                       .range([dimensions.margin.left, dimensions.width - dimensions.margin.right])
                       //.padding([0,2])
        console.log(d3.map(dataset, d => d.stateabbrv))
        //console.log(d3.extent(dataset, function(d) {d.stateabbrv}))

        var yScale = d3.scaleLinear()
                       //.domain(d3.extent(dataset, yAccessor))
                       .domain([yMin, yMax])
                       .range([dimensions.height - dimensions.margin.bottom, dimensions.margin.top])
        //console.log(d3.extent(dataset, yAccessor))
        //console.log(d => xScale(d.stateabbrv))
        console.log([yMin, yMax])

        var dots = svg.append("g")
                      .selectAll("circle")
                      .data(dataset)
                      .enter()
                      .append("circle")
                      .attr("cx", d => xScale(d.stateabbrv))
                      .attr("cy", d => yScale(yAccessor(d)))
                      .attr("r", 3)
                      .attr("fill", "black")

        var xAxisGen = d3.axisBottom().scale(xScale)

        var xAxis = svg.append("g")
                       .call(xAxisGen)
                       .style("transform", `translateY(${dimensions.height-dimensions.margin.bottom}px)`)

        var yAxisGen = d3.axisLeft().scale(yScale)

        var yAxis = svg.append("g")
                       .call(yAxisGen)
                       .style("transform", `translateX(${dimensions.margin.left}px)`)
    }  
)
