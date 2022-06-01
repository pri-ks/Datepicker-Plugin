
var styles = "@import url('https://fonts.googleapis.com/css?family=Lato:400,700');\
 ul {padding:0;margin:0;list-style-type: none}\
 .clearfix:before, .clearfix:after {content: '\0020';display: block;overflow: hidden;visibility: hidden;width: 0;height: 0}\
 .clearfix:after {clear: both}\
 .clearfix {zoom: 1}\
 .calmonth {background:#ff9472;background-image: linear-gradient(to left, #f2709c, #fa7790, #fe7f84, #ff897a, #ff9472);text-align: center;position:relative;margin: 0px auto;padding: 15px 0;letter-spacing: 1px}\
 .calmonth li {font-size: 18px;height:22px;display: inline;cursor:pointer;margin:2px;font-weight: bold;color:#fff}\
 .calmonth .prev {float: left;padding-top: 10px}\
 .calmonth .next {float: right;padding-top: 10px}\
 .active{background-color:#FFAFBD;border-radius: 3px; cursor: pointer;color:#000}\
 .sysdt{background-color:#ED4264 ;color:#fff ;border-radius: 3px; cursor: pointer}\
 .dateHover{background-color: #FFB88C ;border-radius: 3px; cursor: pointer;color:#000}\
 .left, .right{cursor:pointer;font-size:20px;vertical-align: middle}\
 .displayDate{position:relative}\
 .calweekdays {margin: 0;padding:10px;font-weight:700; letter-spacing: 1px}\
 .calweekdays li {float:left;font-size: 14px;display: inline;width: 10.2%;color:#000;text-align: center;padding:0 1%;margin:0 1%}\
 .caldays {height:210px;color: #3F3F45;padding:0 10px}\
 .caldays li {float:left;display: inline;width: 10.2%;text-align: center;font-size:13px;font-weight: bold;padding: 3px 1%;margin:3px 1%}\
 #datecontainer{font-family:'Lato',Arial;width:275px;margin-top:5px;box-shadow: 0px 1px 10px 4px #eee;letter-spacing:1px; background-color:#fefefe; position:absolute; z-index:999}\
 #prevYr, #prevMt, #nextYr, #nextMt{position:absolute;top:50%;margin-top:-11px;font-size: 22px;line-height: 22px}\
 #prevYr{left:20px}\
 #prevMt{left:50px}\
 #nextMt{right:50px}\
 #nextYr{right:20px}\
 #currYr, #currMt{text-align:center;cursor: initial; padding:0 4px;font-weight: normal}";
var css = document.createElement('style');
  css.type = 'text/css';
  if (css.styleSheet) css.styleSheet.cssText = styles;
  else css.appendChild(document.createTextNode(styles));
  document.getElementsByTagName("head")[0].appendChild(css);


month=["Jan", "Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
var today = new Date();
var cdate=today.getDate();
var cmonth=today.getMonth();
var cyr=today.getFullYear();
var move=cdate;

//Maps current month
function MonthMapper(currmonth)
{
	for(i=0;i<12;i++)
	{
		if(currmonth == month[i])
		{ 
			return i;
			break;
		}
	}
}
//dynamic elements generation
function DatePicker()
{		
	var act=document.activeElement;
	var wrp=act.parentNode;
	var chosendate=act.value;

	var storedt=chosendate.split(" ",3);
	var sdate= parseFloat(storedt[0]) || 0;
	var smonth=storedt[1];
	var syr=parseFloat(storedt[2]) || 0;

	if(document.querySelector("#datecontainer"))
	{	
		var currdatebox = document.getElementById("datecontainer");
		currdatebox.outerHTML="";
    }
	if(!(wrp.querySelector("#datecontainer")))
	{
		var datebox=document.createElement("DIV");
		datebox.setAttribute('id','datecontainer');

		var monthbox=document.createElement("UL");
		monthbox.className="calmonth";
		monthbox.setAttribute('id','header');

		var li1=document.createElement("LI");
		li1.setAttribute('id','prevYr');
		var span1=document.createElement("SPAN");
		li1.appendChild(span1);
		span1.innerHTML='&#8612;';
		
		var li2=document.createElement("LI");
		li2.setAttribute('id','prevMt');
		var span2=document.createElement("SPAN");
		li2.appendChild(span2);
		span2.innerHTML='&#8610;';

		var li3=document.createElement("LI");
		li3.setAttribute('id','currMt');

		var li4=document.createElement("LI");
		li4.setAttribute('id','currYr');

		var li5=document.createElement("LI");
		li5.setAttribute('id','nextMt');
		var span3=document.createElement("SPAN");
		li5.appendChild(span3);
		span3.innerHTML='&#8611;';

		var li6=document.createElement("LI");
		li6.setAttribute('id','nextYr');
		var span4=document.createElement("SPAN");
		li6.appendChild(span4);
		span4.innerHTML='&#8614;';

		monthbox.appendChild(li1);
		monthbox.appendChild(li2);
		monthbox.appendChild(li3);
		monthbox.appendChild(li4);
		monthbox.appendChild(li5);
		monthbox.appendChild(li6);

		var weekbox=document.createElement("UL");
		weekbox.className="calweekdays clearfix";	
		var weekname=["Su","Mo","Tu","We","Th","Fr","Sa"];
		
		for(var i=0; i<weekname.length; i++)
		{
		    var li7=document.createElement('li');
		  	li7.innerHTML=weekname[i];
		    weekbox.appendChild(li7);
		}
		var daysbox=document.createElement("UL");
		daysbox.className="caldays clearfix";
		daysbox.setAttribute('id','mdays');
		for(var i=0; i<37; i++)
		{
		    var li8=document.createElement('li');
		    li8.setAttribute('id','dt'+i);
		    daysbox.appendChild(li8);
		}
		datebox.appendChild(monthbox);
		datebox.appendChild(weekbox);
		datebox.appendChild(daysbox);
		wrp.appendChild(datebox);
		if(chosendate=="" || chosendate==null )
		{
			currentMonth(cdate,month[cmonth],cyr);
		}
		else{
			currentMonth(sdate,smonth,syr);
		}
	}
	else{
		wrp.querySelector("#datecontainer").style.display="block";
	}

	// Place datepicker relative to input box
	 var toppix = wrp.querySelector(".displayDate"); 
  	 document.getElementById("datecontainer").style.top = "" + (toppix.offsetTop + toppix.offsetHeight) + "px";

  	 var leftpix = wrp.querySelector(".displayDate"); 
  	 document.getElementById("datecontainer").style.left = "" + leftpix.offsetLeft + "px";
}

//Maps dates of required month 
function DateMapper(n,curr,year,sdate)
{   
	var act=document.activeElement;
    var wrp=act.parentNode;
    var selTemp=wrp.querySelector("#datecontainer").querySelector("#mdays");
	for (i=0; i <37;i++)
	{ 			         
		x="dt" + i;
		selTemp.querySelector("#" + x).innerHTML="";
	} 
	var num=1;    
    if(n==0 ||n==2 ||n==4 ||n==6 ||n==7 ||n==9 ||n==11 )
    { 
        for (i=curr; i <37;i++)
		{ 
			if(num<=31)
			{
				x="dt" + i;
				selTemp.querySelector("#" + x).innerHTML=num;
				num++;
			}
		} 
    } 
    else if(n==3 ||n==5 ||n==8 ||n==10)
    {
        for (i = 0; i <37;i++)
        { 
            if(i>=curr && num<=30)
            {
                x="dt" + i; 
                selTemp.querySelector("#" + x).innerHTML=num;
                num++; 
            } 
        }
    }  
    else if(n==1)
    {
        if( (year % 4 == 0) && (year % 100 != 0) || (year % 400 == 0) )
        {
            for (i = 0; i <37;i++)
            { 
               if(i>=curr && num<=29)
               {
              	   x="dt" + i;
              	   selTemp.querySelector("#" + x).innerHTML=num;
                   num++;
               }
            }
        }
        else
        {
            for (i = 0; i <37;i++)
            { 
                if(i>=curr && num<=28)
                {
                   x="dt" + i;
                   selTemp.querySelector("#" + x).innerHTML=num;
                   num++;
                }
            }
        }
    } 
    //highlight system's current date
    if(n==cmonth && year==cyr)
    {
		for(i=0;i<37;i++)
		{
			if(document.getElementById("dt" +i).innerHTML==cdate)
			{
			  document.getElementById("dt" +i).className="sysdt";
			}
			document.getElementById("dt" +i).className =
								document.getElementById("dt" +i).className.replace( /(?:^|\s)active(?!\S)/g , '' );
		}
	} 
	else
	{
		for(i=0;i<37;i++)
		{	
		document.getElementById("dt" +i).className="";
		}
	}
}
//displays current month 
function currentMonth(sdate,smonth,syr)
{  
	move=sdate;
	var act=document.activeElement;
   	var wrp=act.parentNode;
	var i;
	wrp.querySelector("#currMt").innerHTML=smonth;
	var n = MonthMapper(smonth);
	var c = new Date(syr,n,1);
	wrp.querySelector("#currYr").innerHTML = syr; 
	var curr=c.getDay();
	DateMapper(n,curr,syr,sdate);
	for (i=0; i <37;i++)
	{ 			         
		if(wrp.querySelector("#datecontainer").querySelector("#mdays").querySelector("#dt" + i).innerHTML==sdate && sdate!=cdate)
		{
			wrp.querySelector("#datecontainer").querySelector("#mdays").querySelector("#dt" + i).className+=" active";
		}
		
	} 
	wrp.querySelector("#prevYr").onclick=prevYear;
	wrp.querySelector("#prevMt").onclick=prevMonth;	
	wrp.querySelector("#nextMt").onclick=nextMonth;
	wrp.querySelector("#nextYr").onclick=nextYear;

	//picks date from datepicker
	var daysul = wrp.querySelector("#datecontainer").querySelector("#mdays"); 
	if(daysul.addEventListener)
	{
		daysul.addEventListener('click',function(e)
		{
			e = e || window.event;
			var target = e.target; 
			
			while (target && target.parentNode !== daysul)
			{
				target = target.parentNode; 
				if(!target) { return; } 
			} 
			
			if (target.tagName === 'LI' && target.innerHTML != "")
			{   for (i = 0; i < daysul.children.length; i++)
				daysul.children[i].className = daysul.children[i].className.replace( /(?:^|\s)active(?!\S)/g , '' );
				var today=(e.target || e.srcElement).innerHTML;
				var selectmonth=wrp.querySelector("#currMt").innerHTML;
				var selectyear=wrp.querySelector("#currYr").innerHTML;
				act.value=today +" " + selectmonth + " " + selectyear;
				move=today;
				wrp.querySelector("#datecontainer").style.display="none";
				
			}
	    });	
	    daysul.addEventListener('mouseover',function(e)
		{
			e = e || window.event;
			var target = e.target;			
			while (target && target.parentNode !== daysul)
			{
				target = target.parentNode; 
				if(!target) { return; } 
			} 
			
			if (target.tagName === 'LI' && target.innerHTML != "")
			{   
				target.className+=" dateHover";
			}
		});
    	daysul.addEventListener('mouseout',function(e)
		{			
			e = e || window.event;
			var target = e.target; 						
			while (target && target.parentNode !== daysul)
			{
				target = target.parentNode; 
				if(!target) { return; } 
			} 
			
			if (target.tagName === 'LI' && target.innerHTML != "")
			{   
				target.className = target.className.replace( /(?:^|\s)dateHover(?!\S)/g , '' );
			}
		  });	
		}

	//picks date from datepicker for IE7 and IE8		
	else
	{    
	    daysul.attachEvent('onclick', 
	    function (e)
	    {
		    e=e || window.e;
			var target = e.target; 
			while (target && target.parentNode !== daysul)
			{
				target = target.parentNode; 
				if(!target) { return; } 
			}
			var tagname=(e.target || e.srcElement).tagName;
			if (tagname === 'LI' && ((e.target || e.srcElement).innerHTML !=""))
			{   
				var today=(e.target || e.srcElement).innerHTML;
				var selectmonth=document.getElementById('currMt').innerHTML;
				var selectyear=document.getElementById('currYr').innerHTML;
				act.value=today +" " + selectmonth + " " + selectyear;
				wrp.querySelector("#datecontainer").style.display="none";
			}
	    });
	    daysul.attachEvent('onmouseover',function(e)
		{
			e=e || window.e;
			var target = e.target; 
			while (target && target.parentNode !== daysul)
			{
				target = target.parentNode; 
				if(!target) { return; } 
			}
			var tagname=(e.target || e.srcElement).tagName;
			if (tagname === 'LI' && ((e.target || e.srcElement).innerHTML !=""))
			{   
				(e.target || e.srcElement).className+=" dateHover";
			}
		});
    	daysul.attachEvent('onmouseout',function(e)
		{	
			e=e || window.e;
			var target = e.target; 
			while (target && target.parentNode !== daysul)
			{
				target = target.parentNode; 
				if(!target) { return; } 
			}
			var tagname=(e.target || e.srcElement).tagName;
			if (tagname === 'LI' && ((e.target || e.srcElement).innerHTML !=""))
			{  
				(e.target || e.srcElement).className = (e.target || e.srcElement).className.replace( /(?:^|\s)dateHover(?!\S)/g , '' );
			}
		});
    }
}  

function prevMonth()
{  	
	var act=document.activeElement;
   	var wrp=act.parentNode;
	var i;
	var currmonth=wrp.querySelector("#currMt").innerHTML;	   
	currmonth=MonthMapper(currmonth);
	var curryr=wrp.querySelector("#currYr").innerHTML ;
	var prevmonth=currmonth-1;
	if(currmonth==0)
	{
		curryr--;
		prevmonth=11;
	}	
	for(i=0;i<12;i++)
	{
		if(i==prevmonth)
		{
			wrp.querySelector("#currMt").innerHTML = month[i];
			break; 
	    }
	}
	wrp.querySelector("#currYr").innerHTML  = curryr;
	var d = new Date(curryr,prevmonth,1);
	var n=prevmonth;       
	var curr=d.getDay();
	DateMapper(n,curr,curryr);
}

function nextMonth()
{
	var act=document.activeElement;
   	var wrp=act.parentNode;
    var i;
	var currmonth=wrp.querySelector("#currMt").innerHTML ;	   
	currmonth=MonthMapper(currmonth);
	var curryr=wrp.querySelector("#currYr").innerHTML;
	var nextmonth=currmonth+1;
	if(currmonth==11)
	{
		    curryr++;
		    nextmonth=0;
	}
	for(i=0;i<12;i++)
	{
		if(i==nextmonth)
		{
			wrp.querySelector("#currMt").innerHTML = month[i];
			break; 
	    }
	}
	wrp.querySelector("#currYr").innerHTML = curryr;
	var d = new Date(curryr,nextmonth,1);
	var n=nextmonth;       
	var curr=d.getDay();
	DateMapper(n,curr,curryr);
}

function prevYear()
{
	var act=document.activeElement;
   	var wrp=act.parentNode;
    var i;
	var currmonth=wrp.querySelector("#currMt").innerHTML;	
	var curryr=wrp.querySelector("#currYr").innerHTML ;
	currmonth=MonthMapper(currmonth);
	curryr--;
	wrp.querySelector("#currYr").innerHTML  = curryr;
	var d = new Date(curryr,currmonth,1);
	var n=currmonth;       
	var curr=d.getDay();
	DateMapper(n,curr,curryr);   
}

function nextYear()
{
	var act=document.activeElement;
   	var wrp=act.parentNode;
    var i;
	var currmonth=wrp.querySelector("#currMt").innerHTML;
	var curryr=wrp.querySelector("#currYr").innerHTML ;
	currmonth=MonthMapper(currmonth);   
	curryr++;
	wrp.querySelector("#currYr").innerHTML  = curryr;
	var d = new Date(curryr,currmonth,1);
	var n=currmonth;
	var curr=d.getDay();
	DateMapper(n,curr,curryr);
	    
}


//counts the no of days in a given month
function DaysOfMonth(thismonth,year)
{
	if(thismonth==0 ||thismonth==2 ||thismonth==4 ||thismonth==6 ||thismonth==7 ||thismonth==9 ||thismonth==11 )
	{
		 nd = 31;
		 return nd;
	}
	else if(thismonth==3 ||thismonth==5 ||thismonth==8 ||thismonth==10){
		 nd = 30;
		 return nd;
	}
	else if(thismonth==1){
			if( (year % 4 == 0) && (year % 100 != 0) || (year % 400 == 0) )
			{	nd = 29;
			   return nd;
			}
			else
			{
				 nd = 28;
				 return nd;
			}
	}		
}
function keyMovements(e) 
{	
	var act=document.activeElement;
    var wrp=act.parentNode;
	if(wrp.querySelector("#datecontainer"))
	{
		var i=0; 
		var thismonth=wrp.querySelector("#currMt").innerHTML;
		var year=wrp.querySelector("#currYr").innerHTML
		thismonth=MonthMapper(thismonth);
		e = e || window.event;
		
		switch(e.keyCode)
		{
			case 37:
					move--;
					var nd = 0;
					if(move<1)
					{   
						prevMonth();
						thismonth-=1;
						if(thismonth<1)
						{
							thismonth = 11;
						}
						nd=DaysOfMonth(thismonth,year);
						move = nd;  
					}	

					for(i=0;i<37;i++)
					{      	
						if(document.getElementById("dt" + i).innerHTML ==move && document.getElementById("dt" + i).innerHTML !="")
						{   
							if(i<36)
							{
								document.getElementById("dt" +(i+1)).className =
								document.getElementById("dt" +(i+1)).className.replace( /(?:^|\s)active(?!\S)/g , '' );
							}
							document.getElementById("dt" +i).className+=" active";
						}     
					}
					break;	
			case 38:
					move=move-7;
					var nd = 0;
					if(move<1)
					{
						prevMonth();
						if(thismonth==0)
						{
							thismonth=11;
							year=year-1;
						}
						else
						{
							thismonth-=1;
						}
						nd=DaysOfMonth(thismonth,year);
						move=move+nd;
					}	
					for(i=0;i<37;i++)
					{      	
						if(document.getElementById("dt" + i).innerHTML == move && document.getElementById("dt" + i).innerHTML != "")
						{
							if (i+7 < 37)
							{
								document.getElementById("dt" +(i+7)).className =
								document.getElementById("dt" +(i+7)).className.replace( /(?:^|\s)active(?!\S)/g , '' );
							}
							document.getElementById("dt" +i).className+=" active";
						}
					}
				    break;

			case 39:
					move++;
					var nd = 0;
					nd=DaysOfMonth(thismonth,year);
					if(move>nd)
					{ 
					 	move=1;
						nextMonth();
						thismonth+=1;
					}
					for(i=0;i<37;i++)
					{       	
						if(document.getElementById("dt" + i).innerHTML == move && document.getElementById("dt" + i).innerHTML != "")
						{   
						    if(i>0)
						    {
						        document.getElementById("dt" +(i-1)).className =
						        document.getElementById("dt" +(i-1)).className.replace( /(?:^|\s)active(?!\S)/g , '' );
						    }
						    document.getElementById("dt" +i).className+=" active";
						}    
					}
					break;

			case 40:
					move=move+7;
					var nd = 0;
					nd=DaysOfMonth(thismonth,year);
					if(move>nd)
					{
						nextMonth();
						thismonth+=1;
						move=move-nd;
					}	
					for(i=0;i<37;i++)
					{      	
						if(document.getElementById("dt" + i).innerHTML ==move && document.getElementById("dt" + i).innerHTML != "")
						{   
						    if(i-7>=0)
						    {
						        document.getElementById("dt" +(i-7)).className =
						        document.getElementById("dt" +(i-7)).className.replace( /(?:^|\s)active(?!\S)/g , '' );
						    }
						    
						    document.getElementById("dt" +i).className+=" active";
						}     
					}
					break;
			case 13:
					var daysmonthbox = document.getElementById("mdays");
				    var today=move;
				    var selectmonth=wrp.querySelector("#currMt").innerHTML;
				    var selectyear=wrp.querySelector("#currYr").innerHTML;
				    var nodelen=document.querySelectorAll(".displayDateWrap").length;
				    for(nodeindex=0;nodeindex<nodelen;nodeindex++){
				    	if(document.querySelectorAll(".displayDateWrap")[nodeindex].querySelector("#datecontainer")){
				    	 document.querySelector("#datecontainer").parentNode.querySelector(".displayDate").value=today +" " + selectmonth + " " + selectyear;
				    	}
				    }
					wrp.querySelector("#datecontainer").style.display="none";	       		
		}	
	}	        							
}
//Keyboard events to browse through months
	if(document.addEventListener){
	addEventListener("keydown",keyMovements);
	}
	else{
	document.attachEvent("onkeydown",keyMovements);	
	}
