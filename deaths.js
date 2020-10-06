deathData = [] 

function mapDeaths(){

    var selection = d3.select('svg').select('g').selectAll("circ").data(deathData); 
    var circles2 = selection.enter().append('circle');
    //circles.attr

    circles2.attr("cx", function(d){ return (d.x * 40)}); 

    circles2.attr("cy", function(d){ return (d.y * 40)}); 
    
    circles2.attr("r", 5); 

    circles2.attr("stroke", "red") 
        .attr("fill", "red")
        .attr("stroke-width", "2"); 
    

    console.log(); 
    

}


d3.csv('deaths_age_sex.csv', function(data) //function that handles the content of the file 

	{
        deathData = data; 
        
		// for (var i = 0; i<data.length; i ++) 
		// {
		// 	var value = record[year];	
		// 	energyProduction.push(+value); //pushes the value onto the array
		// }

		mapDeaths()

	});