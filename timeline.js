
// ------------ TIMELINE MAPPING -------------------
deathDays = []


function mapDeathDays(){
    
    var margin ={top: 210, right: 20, bottom: 10, left: 150};
    var CHART_WIDTH = 650-margin.left- margin.right; 
    var CHART_HEIGHT = 650-margin.top- margin.bottom

    var maxValue = 0; 
    for(i = 0; i < deathDays.length; i ++){
        if (deathDays[i].deaths > maxValue){
            maxValue = deathDays[i].deaths; 
        }
    }
    minDate = d3.min(deathDays, function(d){return +d.date});
    maxDate = d3.max(deathDays, function(d){return +d.date});

    var xScale = d3.time.scale()
        .domain([minDate, maxDate])
        .range([0, CHART_WIDTH]);

    min = d3.min(deathDays, function(d){return +d.deaths});
    max = d3.max(deathDays, function(d){return +d.deaths});

    var yScale = d3.scale.linear()
        .domain([min, max])
        .range([CHART_HEIGHT, 0 ]);

    var pathGenerator = d3.svg.line()
        .x(function(d) { return xScale(d.date); })
        .y(function(d) { return yScale(d.deaths) });
    

    var timeLineSVG = d3.select("body").select(".wrapper").append("svg").attr("id","timelineSVG")
        .attr("width", width)
        .attr("height", height) 
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

    var g = d3.select('#timelineSVG').select('g');

    var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom")
        .tickFormat(function(d) {return d.getMonth( ) + "-" + d.getDate(); })
        
    var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left");

    
    g.append("g")
        .attr('class', 'xAxis')
        .attr('transform', 'translate(0,' + CHART_HEIGHT + ')')
        .call(xAxis)

    g.append('g')
        .attr('class', 'yAxis')
        .call(yAxis);

    g.append('path')
        .style('fill', 'none')
        .style('stroke', 'steelblue')
        .style('stroke-width', '3px')
        .attr('d', pathGenerator(deathDays));

    console.log(); 

    timeLineSVG.selectAll(".dot")
        .data(deathDays.filter(function(d) { return d; })).enter().append("circle")
        .attr("class", "dot")
        .attr("cx", function(d) { return xScale(d.date);})
        .attr("cy", function(d) { return yScale(d.deaths);})
        .attr("r", 3.5); 
        
    var text = d3.select('#timeLineSVG').append("text").attr("x", margin.left).attr("y", 750)
        .style("font-size", "20px").attr("alignment-baseline","middle")
        .text("Hover over the points to see the corresponding deaths on the map."); 
    
    var title = d3.select('#timeLineSVG').append("text").attr("x", CHART_WIDTH/2  ).attr("y", margin.top-50)
        .style("font-size", "30px").attr("alignment-baseline","middle")
        .text("Timeline - Deaths Per Day"); 

        

    var dots = timeLineSVG.selectAll('circle')
        .on("mouseover", function(d) {
            // fill bars red when you hover over them
            d3.select(this)
                .attr('r', 7)
                .attr("stroke", "red") 
                .attr("fill", "red")

            // // get the circles by their ID 
            var a = (d.date).getMonth( ) + "-" + (d.date).getDate()
            var deathCircleLabels = "._" + a; 
            
            console.log(d.date); 
            // // making all circles associated with that date blue and the other's not visible
            d3.select("#deaths").selectAll('circle').style("opacity", 0)
            d3.select("#deaths").selectAll(deathCircleLabels).style("opacity", 1.0)

            // // adding the tooltip to make the total number pop up
            var xPosition = (d3.select(this).attr("cx"));
            var yPosition = (d3.select(this).attr("cy"));

            // //tooltip label
            timeLineSVG.append("text")
                .attr("id", "tooltip")
                .attr("text-anchor", "middle")
                .attr("x", (width/2)-25)
                .attr("y", 150)
                .attr("font-family", "sans-serif")
                .attr("font-size", "20px")
                .attr("font-weight", "bold")
                .attr("fill", "black")
               //.attr("background-color", "white")
               .text(d.deaths + " people died on Date: " + (d.date).getMonth() +"/" + (d.date).getDate())
            
            

        })
        .on("mouseout", function(d) {
            d3.select(this)
                .attr('r', 3.5)
                .attr("stroke", "black") 
                .attr("fill", "black")
            // putting all circles back to normal
            d3.select("#deaths").selectAll('circle').style("opacity", 1)
                .attr("fill", "red").attr("stroke", "red")
            // d3.select(this)
            // .attr("fill", "rgb(0, 0, " + (d * 10) + ")")
            
            // //Remove the tooltip
            d3.select("#tooltip").remove();
                
        });

    console.log(); 
    

}


d3.csv('deathdays.csv', function(data) //function that handles the content of the file 
    
{
        var months = {Aug:'07',Sep:'08'}; 
		for (var i = 0; i<data.length; i ++) 
		{  
            var obj = {}; 
            var num = i +1 
            var month = (data[i].date).substr((data[i].date).length-3, (data[i].date).length)
            var day = (data[i].date).substr(0,((data[i].date).indexOf('-'))); 
            var dateOb = new Date(1854, months[month], day, 0,0,0,0);
            obj["date"] = dateOb; 
            obj["deaths"] = (parseInt(data[i].deaths));
            deathDays.push(obj);  
                                        
        } 
        //console.log(deathDays);

		mapDeathDays()

    });