$(document).ready(function(){
    console.log("Ready to go!");
    for (var i=1; i<12; i++) {
        getData(i);
    }
});

/**
 * Fetching snow report using AJAX
 */
function getData(id) {
    let uri = "https://snowreporting.herokuapp.com/feed";
    $.ajax({
        url: uri,
        method: "GET",
        crossDomain: true,
        data: {
            resortId: id
        }
    }).done(function(responseObject){
        // Note that this is temporarily named "winterPark" until functionality is built in to chose different resorts
        let winterPark = createNewResortObject(responseObject);
        appendResortData(winterPark.createHTMLString());
    }).fail(function(errorObject) {
        console.log(errorObject);
    });
}

// todo: create Weather class

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

    createHTMLString() {
        return "<h2>" + this.resortName + "</h2>" +
            "       <ul>" +
            "           <li>Base Snow: " + this.snowBase + "</li>" +
            "           <li>24 Hour Snowfall: " + this.snowfall24H + "</li>" +
            "           <li>48 Hour Snowfall: " + this.snowfall48H + "</li>" +
            "           <li>72 Hour Snowfall: " + this.snowfall72H + "</li>" +
            "           <li>7 Day Snowfall: " + this.snowfall7D + "</li>" +
            "           <li>Season Total Snowfall: " + this.snowfallSeason + "</li>" +
            "           <li>Trails Open: " + this.trailsOpen + "/" + this.trailsTotal + "</li>" +
            "           <li>Lifts Open: " + this.liftsOpen + "/" + this.liftsTotal + "</li>" +
            "           <li>Acres Open: " + this.acresOpen + "/" + this.acresTotal + "</li>" +
            "       </ul>";
    }

    getPercentage(open, total) {
        return (open * 100) / total;
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

function appendResortData(htmlString) {
    $('#resort').append(htmlString);
}