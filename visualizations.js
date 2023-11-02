/*d3.csv("Visualization1DataNew.csv").then(

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
                       //.domain(d3.extent(dataset, function(d){return +d.le_agg_F}))
                       .domain([yMin, yMax])
                       .range([dimensions.height-dimensions.margin.bottom, dimensions.margin.top])
        //console.log(d3.extent(dataset, function(d){return +d.le_agg}))

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

d3.csv("Visualization3Data.csv").then(

    function(dataset){
        //console.log(dataset)

        d3.json("us_states.json").then(function(mapdata){

            console.log(dataset)
            console.log(mapdata)

            var state_le = {}
            dataset.forEach(d => 
                {state_le[d["statename"]] = +d["combined_le_FM"]}) 
            console.log(state_le)

            var w = 1000;
            var h = 1000;

            var svg = d3.select("#map")
                        //.append("svg")
                        .attr("width", w)
                        .attr("height", h)
    
            /*var svg = d3.select("body")
                        .append("svg")
                        .attr("width", w)
                        .attr("height",h);*/
            
            //var projection = d3.geoMercator()
    
            var projection = d3.geoAlbersUsa()//.translate([w/2,h/2]).scale([500]);         
            var path = d3.geoPath().projection(projection);

            var colorScale = d3.scaleLinear()
                               .domain([d3.min(Object.values(state_le)), 0, d3.max(Object.values(state_le))])
                               .range(["white", "red"])
            
            var states = svg.append("g")
                               .selectAll(".state")
                               .data(mapdata.features)
                               .enter()
                               //.append("class", "state")
                               //.attr("d", d => path(d))
                               .append("path")
                               .attr("d",path)
                               .attr("fill", d => colorScale(+state_le[d.properties.ADM0_A3]))
    
            /*d3.json("us_states.json", function(json){
    
                svg.selectAll("path")
                    .data(json.features)
                    .enter()
                    .append("path")
                    .attr("d",path)
                    .style("fill","teal");
            });*/

            /*var size = 800

            var svg = d3.select("#map").attr("width", size)
                                      .attr("height", size/2)
            
            var projection = d3.geoMercator() //geoOrthographic() //geoMercator()
                               .fitWidth(size, {type: "Sphere"})

            var pathGenerator = d3.geoPath(projection)

            //background of map
            var earth = svg.append("path")
                           .attr("d", pathGenerator({type: "Sphere"}))
                           .attr("stroke", "gray")
                           .attr("fill", "white")
            
            //gives grid
            /*var graticule = avg.append("path")
                               .attr("d", pathGenerator(d3.geoGraticule10()))
                               .attr("stroke","gray")
                               .attr("fill", "none")
            
            var colorScale = d3.scaleLinear()
                               .domain([d3.min(Object.values(state_le)), 0, d3.max(Object.values(state_le))])
                               .range(["white", "red"])
            
            var countries = svg.append("g")
                               .selectAll(".state")
                               .data(mapdata.features)
                               .enter()
                               .append("class", "state")
                               .attr("d", d => pathGenerator(d))
                               //.attr("fill", d => colorScale(+state_le[d.properties.ADM0_A3]))*/

        })

    }  
)
