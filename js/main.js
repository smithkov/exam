//Author: Nnamdi Nwosu
var originalArray = [];
var newArray =[];

var app = angular.module("test", []);
//Function that ensures a textbox does not accept input other than integer
function validate(evt) {
  var theEvent = evt || window.event;
  var key = theEvent.keyCode || theEvent.which;
  key = String.fromCharCode( key );
  var regex = /[0-9]|\./;
  if( !regex.test(key) ) {
    theEvent.returnValue = false;
    if(theEvent.preventDefault) theEvent.preventDefault();
  }
}

//This controller basically handles character matching
app.controller("charInString", function($scope) {
    $scope.string1;//input for first value
    $scope.string2;//input for second value
	//$order = null;
	
	var errorMsg = "Make sure you enter valid characters";
	var notFound = "No matching string found!";
	$scope.result = function(string1,string2){
		if(string1 === "" || string2 === "")//Validation that prompts user to enter data
			{
				alert("You must enter the values of string1 and string2")  //Alerts if value is null
			}
			else{
				switch($scope.order){//Checks the order selected
					case "Order N*N":  //condition is met if user selects Order N*N
						find_chars();
					     break;
					case "Order N":  //condition is met if user selects Order N
						find_chars2();
						break;
					default:
						alert("Select Order");//Alerts if nothing was selected
				}
			}	
			 
	}
	$scope.reset = function(){
		$scope.string1 = "";
	    $scope.string2 = "";
		$scope.answer ="";
	}
	function find_chars(){//using O(N2)
		var finalResult="";
		try{
			
			for(var i=0;$scope.string1.length >i;i++)//Iterating through string1
			{
				for(var u=0;$scope.string2.length >u;u++)// Iterating through string2 (nested loop)
				{
					if($scope.string1[i] === $scope.string2[u] )//Checks for matching char
					{
						if(finalResult.search($scope.string1[i]) == -1) //Searches for string1
						   finalResult+=$scope.string1[i];
						
					}	
				}
				
			}
			getResult(finalResult);
			
		    
		}
		catch(e){
			alert(errorMsg)
		}
		
		
	}
	function find_chars2(){//Using O(N)
		var finalResult="";
		try{
			for(var i=0;$scope.string1.length >i;i++){
			if($scope.string2.search($scope.string1[i]) !== -1)
			{
				if(finalResult.search($scope.string1[i])=== -1)
					finalResult+= $scope.string1[i];
			}
		}
		getResult(finalResult);
		}
		catch(e){
			alert(errorMsg)
		}
		
	}
	
	function getResult(finalResult){
		return finalResult ===""?(alert(notFound)):($scope.answer = finalResult);
	}
});
//Array compaction controller
app.controller("compaction", function($scope) {
	$scope.arrayVal = "";
	
	
	$scope.addToArray = function(val){// This function/scope adds values to array
		if(val != "")
		{
			originalArray.push($scope.arrayVal);
			$scope.origArray = JSON.stringify(originalArray);
		}
		else
			alert("Array value can't be empty");
			
		$scope.arrayVal = "";
		
	}
	
	$scope.compact = function(){
		angular.forEach(originalArray, function(value, key) {
			
		  if(newArray.indexOf(value) === -1)
			  newArray.push(value);
		});
		 $scope.newArr = JSON.stringify(newArray);
	}
	$scope.resetArray = function(){
		originalArray = [];
	    newArray =[];
		$scope.origArray = null;
		$scope.newArr = null;
	}
});
//Array rotation controller
app.controller("rotation", function($scope) {
	$scope.arrayVal = "";
	$scope.position = "";
	$scope.addToArray = function(val){
		
		if(val !== "")
		{
			originalArray.push(val);
			$scope.origArray = JSON.stringify(originalArray)
		}
		else
			alert("Array value can't be empty");
		
		$scope.arrayVal = "";
		
	}
	$scope.rotate = function(){
		var count = $scope.position;
		var rotateArray=[]; //array that will be rotated
		var remainingArray=[]; //array that contains remaining elements after some elements must have been taken for rotation
		if($scope.position ==="")
		{
			alert("Please enter a the position");
		}
		
		else if(originalArray.length <1)
		{
			alert("Array cannot be empty")
		}
		else{
			if(originalArray.length< $scope.position)
		        alert("Position cannot exceed number of elements");
		   else{
			   for(var i= originalArray.length-1;i>-1; i--)
			   {
				  // alert("count"+count+" i:"+ i)
				   if( count>0)
				   {
					   rotateArray.unshift(originalArray[i]);
					   count--;
				   }
					   
				  else
					  remainingArray.unshift(originalArray[i]);
			   }

			   var result = rotateArray.concat(remainingArray);
		   }
		
		 $scope.newArr = JSON.stringify(result);
		}
		
	}
	$scope.resetArray = function(){
		rotateArray = [];
	    remainingArray =[];
		originalArray =[];
		$scope.origArray = null;
		$scope.newArr = null;
	}
});

//LCM controller
app.controller("LCM", function($scope) {
	var lcm = 1;
	$scope.arrayVal = "";
	var integerArray = [];
	$scope.addToArray = function(val){
		if(val !== "")
		{
			integerArray.push($scope.arrayVal);
			$scope.arrayOfNum = JSON.stringify(integerArray) ;
		}
		else
		{
			alert("Array value can't be empty")
		}
        
		$scope.arrayVal = "";
	}
	var denominator = 2;
	$scope.FindLCM = function(){
		if(integerArray.length < 2)
		{
			alert("You are to enter an array of numbers");
		}
		else{
			var result = LCM(denominator);
			angular.forEach(arrNew, function(value, key) {
			lcm *= value;
			});
			$scope.result= arrNew + ". answer = "+lcm;
		}
		
	
	
	
	}
	
	var allEqualOne = 0;
	var arrNew =[];
	
	
	
	var isDivisible = false;
	//Basically this function calculates LCM by recursively
	function LCM(denominator){
		isDivisible =false;
		var roundTrip = integerArray.length;
		var count =integerArray.length;
		allEqualOne =0;// This variable is used to track when all numbers is equal to one to halt the process otherwise it results to infinite loop
		count--; //Count decreases as it iterates
		roundTrip--;//this is the total number of iteration done per trip
		
		while(roundTrip>-1)
		{
			console.log(roundTrip);
			
			
			if(integerArray[count]%denominator === 0)//If method is equal to zero then is a multiple
			{
				isDivisible	= true;		
				
				integerArray[count] = integerArray[count]/ denominator;	    			
			}
			if(integerArray[count] ===1)// This checks if any number is equal to one
			{
				allEqualOne++;
			}
			if(roundTrip === 0)
			{
				if(!isDivisible){//If isdivisible is false the denominator should increase by one
					console.log("value: 2"+integerArray[count]+ "divider: "+ denominator)
				  denominator++;
                  
				}
				else{
					arrNew.push(denominator);
					console.log("denominator : "+denominator);
				}
					
						  
			}	
            if(allEqualOne === integerArray.length)//Check if all numbers are equal to one
				return arrNew;
			
			roundTrip--;
			count--;
		}
		console.log("...................................");
		 LCM(denominator);//Calls itself. recursion
		 console.log(arrNew);
	}
	$scope.resetArray = function(){
		integerArray = [];
	    arrNew =[];
		originalArray =[];
		$scope.arrayOfNum = null;
		$scope.result = null;
	}
	
});