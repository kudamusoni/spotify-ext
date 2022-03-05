window.onSpotifyWebPlaybackSDKReady = () => {
    const token = 'BQCsdrzHSxZin6PTVgi58BDwBzgtTnDpDNa-woIfdq16tsCyn0_PexmMntf6MIjeaaGtgLJOswRFkGJ9PAMVi7j_eNa1v4J8RjLZqT0VRwwxx5QTnK6bNHdCgGIsL4YsErAz3ykZUWkooaWy_SqrJisXsu2mRg';
    const player = new Spotify.Player({
      name: 'Web Playback SDK Quick Start Player',
      getOAuthToken: cb => { cb(token); }
    });

    player.addListener('player_state_changed', state => {
        console.log(state);
        chrome.runtime.sendMessage({ state_data: state });
    });

    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            if (request.msg == 'next') {
                player.nextTrack().then(() => {
                    console.log('Skipped to next track!');
                });
            }
        }
    );

    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            if (request.msg == 'previous') {
                player.previousTrack().then(() => {
                    console.log('Skipped to previous track!');
                });
            }
        }
    );

    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            if (request.msg == 'togglePlay') {
                player.togglePlay().then(() => {
                    console.log('Toggled playback!');
                });
            }
        }
    );

    player.connect();
};

console.log("YESSIR");
    
// function oAuthPopup() {
//     let auth_url = spotify_url+"authorize?client_id=" + client_id + "&response_type=code&redirect_uri=" + redirectUri;
//     chrome.identity.launchWebAuthFlow({'url':auth_url,'interactive':true}, function(redirect_url){
//         token = redirect_url.split("code=")[1];
//         if (!token) {
//             console.log("ERROR");
//             // Throw some error
//         }
//         fetch(spotify_url + "api/token", {
//             method: "POST", 
//             headers: new Headers({
//                 "Content-Type":"application/x-www-form-urlencoded",
//                 "Authorization": "Basic " + btoa(client_id + ":" + client_secret)
//             }),
//             body: "grant_type=authorization_code&code="+token+"&redirect_uri="+redirectUri
//         }).then(res => {
//             return res.json();
//         }).then(data => {
//             access_token = data.access_token;
//             refresh_token = data.refresh_token;

            // getTokens();
            // return;

            // chrome.storage.sync.set({'test': access_token}, function() {
                // console.log('Value is set to ' + access_token);
            // });
            // chrome.storage.sync.set({'test2': refresh_token}, function() {
                // console.log('Value is set to ' + refresh_token);
            // });

            // chrome.cookies.set({ "name": "access_token", "value": access_token });
            // chrome.cookies.set({ "name": "refresh_token", "value": refresh_token });
//         });
//     });
// }

// function getAccessTokens() {
//     chrome.storage.sync.get(['accessToken'], function(result) {
//         localStorage.setItem('aToken', result.accessToken);
//         // aToken = result.accessToken;
//         // console.log(localStorage.getItem('aToken'));
//     });
//     let tok = localStorage.getItem('aToken');
//     return tok;
// }

// async function accessTokenPromise() {
//     return new Promise((resolve, reject) => {
//         try {
//             chrome.storage.sync.get(['accessToken'], function(result) {
//                 resolve(result.accessToken);
//             });
//         }
//         catch (ex) {
//             reject(ex);
//         }
//     });
// }

// async function getAccessToken() {
//     let result = await accessTokenPromise();
//     fetch("https://api.spotify.com/v1/me", {
//         method: "GET", 
//         headers: new Headers({
//             "Authorization": "Bearer " + result
//         })
//     }).then(res => {
//         console.log(res.json());
//     });
// }

// oAuthPopup();
// let aToken = getAccessTokens();
// console.log(aToken);

// Get the spotify player to work on the player.js file 
// Get the refresh tokens working
