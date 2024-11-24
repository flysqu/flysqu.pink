let highestZIndex = 0;

function applyHighestZIndex(element) {
  let highestZIndex = 0;

  const windowDivs = document.querySelectorAll("div#windowUwU");

  windowDivs.forEach((div) => {
    const zIndex = window.getComputedStyle(div).zIndex;

    if (!isNaN(zIndex) && zIndex !== "auto") {
      highestZIndex = Math.max(highestZIndex, parseInt(zIndex, 10));
    }
  });

  element.style.zIndex = highestZIndex + 1;
}

async function fetchCurrentlyPlaying() {
  try {
    const response = await fetch("http://127.0.0.1:8000/api"); // Added port 8000
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch currently playing:", error);
    return null;
  }
}

// credits to w3schools (https://www.w3schools.com/howto/howto_js_draggable.asp) this is based on that owo
function dragElement(elmnt, draggable, highestZIndex) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  var lastTime = 0;
  var fpsInterval = 1000 / 5; // 30fps

  if (draggable) {
    draggable.onmousedown = dragMouseDown;
  } else {
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    highestZIndex += 1;
    applyHighestZIndex(elmnt);
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    document.body.style.cursor = "grab";
    //img.style.opacity = "0%";
    draggable.style.opacity = "0%";

    console.log(elmnt.style.top)
    console.log(elmnt.style.left)

    var currentTime = new Date().getTime();
    if (currentTime - lastTime >= fpsInterval) {
      lastTime = currentTime;

      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;

      elmnt.style.top = elmnt.offsetTop - pos2 + "px";
      elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
    }
  }

  function closeDragElement(e) {
    // ensure that window is at mouse location when stopping drag uwu
    e = e || window.event;
    console.log(e.clientX);
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;

    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";

    document.body.style.cursor = "default";
    //img.style.opacity = "100%";
    draggable.style.opacity = "100%";

    document.onmouseup = null;
    document.onmousemove = null;
  }
}

async function techSpawnGif() {
  // Create an img element and set its src to the random GIF path

  // html this creates
  // <div id="window">
  //   <div id="windowControls">
  //      <p id="windowName">GIFNAME<p>
  //      <button id="windowClose">x</button>
  //   </div>
  //   <img id="img">gif</img>
  // </div>

  // set up div owo
  const window = document.createElement("div");

  let vw = Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  );
  let vh = Math.max(
    document.documentElement.clientHeight || 0,
    window.innerHeight || 0
  );

  // Calculate random positions within the viewport uwu
  let rw = Math.floor(Math.random() * vw);
  let rh = Math.floor(Math.random() * vh);

  // SOLVE ISSUE THE ISSUE OF THE
  // Get size of image

  let iwrw = 400 + rw;
  //let ihrh = ih + rh
  // Check if imgSizeX + rw is more then vw
  if (iwrw > vw) {
    techSpawnGif();
    //console.log("Fixed Out Of Bounds")
    //console.log(`${iwrw}, ${rw}, ${rh}`)
    return;
  }

  window.style.position = "absolute";
  window.style.opacity = "100%";
  window.style.top = `${rh}px`;
  window.style.left = `${rw}px`;
  window.style.display = "flex";
  window.style.flexDirection = "column";

  window.id = "windowUwU";
  window.className = "window";

  const songData = await fetchCurrentlyPlaying();
  if (songData.title == undefined) {
    const windowControls = document.createElement("div");
    windowControls.id = "windowControlsUwU";

    const windowClose = document.createElement("button");
    windowClose.id = "windowClose";
    windowClose.textContent = "x";
    windowClose.onclick = function () {
      window.remove();
    };

    const windowName = document.createElement("p");
    windowName.textContent = `Nothing at the moment :3`;
    windowName.id = "windowName";

    const windowNameName = document.createElement("p");
    windowNameName.textContent = `Im currently listening to!`;
    windowNameName.id = "windowName";

    windowControls.appendChild(windowNameName);
    windowControls.appendChild(windowClose);
    window.appendChild(windowControls);

    window.appendChild(windowName);
  } else {
    const { title, artists, is_playing, progress_ms, duration_ms } = songData;

    // set up window controls uwu
    const windowControls = document.createElement("div");
    windowControls.id = "windowControlsUwU";

    const windowName = document.createElement("p");
    windowName.textContent = `${title}`;
    windowName.id = "windowNameUwU";

    const windowNameName = document.createElement("p");
    windowNameName.textContent = `Im currently listening to!`;
    windowNameName.id = "windowNameNameUwU";

    const windowProgressDiv = document.createElement("div"); //background color

    windowProgressDiv.style.backgroundColor = "#ca00fc78";
    windowProgressDiv.id = "windowProgressDiv";
    const windowProgress = document.createElement("div"); // progress bar decided by width of object
    windowProgressDiv.appendChild(windowProgress);

    windowProgress.style.backgroundColor = "rgba(255, 192, 245, 0.5)";
    windowProgress.style.width = progress_ms + "%"; //js for testing
    windowProgress.style.height = "10px";
    windowProgress.style.margin = "3px";
    windowProgress.id = "windowProgress"

    const windowArtist = document.createElement("p");
    windowArtist.textContent = `${artists}`;
    windowArtist.id = "windowArtist";

    const windowClose = document.createElement("button");
    windowClose.id = "windowClose";
    windowClose.textContent = "x";
    windowClose.onclick = function () {
      window.remove();
    };

    console.log(is_playing);
    windowControls.appendChild(windowNameName);
    windowControls.appendChild(windowClose);
    window.appendChild(windowControls);

    window.appendChild(windowName);
    window.appendChild(windowArtist);
    window.appendChild(windowProgressDiv);

    let progress_procent = progress_ms / duration_ms;
    console.log(progress_procent);
    progress_procent = progress_procent * 100;
    console.log(progress_procent);
    windowProgress.style.width = progress_procent + "%"; //js for testing

    windowProgressDiv.style.width = "100%";
  }
  // Create a div to hold the GIF owo
  var css = `
                        #windowUwU {
                          display: flex;
                          flex-direction: column;
                          border-style: solid;
                          border-color: rgb(241, 160, 231);
                          border-top-style: solid;
                          border-right-style: solid;
                          border-bottom-style: solid;
                          border-left-style: solid;
                          opacity: 0;
                          background-color: rgba(255, 192, 245, 0.5);
                        }
                        
                        #windowUwU * {
                            margin: 0px;
                        }
                        
                        #windowControlsUwU {
                          display: flex;
                          align-items: stretch;
                          background-color: rgb(241, 160, 231);
                          padding-bottom: 2px;
                          height: 20px;
                          text-align: left;
                          line-height: 20px;
                          font-size: 15px;
                        }
                        #windowControlsUwU p {
                          color: #5C3357;
                          margin-top: 0;
                          text-align: left;
                          line-height: 20px;
                          font-size: 15px;
                          margin-right: 1px;
                          user-select: none;
                        }
                        #windowArtistUwU {
                          font-size: 12px !important;
                        }
                          
          
                        #windowControlsUwU button {
                          margin-left: auto;
                          background-color: rgb(241, 160, 231);
                          color: #5C3357;
                          box-shadow: none;
                          border: none;
                        }
                        
                        #img {
                          font-size: 30px;
                          text-align: center;
                          background-color: red;
                          min-width
                        }
                      `;
  var style = document.createElement("style");

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }

  document.getElementsByTagName("head")[0].appendChild(style);

  document.body.appendChild(window);

  dragElement(
    window,
    document.getElementById("windowControlsUwU"),
    highestZIndex
  );
}
techSpawnGif();

async function refreshMusicInfo() {
    console.log("Refreshing")
    const songData = await fetchCurrentlyPlaying();
    if (songData.title == undefined && songData.is_playing != false) {  
        const windowName = document.getElementById("windowNameUwU");
        windowName.textContent = `Nothing at the moment :3`;

        if (document.getElementById("windowProgressDiv") != undefined) {

            document.getElementById("windowProgressDiv").style.display = "none"
            document.getElementById("windowNameUwU").style.display = "none"
            document.getElementById("windowArtist").style.display = "none"

        }
      } else {
        const { title, artists, is_playing, progress_ms, duration_ms } = songData;
        
        if (document.getElementById("windowProgressDiv") == undefined) {

            document.getElementById("windowProgressDiv").style.display = "unset"
            document.getElementById("windowNameUwU").style.display = "unset"
            document.getElementById("windowArtist").style.display = "unset"

        }

        const windowName = document.getElementById("windowNameUwU");
        windowName.textContent = `${title}`;

        const windowProgressDiv = document.getElementById("windowProgressDiv"); //background color
        const windowProgress = document.getElementById("windowProgress"); // progress bar decided by width of object
    
        const windowArtist = document.getElementById("windowArtist");
        windowArtist.textContent = `${artists}`;
    
        let progress_procent = progress_ms / duration_ms;
        console.log(progress_procent);
        progress_procent = progress_procent * 100;
        console.log(progress_procent);
        windowProgress.style.width = progress_procent + "%"; //js for testing
    
        windowProgressDiv.style.width = "100%";

        
      }
    setTimeout(refreshMusicInfo, 5000);
}
refreshMusicInfo()