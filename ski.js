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
        console.log(winterPark);
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
    let myResort = new Resort(
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
    return myResort;
}