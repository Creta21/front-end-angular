/*
   Copyright John Manatakis. All rights reserved.
*/
$( window ).on( "load", function() {
    $(".center").css('display', 'none');
    $("#allForm").css('display', 'block');
});
//Typeahead For Airports names.
var substringMatcher = function(strs) {
  return function findMatches(q, cb) {
    var matches, substringRegex;
    matches = [];
    substrRegex = new RegExp(q, 'i');
    $.each(strs, function(i, str) {
      if (substrRegex.test(str)) {
        matches.push(str);
      }
    });
    cb(matches);
  };
};
var table = ['ARN - Stockholm Arlanda Airport, Stockholm, Sweden',
             'BCN - El Prat Airport, Barcelona, Spain',
             'CDG - Charles de Gaulle Airport, Paris, France',
             'DXB - Dubai International Airport, Dubai,  United Arab Emirates',
             'FRA - Frankfurt Airport, Frankfurt, Germany',
             'LHR - Heathrow Airport, London, England',
             'MUC - Munich Airport, Munich, Germany',
             'PRG - Prague Airport, Prague, Czech Republic',
             'RIX - Riga International Airport, Riga, Latvia',
             'TXL - Berlin Tegel Airport, Berlin, Germany'];

$('#the-basics .typeahead').typeahead({
  hint: true,
  highlight: true,
  minLength: 0
},
{
  name: 'table',
  source: substringMatcher(table),
  limit: 10
});
//Radio button One way - Round trip.
if($('#oneWayRadio').is(':checked')) {
    $("#returnOn").hide();  
}
$("#oneWayRadio").on('click', function(){
    $("#returnOn").hide();
    $("#from").datepicker('setEndDate', null);
    $("#to").val("");
});
$("#roundTripRadio").on('click', function(){
    $("#returnOn").show();
});
//For date picker.
var today = new Date();
$("#from, #to").datepicker({
    autoclose: true,
    todayBtn: true,
    clearBtn: true,
    todayHighlight: true
});
//set start date in leave.
$("#from").on('click', function(){
    $("#from").datepicker('setStartDate', today);
});
//set start date in return, from(leave).
$("#to").on('click', function(){
    if ($("#from").val() === ''){ //if leave on is empty.
        $("#to").datepicker('setStartDate', today);
    }else {
        $("#to").datepicker('setStartDate', $("#from").val());
    } 
});
//if leave date is > return date set it null
$("#from").on('change', function(){
    if($("#to").val() === ''){
        
    }else {
        if($("#from").val() > $("#to").val()){
            $("#to").val("");
        }
    }
});
$("#submitButton").on('click', function(){
    $("#allForm").css('display', 'none');
    $(".loading").css('display', 'block');
});
$("#history").on('click',function(){
    $("#allForm").css('display', 'none');
    $(".loading").css('display', 'block'); 
});

