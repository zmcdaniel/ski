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
    }).done(function(responseObject){
        // Note that this is temporarily named "winterPark" until functionality is built in to chose different resorts
        let winterPark = createNewResortObject(responseObject);
        appendResortData(createHTMLString(winterPark));
    }).fail(function(errorObject) {
        console.log(errorObject);
    });
}

class Resort {
    constructor(resortName, snowBase, trailsOpen, trailsTotal, acresOpen, acresTotal, liftsOpen, liftsTotal, snowfallSeason, snowfall24H, snowfall48H, snowfall72H, snowfall7D) {
        this.resortName = resortName;
        this.snowBase = snowBase;
        this.trailsOpen = trailsOpen;
        this.trailsTotal = trailsTotal;
        this.acresOpen = acresOpen;
        this.acresTotal = acresTotal;
        this.liftsOpen = liftsOpen;
        this.liftsTotal = liftsTotal;
        this.snowfallSeason = snowfallSeason;
        this.snowfall24H = snowfall24H;
        this.snowfall48H = snowfall48H;
        this.snowfall72H = snowfall72H;
        this.snowfall7D = snowfall7D;
    }
}

function createNewResortObject(responseObject) {
    return new Resort(
        responseObject.Name,
        responseObject.SnowReport.BaseArea.BaseIn,
        responseObject.SnowReport.TotalOpenTrails,
        responseObject.SnowReport.TotalTrails,
        responseObject.SnowReport.OpenTerrainAcres,
        responseObject.SnowReport.TotalTerrainAcres,
        responseObject.SnowReport.TotalOpenLifts,
        responseObject.SnowReport.TotalLifts,
        responseObject.SnowReport.SeasonTotalIn,
        responseObject.SnowReport.BaseArea.Last24HoursIn,
        responseObject.SnowReport.BaseArea.Last48HoursIn,
        responseObject.SnowReport.BaseArea.Last72HoursIn,
        responseObject.SnowReport.BaseArea.Last7DaysIn
    );
}

function createHTMLString(resort) {
    return "<h2>" + resort.resortName + "</h2>" +
        "       <ul>" +
        "           <li>Base Snow: " + resort.snowBase + "</li>" +
        "           <li>24 Hour Snowfall: " + resort.snowfall24H + "</li>" +
        "           <li>48 Hour Snowfall: " + resort.snowfall48H + "</li>" +
        "           <li>72 Hour Snowfall: " + resort.snowfall72H + "</li>" +
        "           <li>7 Day Snowfall: " + resort.snowfall7D + "</li>" +
        "           <li>Season Total Snowfall: " + resort.snowfallSeason + "</li>" +
        "           <li>Trails Open: " + resort.trailsOpen + "/" + resort.trailsTotal + "</li>" +
        "           <li>Lifts Open: " + resort.liftsOpen + "/" + resort.liftsTotal + "</li>" +
        "           <li>Acres Open: " + resort.acresOpen + "/" + resort.acresTotal + "</li>" +
        "       </ul>";
}

function appendResortData(htmlString) {
    $('#resort').append(htmlString);
}