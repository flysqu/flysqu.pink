let highestZIndex = 0

function applyHighestZIndex(element) {
    let highestZIndex = 0;

    const windowDivs = document.querySelectorAll('div#windowUwU');

    windowDivs.forEach(div => {
        const zIndex = window.getComputedStyle(div).zIndex;

        if (!isNaN(zIndex) && zIndex !== 'auto') {
            highestZIndex = Math.max(highestZIndex, parseInt(zIndex, 10));
        }
    });

    element.style.zIndex = highestZIndex + 1;
}

async function fetchCurrentlyPlaying() {
    try {
        const response = await fetch('http://127.0.0.1:8000/api');  // Added port 8000
        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Failed to fetch currently playing:', error);
        return null;
    }
}

// credits to w3schools (https://www.w3schools.com/howto/howto_js_draggable.asp) this is based on that owo
function dragElement(elmnt, draggable, highestZIndex) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
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
        highestZIndex += 1
        applyHighestZIndex(elmnt)
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        document.body.style.cursor = "grab";
        draggable.style.opacity = "0%"


        var currentTime = new Date().getTime();
        if (currentTime - lastTime >= fpsInterval) {
            lastTime = currentTime;

            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;

            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        }
    }

    function closeDragElement(e) {
        // ensure that window is at mouse location when stopping drag uwu
        e = e || window.event;
        console.log(e.clientX)
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";



        document.body.style.cursor = "default";
        draggable.style.opacity = "100%"

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

            let vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
            let vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

            // Calculate random positions within the viewport uwu
            let rw = Math.floor(Math.random() * (vw));
            let rh = Math.floor(Math.random() * (vh));

            // SOLVE ISSUE THE ISSUE OF THE
            // Get size of image

            let iwrw = 400 + rw
            //let ihrh = ih + rh
            // Check if imgSizeX + rw is more then vw
            if (iwrw > vw) {
                techSpawnGif()
                //console.log("Fixed Out Of Bounds")
                //console.log(`${iwrw}, ${rw}, ${rh}`)
                return
            }

            window.style.position = "absolute";
            window.style.opacity = "100%";
            window.style.top = `${rh}px`;
            window.style.left = `${rw}px`;
            window.style.display = "flex"
            window.style.flexDirection = "column";
            const windows = document.getElementsByClassName("window");

            for (let i = 0; i < windows.length; i++) {
                windows[i].style.zIndex = "0";
            }
            window.style.zIndex = "1";

            window.id = "windowUwU";
            window.className = "window";

            const songData = await fetchCurrentlyPlaying();
            const { title, artists, is_playing, progress_ms, duration_ms } = songData;

            // set up window controls uwu
            const windowControls = document.createElement("div")
            windowControls.id = "windowControls"

            const windowName = document.createElement("p")
            windowName.textContent = `${title}`
            windowName.id = "windowName"

            const windowNameName = document.createElement("p")
            windowNameName.textContent = `Im currently listening to!`
            windowNameName.id = "windowName"

            const windowProgressDiv = document.createElement("div") //background color
            windowProgressDiv.style.width = "100%"
            windowProgressDiv.style.width = "10px"
            const windowProgress = document.createElement("div") // progress bar decided by width of object
            windowProgressDiv.appendChild(windowProgress)
            windowProgress.style.width = "50%" //js for testing
            windowProgress.style.height = "10px"
            console.log("Progress: "+progress_ms)
            console.log("Duration: "+duration_ms)

            const windowArtist = document.createElement("p")
            windowArtist.textContent = `${artists}`
            windowArtist.id = "windowArtist"

            const windowClose = document.createElement("button")
            windowClose.id = "windowClose"
            windowClose.textContent = "x"
            windowClose.onclick = function () { window.remove(); }

            console.log(is_playing)
                windowControls.appendChild(windowNameName)
                windowControls.appendChild(windowClose)
                window.appendChild(windowControls)
    
                window.appendChild(windowName)
                window.appendChild(windowArtist)
                window.appendChild(windowProgressDiv)


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
                            margin: 2px;
                        }
                        
                        #windowControls {
                          display: flex;
                          align-items: stretch;
                          background-color: rgb(241, 160, 231);
                          padding-bottom: 2px;
                          height: 20px;
                          text-align: left;
                          line-height: 20px;
                          font-size: 15px;
                        }
                        #windowControls p {
                          color: #5C3357;
                          margin-top: 0;
                          text-align: left;
                          line-height: 20px;
                          font-size: 15px;
                          margin-right: 1px;
                          user-select: none;
                        }
          
                        #windowControls button {
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
            var style = document.createElement('style');

            if (style.styleSheet) {
                style.styleSheet.cssText = css;
            } else {
                style.appendChild(document.createTextNode(css));
            }

            document.getElementsByTagName('head')[0].appendChild(style);

            document.body.appendChild(window);

            dragElement(window, windowControls, highestZIndex);
}
techSpawnGif();