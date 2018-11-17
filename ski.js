$(document).ready(function(){
    console.log("Ready to go!");
    getData();
});

/**
 * Fetching snow report using AJAX
 */
function getData() {
    let uri = "https://snowreporting.herokuapp.com/feed";

    $.ajax({
        url: uri,
        method: "GET",
        crossDomain: true,
        data: {
            resortId: 5
        }
    }).done(function(responseData){
        console.log(responseData);
    }).fail(function(error) {
        console.log(error);
    });
}