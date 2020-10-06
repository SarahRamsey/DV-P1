var deathDays3 = []
var deathData = []
var ageCount = []; 


var margin = {top: 20, right: 100, bottom: 10, left: 50};
var width = 700-margin.left- margin.right; 
var height = 700-margin.top- margin.bottom

function functionDrawGenderGraph(){

    var radius = 150

    var maleCount = 0; 
    var femaleCount = 0;
    for(var i = 0; i < deathData.length; i ++){
        if(deathData[i].gender == "0"){
            maleCount ++; 
        }
        if(deathData[i].gender == "1"){
            femaleCount ++; 
        }
    }
    
    
    genderCount = [{"label":"male", "value":maleCount}, 
                    {"label":"female", "value":femaleCount}]; 

    var color = d3.scale.ordinal()
        .domain(genderCount)
        .range(["pink", "blue"])
        //test 

    var graphSVG = d3.select("body").select(".wrapper")
        .append("svg:svg")     
        .attr('id', "genderChart")         
        .data([genderCount])                   
        .attr("width", 450)          
        .attr("height", 550)
        .append("svg:g")                
        .attr("transform", "translate(" + radius + "," + radius+ ")");
       
       
    

    var arc = d3.svg.arc()             
        .outerRadius(radius);

    var pie = d3.layout.pie()           
        .value(function(d) { return d.value; });

    var x = 0; 
    var y = 0; 
    var arcs = graphSVG.selectAll("g.slice")     
        .data(pie)                          
        .enter()                            
        .append("svg:g")                
        .attr("class", "slice")
        .attr("stroke", "black")
        .style("stroke-width", "2px")
        .attr("font-size", "25px")
        //.style("opacity", 0.7);  

        arcs.append("svg:path")
            .attr("fill", function(d, i) { return color(i); } ) 
            .attr("d", arc);                                    

        arcs.append("svg:text")                                     
            .attr("transform", function(d) {                    
                d.innerRadius = 0;
                d.outerRadius = radius;
                x = (arc.centroid(d))[0]
                y = (arc.centroid(d))[1]
                return "translate(" + arc.centroid(d) + ")";       
            })
            .attr("text-anchor", "middle")                          
            .text(function(d, i) { return genderCount[i].label; })   



    graphSVG.append("text").attr("x", x).attr("y", y + radius +10)
        .style("font-size", "30px").attr("alignment-baseline","middle")
        .text("Gender");

    arcs.on("mouseover", function(d) {
        a = d3.select(this).select("#slice") 
        //console.log(d.data.label)

        if((d.data.label) == "male"){
            d3.select("#deaths").selectAll("circle").style("opacity", 0);
            d3.select("#deaths").selectAll("._g0").style("opacity", 1.0).attr("stroke", "blue") .attr("fill", "blue"); 
        }
        if((d.data.label) == "female"){
            d3.select("#deaths").selectAll("circle").style("opacity", 0);
            d3.select("#deaths").selectAll("._g1").style("opacity", 1.0).attr("stroke", "pink") .attr("fill", "pink"); 
        }
        //console.log(d.value); 

        var xPosition = (d3.select(this).attr("cx"));
        var yPosition = (d3.select(this).attr("cy"));

            // //tooltip label
        graphSVG.append("text")
            .attr("id", "tooltip")
            .attr("text-anchor", "middle")
            .attr("x", x+12)
            .attr("y", y+radius+40)
            .attr("font-family", "sans-serif")
            .attr("font-size", "20px")
            .attr("fill", "black")
            //.attr("background-color", "white")
            .text("Count: " + d.value )
            
    });
    
    arcs.on("mouseout", function(d) {
        d3.select("#deaths").selectAll("circle").style("opacity", 1).attr("stroke", "red") .attr("fill", "red");

        d3.select("#tooltip").remove();
    });
     

}
function functionDrawAgeGraph(){

    var radius = 150

    var age0 = 0;
    var age1 = 0; 
    var age2 = 0; 
    var age3 = 0; 
    var age4 = 0; 
    var age5 = 0;  

    for(var i = 0; i < deathData.length; i ++){
        if(deathData[i].age == "0"){
            age0 ++; 
        };
        if(deathData[i].age == "1"){
            age1 ++; 
        };
        if(deathData[i].age == "2"){
            age2 ++; 
        };
        if(deathData[i].age == "3"){
            age3 ++; 
        };
        if(deathData[i].age == "4"){
            age4 ++; 
        };
        if(deathData[i].age == "5"){
            age5 ++; 
        }
    }
     
    
    genderCount = [{"label":"0-10", "value":age0}, 
                    {"label":"11-21", "value":age1},
                    {"label":"21-40", "value":age2},
                    {"label":"41-60", "value":age3},
                    {"label":"61-80", "value":age4},
                    {"label":">80", "value":age5}]; 



    var color = d3.scale.ordinal()
        .domain(genderCount)
        .range(["purple", "pink", "green", "blue", "orange", "yellow"])

    var graphSVG2 = d3.select("body").select(".wrapper")
        .append("svg:svg")     
        .attr('id', "ageChart")         
        .data([genderCount])                   
        .attr("width", 400)          
        .attr("height", 550)
        .append("svg:g")                
        .attr("transform", "translate(" + radius + "," + radius+ ")") 


    var arc = d3.svg.arc()             
        .outerRadius(radius);

    var x = 0; 
    var y = 0; 

    var pie = d3.layout.pie()           
        .value(function(d) { return d.value; });    
    var arcs = graphSVG2.selectAll("g.slice")     
        .data(pie)                          
        .enter()                            
        .append("g")                
        .attr("class", "slice")
        .attr("id", function(d,i) {
            return "ageGroup" + genderCount[i].label})
        .attr("stroke", "black")
        .style("stroke-width", "2px")
        //.style("opacity", 0.7)

        arcs.append("path")
            .attr("fill", function(d, i) { return color(i); } ) 
            .attr("d", arc);

        arcs.append("text")                                     
            .attr("transform", function(d) {                    
        
            d.innerRadius = 0;
            d.outerRadius = radius;
            var points = arc.centroid(d)
            x = (arc.centroid(d))[0]
            y = (arc.centroid(d))[1]
            return "translate(" + arc.centroid(d) + ")";  
            

            })
            .attr("text-anchor", "middle")                          
            .text(function(d, i) { return genderCount[i].label ; })
            //.attr("visibility", "hidden"); 
    
    graphSVG2.append("text").attr("x", x+20 ).attr("y", y + radius +50)
        .style("font-size", "30px").attr("alignment-baseline","middle")
        .text("Age");
    
    arcs.on("mouseover", function(d) {
        a = d3.select(this).select("#slice") 
        console.log(d.data.label)

        if((d.data.label) == ">80"){
            d3.select("#deaths").selectAll("circle").style("opacity", 0);
            d3.select("#deaths").selectAll("._5").style("opacity", 1.0).attr("stroke", "purple") .attr("fill", "purple"); 
        }
        if((d.data.label) == "61-80"){
            d3.select("#deaths").selectAll("circle").style("opacity", 0);
            d3.select("#deaths").selectAll("._4").style("opacity", 1.0).attr("stroke", "yellow") .attr("fill", "yellow"); 
        }
        if((d.data.label) == "41-60"){
            d3.select("#deaths").selectAll("circle").style("opacity", 0);
            d3.select("#deaths").selectAll("._3").style("opacity", 1.0).attr("stroke", "orange") .attr("fill", "orange"); 
        }
        if((d.data.label) == "21-40"){
            d3.select("#deaths").selectAll("circle").style("opacity", 0);
            d3.select("#deaths").selectAll("._2").style("opacity", 1.0).attr("stroke", "blue") .attr("fill", "blue"); 
        }
        if((d.data.label) == "11-21"){
            d3.select("#deaths").selectAll("circle").style("opacity", 0);
            d3.select("#deaths").selectAll("._1").style("opacity", 1.0).attr("stroke", "green") .attr("fill", "green"); 
        }
        if((d.data.label) == "0-10"){
            d3.select("#deaths").selectAll("circle").style("opacity", 0);
            d3.select("#deaths").selectAll("._0").style("opacity", 1.0).attr("stroke", "pink") .attr("fill", "pink"); 
        }
        
        graphSVG2.append("text")
            .attr("id", "tooltip")
            .attr("text-anchor", "middle")
            .attr("x", x+12)
            .attr("y", y+radius+80)
            .attr("font-family", "sans-serif")
            .attr("font-size", "20px")
            .attr("fill", "black")
            //.attr("background-color", "white")
            .text("Count: " + d.value )
    });
    
    arcs.on("mouseout", function(d) {
        d3.select("#deaths").selectAll("circle").style("opacity", 1).attr("stroke", "red") .attr("fill", "red");
        d3.select("#tooltip").remove();
    });

                                          

         
           



}





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
            deathDays3 = temp
            //console.log(deathDays3)
        });

d3.csv('deaths_age_sex.csv', function(data) //function that handles the content of the file 

{ 
    temp = []
    
    for(var i = 0; i < data.length; i ++){

        var obj = {}; 
        var num = i +1         
        obj["x"] = (data[i].x); 
        obj["y"] = (data[i].y); 
        obj["age"] = (data[i].age);
        obj["gender"] = (data[i].gender);
        obj["deathDay"] = deathDays3[i].date;
            // { if(deathhDays == 
                
            //     deathDays3[i].date;
        
        temp.push(obj);
        }
            
    deathData = temp; 
    
    functionDrawGenderGraph()
    functionDrawAgeGraph()
            
    
});        