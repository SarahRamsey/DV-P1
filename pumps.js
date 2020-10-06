pumpData = [] 

function mapPumps(){

    var selection = d3.select('svg').select('g').selectAll("circle").data(pumpData); 
    var circles = selection.enter().append('circle'); 
    //circles.attr
    circles.attr("class", "pumps"); 
    circles.attr("cx", function(d){ return (d.x * 40)}); 

    circles.attr("cy", function(d){ return (d.y * 40)}); 
    
    circles.attr("r", 5); 

    circles.attr("stroke", "black") 
         .attr("fill", "black")
         .attr("stroke-width", "2"); 
    

    console.log(); 
    

}


d3.csv('pumps.csv', function(data) //function that handles the content of the file 

	{
        pumpData = data; 
        
			
		// loop through all years, from 1980 to 2012
		// for (var i = 0; i<data.length; i ++) 
		// {
		// 	var value = record[year];	
		// 	energyProduction.push(+value); //pushes the value onto the array
		// }

		mapPumps()

	});