let highestZIndex = 0

// fucky fix
var els = document.querySelectorAll('[id^="index.css"]');
if (els.length == 0) {
    var gifPaths = [
        '/static/resources/gifs/anime-hacking.gif',
        '/static/resources/gifs/anime-waves-hi.gif',
        '/static/resources/gifs/blahaj-spinning.gif',
        '/static/resources/gifs/blahaj-sunset.gif',
        '/static/resources/gifs/bocchi-cry.gif',
        '/static/resources/gifs/bocchi-despair.gif',
        '/static/resources/gifs/many-bocchis-dance.gif',
        '/static/resources/gifs/bocchi-solo-dance.gif',
        '/static/resources/gifs/cat-keyboard.gif',
        '/static/resources/gifs/miku-ear-flap.gif',
        '/static/resources/gifs/hatsune-miku.gif',
        '/static/resources/gifs/kaido-shun1.gif',
        '/static/resources/gifs/kaido-shun2.gif',
        '/static/resources/gifs/kinger-digital-circus.gif',
        '/static/resources/gifs/kitty-soggen.gif',
        '/static/resources/gifs/madeline-celeste.gif',
        '/static/resources/gifs/miku-seseren.gif',
        '/static/resources/gifs/miku.gif',
        '/static/resources/gifs/patapata.gif',
        '/static/resources/gifs/kuriko.gif',
        '/static/resources/gifs/promised-neverland.gif',
        '/static/resources/gifs/venetian-snares.gif',
        '/static/resources/gifs/violent-cat.gif',
    ];
}else {
    var gifPaths = [
        '/static/resources/gifs/anime-hacking.gif',
        '/static/resources/gifs/anime-waves-hi.gif',
        '/static/resources/gifs/blahaj-spinning.gif',
        '/static/resources/gifs/blahaj-sunset.gif',
        '/static/resources/gifs/bocchi-cry.gif',
        '/static/resources/gifs/bocchi-despair.gif',
        '/static/resources/gifs/many-bocchis-dance.gif',
        '/static/resources/gifs/bocchi-solo-dance.gif',
        '/static/resources/gifs/cat-keyboard.gif',
        '/static/resources/gifs/miku-ear-flap.gif',
        '/static/resources/gifs/hatsune-miku.gif',
        '/static/resources/gifs/kaido-shun1.gif',
        '/static/resources/gifs/kaido-shun2.gif',
        '/static/resources/gifs/kinger-digital-circus.gif',
        '/static/resources/gifs/kitty-soggen.gif',
        '/static/resources/gifs/madeline-celeste.gif',
        '/static/resources/gifs/miku-seseren.gif',
        '/static/resources/gifs/miku.gif',
        '/static/resources/gifs/patapata.gif',
        '/static/resources/gifs/kuriko.gif',
        '/static/resources/gifs/promised-neverland.gif',
        '/static/resources/gifs/venetian-snares.gif',
        '/static/resources/gifs/violent-cat.gif',
    ];
}

function applyHighestZIndex(element) {
    let highestZIndex = 0;

    const windowDivs = document.querySelectorAll('div#window');

    windowDivs.forEach(div => {
        const zIndex = window.getComputedStyle(div).zIndex;

        if (!isNaN(zIndex) && zIndex !== 'auto') {
            highestZIndex = Math.max(highestZIndex, parseInt(zIndex, 10));
        }
    });

    element.style.zIndex = highestZIndex + 1;
}


// credits to w3schools (https://www.w3schools.com/howto/howto_js_draggable.asp) this is based on that owo
function dragElement(elmnt, draggable, img, highestZIndex) {
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
        img.style.opacity = "0%"
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
        img.style.opacity = "100%"
        draggable.style.opacity = "100%"

        document.onmouseup = null;
        document.onmousemove = null;
    }
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }
  

function spawnGif() {

    // Select a random GIF path
    const randomGifPath = gifPaths[Math.floor(Math.random() * gifPaths.length)];
    //const randomGifPath = "blahaj-spinning.gif"
    let vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    let vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);


    // Create an img element and set its src to the random GIF path

    const img = new Image();
    img.src = randomGifPath;
    img.alt = "Random GIF";
    img.id = "img"
    img.style.width = `${200}px`

    img.onload = () => {

            // Calculate random positions within the viewport uwu
            let rw = getRandomArbitrary(0,vw)
            let rh = getRandomArbitrary(0,vh)


            // SOLVE ISSUE THE ISSUE OF THE
            // Get size of image

            let iwrw = 400 + rw
            //let ihrh = ih + rh
            // Check if imgSizeX + rw is more then vw
            if (iwrw > vw) {
                spawnGif()
                //console.log("Fixed Out Of Bounds")
                //console.log(`  ${iwrw}, ${rw}, ${rh}`)
                return
            }

            //if (ihrh + rh > vh) {
            //    spawnGif()
            //    console.log("Fixed Out Of Bounds")
            //    return
            //}

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
            window.style.zIndex = "1"; // Make sure `window` here refers to a specific window element

            window.id = "window";
            window.className = "window";

            // set up window controls uwu
            const windowControls = document.createElement("div")
            windowControls.id = "windowControls"
            const windowName = document.createElement("p")
            windowName.textContent = `${randomGifPath.replace("/static/resources/gifs/", "").replace("/static/","")}`
            windowName.id = "windowName"
            const windowClose = document.createElement("button")
            windowClose.id = "windowClose"
            windowClose.textContent = "x"
            windowClose.onclick = function () { window.remove(); }

            windowControls.appendChild(windowName)
            windowControls.appendChild(windowClose)
            window.appendChild(windowControls)

            // Create a div to hold the GIF owo
            var css = `
                        #window {
                          display: flex;
                          flex-direction: column;
                          border-style: solid;
                          border-color: rgb(241, 160, 231);
                          border-top-style: solid;
                          border-right-style: solid;
                          border-bottom-style: solid;
                          border-left-style: solid;
                          opacity: 0;
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
            
            window.appendChild(img);
            
            dragElement(window, windowControls, img, highestZIndex);
    };


    img.onerror = () => {
        console.error(`Failed to load image: ${randomGifPath}`);
    };
}

spawnGif();
