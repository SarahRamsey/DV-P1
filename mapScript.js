var streets = []; 

var margin = {top: 10, right: 10, bottom: 20, left: 20};
    var width = 900-margin.left- margin.right; 
    var height = 900-margin.top- margin.bottom

var mapSVG = d3.select("body").select(".wrapper").append("svg").attr("id","mapSVG")
        .attr("width", width)
        .attr("height", height) 
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


                
var selection = d3.select("#mapSVG").select('g')


function drawMap() {
    
    for (var i = 0; i < streets.length; i++){                  
        drawLine(streets[i])
    }
    console.log()
}  

function drawLine(d) {  

    var num = d.length
    for(var j = 0; j < num-1; j ++){ // determines # of lines based off of # of objects
                
        var line = selection.append('line').style("stroke", "black");

        line.attr("x1", d[j].x); 
        line.attr("y1", d[j].y);
        line.attr("x2", d[j+1].x);
        line.attr("y2", d[j+1].y);
                        
    }

    

}                     

d3.json('streets.json', function(data)  //function that handles the content of the file 
{    
        streets = []; 
        temp = [];                
        for(var i = 0; i< data.length; i ++){
            temp = []; 
            for(var j = 0; j < data[i].length; j++){
                var obj = {}; 
                var num = j +1         
                obj["x"] = ((data[i])[j].x)*40; 
                obj["y"] = ((data[i])[j].y)*40; 
                temp.push(obj);  
                                    
        }
        streets.push(temp);
                                
    }
                            
    drawMap();    

});    


///-------------pumps 
pumpData = [] 

function mapPumps(){

    var selection = d3.select('#mapSVG').select('g').selectAll("circle").data(pumpData); 
    var circles = selection.enter().append('circle'); 
    
    circles.attr("class", "pumps"); 
    circles.attr("cx", function(d){ return (d.x * 40)}); 

    circles.attr("cy", function(d){ return (d.y * 40)}); 
    
    circles.attr("r", 5); 

    circles.attr("stroke", "black") 
         .attr("fill", "black")
         .attr("stroke-width", "2"); 
    
    console.log(); 
    

}

var mapDot = d3.select("#mapSVG").selectAll(".pumps")

    mapDot.on("mouseover", function(d) {
        d3.select(this)
            .attr("stroke", "pink") 
            .attr("fill", "pink")
    })



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
    


//// - deaths 

deathData = [] 

function mapDeaths(){


    var selection = d3.select('#mapSVG').append('g').attr("id", "deaths").selectAll("circ").data(deathData); 
    var circles2 = selection.enter().append('circle')
        // .attr("id", function(d){
        //     return "_" + (d.deathDay).getMonth( ) + "-" + (d.deathDay).getDate()})
        .attr("class", function(d){return "_" + (d.deathDay).getMonth( ) + "-" + (d.deathDay).getDate() + ' _g' + d.gender + ' _' + d.age})
    


    circles2.attr("cx", function(d){ return (d.x * 40)}); 

    circles2.attr("cy", function(d){ return (d.y * 40)}); 
    
    circles2.attr("r", 4.5); 

    circles2.attr("stroke", "red").attr("fill", "red").attr("stroke-width", "2"); 
    
    
    var deathDots = d3.select("#mapSVG").selectAll("#deaths").selectAll("circle")

    deathDots.on("mouseover", function(d){ 
        d3.select(this)
            .attr('r', 7)
        console.log(d)
        
        function genderf(d){
            if(d.gender = "0") {
                return "male";}
            if(d.gender = '1') {
                return "female";};  
        }
        function agef(d){
            if(d == "0"){
                return "0-10"; 
            };
            if(d == "1"){
                return "11-20"; 
            };
            if(d == "2"){
                return "21-40"; 
            };
            if(d == "3"){
                return "41-60"; 
            };
            if(d == "4"){
                return "61-80"; 
            };
            if(d == "5"){
                return ">80"; 
            };
        }
        //tooltip label
        mapSVG.append("text")
           .attr("id", "tooltip")
           //.attr("text-anchor", "middle")
           .attr("x", 220)
           .attr("y", 120)
           .attr("font-family", "sans-serif")
           .attr("font-size", "22px")
           .attr("font-weight", "bold")
           .attr("fill", "black")
           //.attr("background-color", "white")
           .text("Died on:" + (d.deathDay).getMonth() + "/" +(d.deathDay).getDate() + ", Gender: " + genderf(d.gender) + ", Age Range: " + agef(d.age))
        }); 
    deathDots.on("mouseout", function(d){ 
        d3.select(this)
            .attr('r', 4.5)

        d3.select("#tooltip").remove();
        
    })

    console.log(); 


}




// Create key 
var key = d3.select("#mapSVG").append('g').attr('id', 'mapKey') ; 
    key.append("circle").attr("cx",200).attr("cy",800).attr("r", 6).style("fill", "red").attr("id", "deathmarker")
    key.append("circle").attr("cx",200).attr("cy",830).attr("r", 6).style("fill", "black")
    key.append("text").attr("x", 220).attr("y", 800).text("Deaths").style("font-size", "20px").attr("alignment-baseline","middle")
    key.append("text").attr("x", 220).attr("y", 830).text("Pumps").style("font-size", "20px").attr("alignment-baseline","middle")


// Create other view options
var mapOptions = d3.select("#mapSVG").append('g').attr('id', 'mapOptions'); 
    mapOptions.append("text").attr("x", width-200).attr("y", 800).text("Select a view:").style("font-size", "20px").attr("alignment-baseline","middle")
    mapOptions.append("circle").attr("class", 'gender').attr("cx",width-230).attr("cy",830).attr("r", 6).attr("fill", "white").attr("stroke", "black")
    mapOptions.append("circle").attr("class", 'age').attr("cx",width-230).attr("cy",860).attr("r", 6).attr("fill", "white").attr("stroke", "black")
    mapOptions.append("text").attr("x", width-200).attr("y", 830).text("Gender").style("font-size", "20px").attr("alignment-baseline","middle")
    mapOptions.append("text").attr("x", width-200).attr("y", 860).text("Age").style("font-size", "20px").attr("alignment-baseline","middle")

var genderDot = d3.select("#mapSVG").selectAll(".gender")

    genderDot.on("mouseover", function(d) {
        d3.select(this)
            .attr("stroke", "black") 
            .attr("fill", "black")

        d3.select("#deaths").selectAll("._g0").style("opacity", 1.0).attr("stroke", "pink") .attr("fill", "pink")
        d3.select("#deaths").selectAll("._g1").style("opacity", 1.0).attr("stroke", "blue") .attr("fill", "blue")

        // gender key
        var genderKey = d3.select("#mapSVG").append('g').attr('id', 'genderKey'); 

        genderKey.append("circle").attr("cx",310).attr("cy",800).attr("r", 6).style("fill", "blue")
        genderKey.append("circle").attr("cx",310).attr("cy",830).attr("r", 6).style("fill", "pink")

        genderKey.append("text").attr("x", 330).attr("y", 800).text("male").style("font-size", "20px").attr("alignment-baseline","middle")
        genderKey.append("text").attr("x", 330).attr("y", 830).text("females").style("font-size", "20px").attr("alignment-baseline","middle")
        
        // add pumps
        genderKey.append("circle").attr("cx",200).attr("cy",830).attr("r", 6).style("fill", "black")
        genderKey.append("text").attr("x", 220).attr("y", 830).text("Pumps").style("font-size", "20px").attr("alignment-baseline","middle")


        })
        .on("mouseout", function(d) {
            d3.select(this)
                .attr("fill", "white")
                .attr("stroke", "black") 
                
            d3.select("#deaths").selectAll('circle')
                .attr("stroke", "red") 
                .attr("fill", "red")
                .attr("stroke-width", "2"); 

            d3.select(d3.select("#mapSVG").select("#genderKey").remove()); 
        })  

var ageDot = d3.select("#mapSVG").selectAll(".age")

    ageDot.on("mouseover", function(d) {
        d3.select(this)
            .attr("stroke", "black") 
            .attr("fill", "black")


        d3.select("#deaths").selectAll("._0").style("opacity", 1.0).attr("stroke", "pink") .attr("fill", "pink")
        d3.select("#deaths").selectAll("._1").style("opacity", 1.0).attr("stroke", "green") .attr("fill", "green")
        d3.select("#deaths").selectAll("._2").style("opacity", 1.0).attr("stroke", "blue") .attr("fill", "blue")
        d3.select("#deaths").selectAll("._3").style("opacity", 1.0).attr("stroke", "orange") .attr("fill", "orange")
        d3.select("#deaths").selectAll("._4").style("opacity", 1.0).attr("stroke", "yellow") .attr("fill", "yellow")
        d3.select("#deaths").selectAll("._5").style("opacity", 1.0).attr("stroke", "purple") .attr("fill", "purple")

        // age key
        var ageKey = d3.select("#mapSVG").append('g').attr('id', 'ageKey'); 

        ageKey.append("circle").attr("cx",310).attr("cy",800).attr("r", 6).style("fill", "pink")
        ageKey.append("circle").attr("cx",310).attr("cy",830).attr("r", 6).style("fill", "green")
        ageKey.append("circle").attr("cx",310).attr("cy",860).attr("r", 6).style("fill", "blue")
        ageKey.append("circle").attr("cx",460).attr("cy",800).attr("r", 6).style("fill", "orange")
        ageKey.append("circle").attr("cx",460).attr("cy",830).attr("r", 6).style("fill", "yellow")
        ageKey.append("circle").attr("cx",460).attr("cy",860).attr("r", 6).style("fill", "purple")
        
        ageKey.append("text").attr("x", 330).attr("y", 800).text("Ages 0-10").style("font-size", "20px").attr("alignment-baseline","middle")
        ageKey.append("text").attr("x", 330).attr("y", 830).text("Ages 11-20").style("font-size", "20px").attr("alignment-baseline","middle")
        ageKey.append("text").attr("x", 330).attr("y", 860).text("Ages 21-40").style("font-size", "20px").attr("alignment-baseline","middle")
        ageKey.append("text").attr("x", 480).attr("y", 800).text("Ages 41-60").style("font-size", "20px").attr("alignment-baseline","middle")
        ageKey.append("text").attr("x", 480).attr("y", 830).text("Ages 61-80").style("font-size", "20px").attr("alignment-baseline","middle")
        ageKey.append("text").attr("x", 480).attr("y", 860).text("Ages >80").style("font-size", "20px").attr("alignment-baseline","middle")
        
        // remove deaths key
        var key = d3.select("mapSVG").select("#mapKey").remove("#deathmarker"); 
    
       
        //d3.select(d3.select("#mapSVG").select("#mapKey").remove()); 

        }) 
        .on("mouseout", function(d) {
            d3.select(this)
                .attr("fill", "white")
                .attr("stroke", "black") 
                
            d3.select("#deaths").selectAll('circle')
                .attr("stroke", "red") 
                .attr("fill", "red")
                .attr("stroke-width", "2"); 

            var key = mapSVG.select('#mapKey'); 
            //key.show()
            
            //d3.select(d3.select("#mapSVG").select("#mapKey").remove()); 
            d3.select(d3.select("#mapSVG").select("#ageKey").remove()); 
        })  

        




deathDays2 = []

d3.csv('deathdays.csv', function(data) //function that handles the content of the file 
        {
            var months = {Aug:'07',Sep:'08'}; 
            var deathCount = 1; 
            temp = []
            for (var i = 0; i<data.length; i ++) 
            {  
                for(var j = 0; j < (parseInt(data[i].deaths)); j ++)
                    if(data[i].deaths >0){
                        var obj = {}; 
                        var num = i +1 
                        var month = (data[i].date).substr((data[i].date).length-3, (data[i].date).length)
                        var day = (data[i].date).substr(0,((data[i].date).indexOf('-'))); 
                        var dateOb = new Date(1854, months[month], day, 0,0,0,0);
                        obj["date"] = dateOb; 
                        obj["deaths"] = (parseInt(data[i].deaths));

                        temp.push(obj);
                    }
                                                 
            }   
            deathDays2 = temp
            //console.log(deathDays2); 
        });

d3.csv('deaths_age_sex.csv', function(data) //function that handles the content of the file 

	{
        deathData = data; 
        temp =[]

        for(var i = 0; i < deathData.length; i ++){
            var obj = {}; 
            var num = i +1         
            obj["x"] = (data[i].x); 
            obj["y"] = (data[i].y); 
            obj["age"] = (data[i].age);
            obj["gender"] = (data[i].gender);
            obj["deathDay"] = deathDays2[i].date;
            temp.push(obj);
        }
        
        deathData = temp; 
        //console.log(deathData); 
        mapDeaths()
        //mapDeathDays()
        

    });
    
