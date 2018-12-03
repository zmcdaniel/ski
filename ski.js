$(document).ready(function(){
    console.log("Ready to go!");

    for (let i=0; i < 100; i++) {
        getData(i);
        logResort(i);
    }
});

/**
 * Fetching snow report
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
        let resort = createNewResortObject(responseObject);
        appendData(resort.createHTMLString());
    }).fail(function(errorObject) {
        appendData(createErrorMessage(errorObject));
    });
}

// todo: create Weather class
class Weather {
    constructor(snowfallSeason, snowfall24H, snowfall48H, snowfall72H, snowfall7D) {
        this.snowfallSeason = snowfallSeason;
        this.snowfall24H = snowfall24H;
        this.snowfall48H = snowfall48H;
        this.snowfall72H = snowfall72H;
        this.snowfall7D = snowfall7D;
    }
}

class Resort {
    constructor(resortName, snowBase, trailsOpen, trailsTotal, acresOpen, acresTotal, liftsOpen, liftsTotal) {
        this.resortName = resortName;

        this.snowBase = snowBase;

        this.trailsOpen = trailsOpen;
        this.trailsTotal = trailsTotal;

        this.acresOpen = acresOpen;
        this.acresTotal = acresTotal;

        this.liftsOpen = liftsOpen;
        this.liftsTotal = liftsTotal;
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

function appendData(htmlString) {
    $('#resort').append(htmlString);
}

/**
 * Uses error object to build a string, preparing it to be appended to the DOM for users to have error context
 * @param errorObject
 * @return String
 */
function createErrorMessage(errorObject) {
    let errorMessage = '', status = errorObject.status;

    switch (status) {
        case 400:
            errorMessage += "Bad request.";
            break;
        case 401:
            errorMessage += "Unauthorized. I'm calling the cops.";
            break;
        case 403:
            errorMessage += "Forbidden";
            break;
        case 404:
            errorMessage += "Page not found.";
            break;
        case 500:
            errorMessage += "Internal service error.";
            break;
        case 503:
            errorMessage += "Service is unavailable.";
            break;
    }
    return errorMessage;
}