d3.csv("Visualization1DataNew.csv").then(

    function(dataset){

        console.log(dataset)

       var dimensions = {
            width: 700,
            height: 350,
            margin: {
                top: 10,
                right: 50,
                bottom: 45,
                left: 50
            }
        }

        var svg = d3.select("#linechart")
                    .style("width", dimensions.width)
                    .style("height", dimensions.height)

        var xScale = d3.scaleLinear()
                       .domain(d3.extent(dataset, function(d){return +d.pctile}))
                       .range([dimensions.margin.left, dimensions.width - dimensions.margin.right])

        var yMax = d3.max(dataset, function(d){
            var max = Math.max(+d.le_agg_F, +d.le_agg_M);
                return max
                }
        )

        console.log(yMax)
        
        var yMin = d3.min(dataset, function(d){
            var min = Math.min(+d.le_agg_F, +d.le_agg_M);
                return min
            }
        )
            
        console.log(yMin)

        var yScale = d3.scaleLinear()
                       .domain([yMin, yMax])
                       .range([dimensions.height-dimensions.margin.bottom, dimensions.margin.top])

        const line1 = d3.line()
                        .x(d => xScale(+d.pctile))
                        .y(d => yScale(+d.le_agg_F))

        const line2 = d3.line()
                        .x(d => xScale(+d.pctile))
                        .y(d => yScale(+d.le_agg_M))

        svg.append("g")
            .attr("transform", `translate(0,${dimensions.height - dimensions.margin.bottom})`)
            .call(d3.axisBottom(xScale).ticks(dimensions.width / 80).tickSizeOuter(0));
           

        svg.append("g")
           .attr("transform", `translate(${dimensions.margin.left},0)`)
           .call(d3.axisLeft(yScale).ticks(dimensions.height / 40))
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
            .attr("stroke", "red")
            .attr("stroke-width", 1.5)
            .attr("d", line1(dataset));
            //.attr("d", line2(dataset));

        svg.append("path")
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 1.5)
            .attr("d", line2(dataset));
    }  
)

d3.csv("Visualization2Data.csv").then(

    function(dataset){

        console.log(dataset)

       var dimensions = {
            width: 1400,
            height: 400,
            margin: {
                top: 10,
                right: 50,
                bottom: 45,
                left: 50
            }
        }


        var yAccessor = d => +d.le_agg_slope_q1_F
        var yAccessor1 = d => +d.le_agg_slope_q2_F
        var yAccessor2 = d => +d.le_agg_slope_q3_F
        var yAccessor3 = d => +d.le_agg_slope_q4_F
        var yAccessor4 = d => +d.le_agg_slope_q1_M
        var yAccessor5 = d => +d.le_agg_slope_q2_M
        var yAccessor6 = d => +d.le_agg_slope_q3_M
        var yAccessor7 = d => +d.le_agg_slope_q4_M

        var svg = d3.select("#scatterplot")
                    .style("width", dimensions.width)
                    .style("height", dimensions.height)


                    

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

        var xScale = d3.scaleBand()
                       .domain(d3.map(dataset, d => d.stateabbrv))
                       .range([dimensions.margin.left, dimensions.width - dimensions.margin.right])

        console.log(d3.map(dataset, d => d.stateabbrv))




        var yScale = d3.scaleLinear()
                       .domain([yMin, yMax])
                       .range([dimensions.height - dimensions.margin.bottom, dimensions.margin.top])
      
        console.log([yMin, yMax])

        var f_q1 = svg.append("g")
                      .selectAll("circle")
                      .data(dataset)
                      .enter()
                      .append("circle")
                      .attr("cx", d => xScale(d.stateabbrv))
                      .attr("cy", d => yScale(yAccessor(d)))
                      .attr("r", 3)
                      .attr("fill", "red")

        var f_q2 = svg.append("g")
                      .selectAll("circle")
                      .data(dataset)
                      .enter()
                      .append("circle")
                      .attr("cx", d => xScale(d.stateabbrv))
                      .attr("cy", d => yScale(yAccessor1(d)))
                      .attr("r", 3)
                      .attr("fill", "red")

        var f_q3 = svg.append("g")
                      .selectAll("circle")
                      .data(dataset)
                      .enter()
                      .append("circle")
                      .attr("cx", d => xScale(d.stateabbrv))
                      .attr("cy", d => yScale(yAccessor2(d)))
                      .attr("r", 3)
                      .attr("fill", "red")

        var f_q4 = svg.append("g")
                      .selectAll("circle")
                      .data(dataset)
                      .enter()
                      .append("circle")
                      .attr("cx", d => xScale(d.stateabbrv))
                      .attr("cy", d => yScale(yAccessor3(d)))
                      .attr("r", 3)
                      .attr("fill", "red")

        var m_q1 = svg.append("g")
                      .selectAll("circle")
                      .data(dataset)
                      .enter()
                      .append("circle")
                      .attr("cx", d => xScale(d.stateabbrv))
                      .attr("cy", d => yScale(yAccessor4(d)))
                      .attr("r", 3)
                      .attr("fill", "blue")

        var m_q2 = svg.append("g")
                      .selectAll("circle")
                      .data(dataset)
                      .enter()
                      .append("circle")
                      .attr("cx", d => xScale(d.stateabbrv))
                      .attr("cy", d => yScale(yAccessor5(d)))
                      .attr("r", 3)
                      .attr("fill", "blue")

        var m_q3 = svg.append("g")
                      .selectAll("circle")
                      .data(dataset)
                      .enter()
                      .append("circle")
                      .attr("cx", d => xScale(d.stateabbrv))
                      .attr("cy", d => yScale(yAccessor6(d)))
                      .attr("r", 3)
                      .attr("fill", "blue")

        var m_q4 = svg.append("g")
                      .selectAll("circle")
                      .data(dataset)
                      .enter()
                      .append("circle")
                      .attr("cx", d => xScale(d.stateabbrv))
                      .attr("cy", d => yScale(yAccessor7(d)))
                      .attr("r", 3)
                      .attr("fill", "blue")



        var xAxisGen = d3.axisBottom().scale(xScale)


        var xAxis = svg.append("g")
                       .call(xAxisGen)
                       .style("transform", `translateY(${(dimensions.height-150)}px)`)


        var yAxisGen = d3.axisLeft().scale(yScale)

        var yAxis = svg.append("g")
                       .call(yAxisGen)
                       .style("transform", `translateX(${dimensions.margin.left}px)`)
    }  
)

d3.csv("Visualization3Data.csv").then(

    function(dataset){

        d3.json("us_states.json").then(function(mapdata){

            console.log(dataset)
            console.log(mapdata)

            var state_le = {}
            dataset.forEach(d => 
                {state_le[d["statename"]] = +d["combined_le_FM"]}) 
            console.log(state_le)

            var w = 700;
            var h = 350;

            var svg = d3.select("#map")
                        .attr("width", w)
                        .attr("height", h)
    
            var projection = d3.geoAlbersUsa()  
            .translate([w/3 , h/2]) // Adjust these values
    .scale([w]);  
            
            var path = d3.geoPath().projection(projection);

            var colorScale = d3.scaleLinear()
                               .domain([d3.min(Object.values(state_le)), d3.max(Object.values(state_le))])
                               .range(["lightblue", "blue"])

            var mapGroup = svg.append("g")
                              .attr("transform", "translate(" + w / 4 + "," + h / 300 + ")");
            
            var states = mapGroup.selectAll(".state")
                               .data(mapdata.features)
                               .enter()
                               .append("path")
                               .attr("class", "state")
                               .attr("d", d => path(d))
                               .attr("fill", d => colorScale(+state_le[d.properties.NAME]))
        })
    }  
)