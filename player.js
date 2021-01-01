chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.state_data) {
      console.log(request);
      togglePlay(request.state_data.paused);
      var data = request.state_data.track_window.current_track;
      $("#song-title").text(data.artists[0].name + " - " + data.name);
    }
  }
);

$("#previous").on("click", function () {
  chrome.runtime.sendMessage({ msg: "previous" });
  console.log("previous song");
});

$("#next").on("click", function () {
  chrome.runtime.sendMessage({ msg: "next" });
  console.log("next song");
});

$("#play-pause").on("click", function () {   
  chrome.runtime.sendMessage({ msg: "togglePlay" });
  console.log("toggle play");
});

function togglePlay(val) {
  if (!val) {
    console.log("pause");
    $("#play-pause").removeClass("fa-play");
    $("#play-pause").addClass("fa-pause");
  } else {
    console.log("play");
    $("#play-pause").addClass("fa-play");
    $("#play-pause").removeClass("fa-pause");
  }
}