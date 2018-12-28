/**
 *  Seeds an array in a random way from config array.
 *  @param {number} total The number of elements to fill the array with
 *  @param {array} dist The config array representing percentage of each element
 */
function SeedArray (total, dist) {

    // Create a new empty array to fill and return
    let seededArray = []

    // Convert fraction to number based on total
    for (let i = 0; i < dist.length; i++) {
      let element = dist[i];

      for (el in element) {
        if (element.hasOwnProperty(el)) {
          element[el] = Math.round(element[el] * total);
        }
      }
    }    

    // Fill the seededArray with random element types while
    // there are remaining element types to pick from
    for (let i = 0; i < total; i++) {

      // Pick an element type randomly
      var idx = Math.floor(dist.length * Math.random());
      var el = dist[idx];
      var element = Object.keys(el)[0];

      // Decrease the available amount of this element type by 1
      // until there are no more of this element type available
      if (el[element] > 0) {
        el[element]--;
      } else {
        // If there are no more of this type available, remove it
        // from being selected randomly, then select a remaining
        // element type randomly
        idx = Math.floor(dist.splice(idx, 1).length * Math.random());
        el = dist[idx];
        element = Object.keys(el)[0];
      }

      // Push the randomly select element type to the seededArray
      seededArray.push(element);
    }

    return seededArray;
}

function Fill(canvas, num) {

	let columns = num;
	let cWidth = canvas.width;
	let cHeight = canvas.height;

	let elWidth = cWidth / columns;
	let elHeight = elWidth;

	//350/50 = 7

	let matrix = [];

	let top = cHeight;
	let left = 0;

	/*for (let i = 0; i < cHeight / elHeight; i++) {
		
		
		for (let j = 0; j < columns; j++) {
			let t = top - elHeight*i;
			let l = left + elWidth*j;

			matrix.push([t,l]);
		}
	}*/

	for (let i = 0; i < columns; i++) {
		

		let row = [];

		for (let j=0; j < cHeight / elHeight; j++) {

			let l = left + elWidth*i;
			let t = top - elHeight*j;

			row.push([l,t]);
		}

		matrix.push(row);
	}

	return matrix;
	
}


/*[
	[[0, 350], [50, 350], ...],
	[[0, 325], [50, 325], ...]
]*/

function Fall(config) {

	let nDown = function (t, id) {

    let el = document.getElementById(id);
    let offset = config.offset || {}
    let offsetTop = offset.top || 0;
    el.style.top = (t + offsetTop) + 'px';
	}

  let showCaseItemFill = function() {

      let canvas = config.canvas;
      let n = config.num;
      let className = 'el-fill';
      let sizes = JSON.parse(JSON.stringify(config.domclass)) || [];
      var offset = canvas.width / n;

      let f = Fill({width:canvas.width, height:canvas.height}, n);
      let tot = f.length * f[0].length;
      let dist = sizes.length && SeedArray(tot, sizes);

      let type = config.type;
      let trim = config.offset || {}
      let background = config.invertBackground ? '#000' : '#fff';

        let container = document.getElementById('js-container');
        let offsetWidth = trim.right || 0;
        let offsetHeight = trim.top || 0;
        container.style.width = (config.canvas.width + offsetWidth) + 'px';
        container.style.height = (config.canvas.height + offsetHeight) + 'px';
        container.innerHTML = '';
        container.style.background = background;

        let flipIn = config.flipIn;

        let fadeIn = config.fadeIn;

        config.type = type;

        for (let i = 0; i < f.length; i++) {
          
          // type dropIn is default
          let delay = 0;
          let rDelay = Math.log(tot) / 2;
          let factor = 16;
          let rFactor = 32;
          let anim = '775ms';
          let rAnim = '0s';
        
          switch(type) {
            case 'fillUp':
              anim = rAnim;
              break;
            case 'fillDown':
              factor = rFactor;
              delay = rDelay;
              anim = rAnim;
              break;
            case 'fillDownSmooth':
              factor = rFactor;
              delay = rDelay;
              break;
            case 'fillRandom':
              anim = rAnim;
              break;
            case 'noAnim':
              anim = '0s';
              break;
          }
        
        
          for (let j = 0; j < f[i].length; j++) {
        
            let left = f[i][j][0];
            let top = f[i][j][1];
        
            let el = document.createElement('div');
            let id = 'el-'+Math.floor(Date.now()*Math.random());
            el.id = id;
        
            el.style.backgroundColor = '';
        
            if (config.picture[`${left},${top}`]) {
              let color = config.colors[`${left},${top}`];
              el.classList.add('filled');
              el.setAttribute('data-color', color);
              el.style.backgroundColor = color;
              
              if (config.withGrid === true) {
                el.style.outline = `1px solid ${background}`;
              }
            }
        
            el.setAttribute('data-coord', `${left},${top}`);
            
            el.classList.add(`row-${j+1}`);
            el.classList.add(`col-${i+1}`);
        
            el.style.top = -offset + 'px';
        
            el.classList.add(className);
            dist.length && el.classList.add(dist[Math.floor(Math.random()*tot)]);
        
            el.style.width = offset + 'px';
            el.style.height = offset + 'px';
            el.style.left = left + 'px';
            el.style.transform = 'rotateX(90deg)';

        
              
            if (type === 'fillDown' || type === 'fillDownSmooth') {
              delay -= Math.random() / Math.log(j+factor);
            } else if (type === 'dropIn' || type === 'fillUp') {
              delay += Math.random() / Math.log(j+factor);
            } else if (type === 'fillRandom' || type === 'dropRandom') {
              delay = (i+j) * Math.random() / Math.log(tot*tot);
            } else if (type === 'noAnim') {
              delay += 0;
            } else {
              delay += Math.random() / Math.log(j+factor);
            }
            
            if (fadeIn) {
              el.style.opacity = 0;
            }

            if(flipIn) {
              el.style.transition = `top ${anim} ease ${delay}s, transform 775ms ease ${delay}s, opacity 1s ease ${delay}s`;
            } else {
              el.style.transition = `top ${anim} ease ${delay}s, transform 0s ease ${delay}s, opacity 1s ease ${delay}s`;
            }
            
            container.appendChild(el);
        
            setTimeout(() => {
                window.requestAnimationFrame(() => {
                
                el.style.transform = 'rotateX(180deg)';
                el.style.opacity = 1;
                nDown(top - offset, id);
              });
            }, 0);
          }
        }
  }
	
	return {
		fillSingle: showCaseItemFill
	}
}

let fall = Fall({
  num: 30,
  top: 0,
  duration: 775,
  canvas: {width: 600, height: 360},
  pixel: 20,
  domclass: [],
  //domclass: [{ red: 0.25}, {yellow: 0.25}, {green: 0.25}, {blue: 0.25 }], // optional,
  // dropIn, fillUp, fillDownSmooth, fillDown, fillRandom, dropRandom, noAnim
  type: 'fillRandom', // Default dropIn:
  fadeIn: true, // Optional: Default false
  picture: {"0,360":true,"20,360":true,"40,360":true,"60,360":true,"80,360":true,"100,360":true,"120,360":true,"140,360":true,"160,360":true,"180,360":true,"200,360":true,"220,360":true,"240,360":true,"260,360":true,"280,360":true,"300,360":true,"320,360":true,"340,360":true,"0,340":true,"20,340":true,"40,340":true,"60,340":true,"80,340":true,"100,340":true,"120,340":true,"140,340":true,"160,340":true,"180,340":true,"200,340":true,"220,340":true,"240,340":true,"260,340":true,"280,340":true,"300,340":true,"320,340":true,"340,340":true,"340,320":true,"320,320":true,"300,320":true,"280,320":true,"260,320":true,"240,320":true,"220,320":true,"200,320":true,"180,320":true,"160,320":true,"140,320":true,"120,320":true,"100,320":true,"80,320":true,"60,320":true,"40,320":true,"20,320":true,"0,320":true,"0,300":true,"20,300":true,"40,300":true,"60,300":true,"80,300":true,"100,300":true,"120,300":true,"140,300":true,"160,300":true,"180,300":true,"200,300":true,"220,300":true,"240,300":true,"260,300":true,"280,300":true,"300,300":true,"320,300":true,"340,300":true,"0,280":true,"20,280":true,"40,280":true,"60,280":true,"80,280":true,"100,280":true,"120,280":true,"140,280":true,"160,280":true,"180,280":true,"200,280":true,"220,280":true,"240,280":true,"260,280":true,"280,280":true,"300,280":true,"320,280":true,"340,280":true,"0,260":true,"20,260":true,"40,260":true,"60,260":true,"80,260":true,"100,260":true,"120,260":true,"140,260":true,"160,260":true,"180,260":true,"200,260":true,"220,260":true,"240,260":true,"260,260":true,"280,260":true,"300,260":true,"320,260":true,"340,260":true,"0,240":true,"20,240":true,"40,240":true,"60,240":true,"80,240":true,"100,240":true,"120,240":true,"140,240":true,"160,240":true,"180,240":true,"200,240":true,"220,240":true,"240,240":true,"260,240":true,"280,240":true,"300,240":true,"320,240":true,"340,240":true,"0,220":true,"20,220":true,"40,220":true,"60,220":true,"80,220":true,"100,220":true,"120,220":true,"140,220":true,"160,220":true,"180,220":true,"200,220":true,"220,220":true,"240,220":true,"260,220":true,"280,220":true,"300,220":true,"320,220":true,"340,220":true,"0,200":true,"20,200":true,"40,200":true,"60,200":true,"80,200":true,"320,200":true,"340,200":true,"0,180":true,"20,180":true,"40,180":true,"60,180":true,"300,180":true,"320,180":true,"340,180":true,"0,160":true,"20,160":true,"40,160":true,"300,160":true,"320,160":true,"340,160":true,"0,140":true,"20,140":true,"40,140":true,"60,140":true,"80,140":true,"100,140":true,"300,140":true,"320,140":true,"340,140":true,"0,120":true,"20,120":true,"40,120":true,"60,120":true,"80,120":true,"280,120":true,"300,120":true,"320,120":true,"340,120":true,"0,100":true,"20,100":true,"40,100":true,"60,100":true,"260,100":true,"280,100":true,"300,100":true,"320,100":true,"340,100":true,"0,80":true,"20,80":true,"40,80":true,"60,80":true,"80,80":true,"100,80":true,"120,80":true,"140,80":true,"340,80":true,"320,80":true,"300,80":true,"280,80":true,"260,80":true,"240,80":true,"220,80":true,"0,60":true,"20,60":true,"40,60":true,"60,60":true,"80,60":true,"100,60":true,"120,60":true,"140,60":true,"160,60":true,"200,60":true,"220,60":true,"240,60":true,"260,60":true,"280,60":true,"300,60":true,"320,60":true,"340,60":true,"100,200":true,"120,200":true,"100,180":true,"120,180":true,"140,180":true,"160,180":true,"160,160":true,"140,160":true,"120,160":true,"120,140":true,"140,140":true,"160,140":true,"180,140":true,"140,120":true,"160,120":true,"180,120":true,"200,120":true,"220,120":true,"240,120":true,"260,120":true,"240,100":true,"220,100":true,"200,100":true,"180,100":true,"160,100":true,"180,60":true,"160,80":true,"180,80":true,"200,80":true,"80,100":true,"100,100":true,"120,100":true,"140,100":true,"120,120":true,"100,120":true,"60,160":true,"80,160":true,"100,160":true,"80,180":true,"140,200":true,"160,200":true,"300,200":true,"280,200":true,"280,180":true,"280,160":true,"260,140":true,"280,140":true,"240,140":true,"240,160":true,"240,180":true,"240,200":true,"260,200":true,"260,180":true,"260,160":true,"220,200":true,"220,180":true,"220,140":true,"200,140":true,"200,160":true,"200,180":true,"200,200":true,"180,200":true,"180,180":true,"180,160":true,"220,160":true},
  colors: {"0,360":"#000000","20,360":"#001059","40,360":"#001059","60,360":"#001059","80,360":"#001059","100,360":"#001059","120,360":"#001059","140,360":"#c5231d","160,360":"#c5231d","180,360":"#c5231d","200,360":"#c5231d","220,360":"#c5231d","240,360":"#ffffff","260,360":"#ffffff","280,360":"#c5231d","300,360":"#c5231d","320,360":"#c5231d","340,360":"#000000","0,340":"#000000","20,340":"#000000","40,340":"#73c7fd","60,340":"#001059","80,340":"#001059","100,340":"#001059","120,340":"#001059","140,340":"#001059","160,340":"#c5231d","180,340":"#c5231d","200,340":"#c5231d","220,340":"#ffffff","240,340":"#ffffff","260,340":"#ffffff","280,340":"#ffffff","300,340":"#000000","320,340":"#000000","340,340":"#000000","340,320":"#000000","320,320":"#000000","300,320":"#000000","280,320":"#ffffff","260,320":"#ffffff","240,320":"#ffffff","220,320":"#ffffff","200,320":"#ffffff","180,320":"#ffffff","160,320":"#001059","140,320":"#001059","120,320":"#c5231d","100,320":"#c5231d","80,320":"#001059","60,320":"#73c7fd","40,320":"#000000","20,320":"#000000","0,320":"#000000","0,300":"#000000","20,300":"#000000","40,300":"#000000","60,300":"#000000","80,300":"#001059","100,300":"#c5231d","120,300":"#c5231d","140,300":"#c5231d","160,300":"#001059","180,300":"#001059","200,300":"#ffffff","220,300":"#ffffff","240,300":"#ffffff","260,300":"#ffffff","280,300":"#000000","300,300":"#000000","320,300":"#000000","340,300":"#000000","0,280":"#000000","20,280":"#000000","40,280":"#000000","60,280":"#000000","80,280":"#001059","100,280":"#c5231d","120,280":"#c5231d","140,280":"#c5231d","160,280":"#001059","180,280":"#001059","200,280":"#001059","220,280":"#001059","240,280":"#001059","260,280":"#001059","280,280":"#001059","300,280":"#000000","320,280":"#000000","340,280":"#000000","0,260":"#000000","20,260":"#000000","40,260":"#000000","60,260":"#000000","80,260":"#000000","100,260":"#001059","120,260":"#c5231d","140,260":"#73c7fd","160,260":"#000000","180,260":"#000000","200,260":"#000000","220,260":"#000000","240,260":"#ffffff","260,260":"#000000","280,260":"#000000","300,260":"#000000","320,260":"#000000","340,260":"#000000","0,240":"#000000","20,240":"#000000","40,240":"#000000","60,240":"#000000","80,240":"#73c7fd","100,240":"#001059","120,240":"#001059","140,240":"#000000","160,240":"#73c7fd","180,240":"#73c7fd","200,240":"#ffffff","220,240":"#ffffff","240,240":"#001059","260,240":"#ffffff","280,240":"#73c7fd","300,240":"#73c7fd","320,240":"#000000","340,240":"#000000","0,220":"#000000","20,220":"#000000","40,220":"#000000","60,220":"#73c7fd","80,220":"#73c7fd","100,220":"#001059","120,220":"#73c7fd","140,220":"#73c7fd","160,220":"#73c7fd","180,220":"#ffffff","200,220":"#ffffff","220,220":"#000000","240,220":"#001059","260,220":"#000000","280,220":"#ffffff","300,220":"#73c7fd","320,220":"#000000","340,220":"#000000","0,200":"#000000","20,200":"#000000","40,200":"#000000","60,200":"#000000","80,200":"#000000","320,200":"#000000","340,200":"#000000","0,180":"#000000","20,180":"#000000","40,180":"#000000","60,180":"#000000","300,180":"#000000","320,180":"#000000","340,180":"#000000","0,160":"#000000","20,160":"#000000","40,160":"#000000","300,160":"#000000","320,160":"#000000","340,160":"#000000","0,140":"#000000","20,140":"#000000","40,140":"#000000","60,140":"#000000","80,140":"#000000","100,140":"#000000","300,140":"#000000","320,140":"#000000","340,140":"#000000","0,120":"#000000","20,120":"#000000","40,120":"#000000","60,120":"#000000","80,120":"#000000","280,120":"#000000","300,120":"#000000","320,120":"#000000","340,120":"#000000","0,100":"#000000","20,100":"#000000","40,100":"#000000","60,100":"#000000","260,100":"#000000","280,100":"#000000","300,100":"#000000","320,100":"#000000","340,100":"#000000","0,80":"#000000","20,80":"#000000","40,80":"#000000","60,80":"#000000","80,80":"#000000","100,80":"#000000","120,80":"#000000","140,80":"#000000","340,80":"#000000","320,80":"#000000","300,80":"#000000","280,80":"#000000","260,80":"#000000","240,80":"#000000","220,80":"#000000","0,60":"#000000","20,60":"#000000","40,60":"#000000","60,60":"#000000","80,60":"#000000","100,60":"#000000","120,60":"#000000","140,60":"#000000","160,60":"#000000","200,60":"#000000","220,60":"#000000","240,60":"#000000","260,60":"#000000","280,60":"#000000","300,60":"#000000","320,60":"#000000","340,60":"#000000","100,200":"#001059","120,200":"#001059","100,180":"#001059","120,180":"#001059","140,180":"#001059","160,180":"#001059","160,160":"#001059","140,160":"#001059","120,160":"#001059","120,140":"#001059","140,140":"#001059","160,140":"#001059","180,140":"#001059","140,120":"#001059","160,120":"#001059","180,120":"#001059","200,120":"#001059","220,120":"#001059","240,120":"#001059","260,120":"#001059","240,100":"#001059","220,100":"#001059","200,100":"#001059","180,100":"#001059","160,100":"#001059","180,60":"#73c7fd","160,80":"#73c7fd","180,80":"#73c7fd","200,80":"#73c7fd","80,100":"#73c7fd","100,100":"#73c7fd","120,100":"#73c7fd","140,100":"#73c7fd","120,120":"#73c7fd","100,120":"#73c7fd","60,160":"#73c7fd","80,160":"#73c7fd","100,160":"#73c7fd","80,180":"#73c7fd","140,200":"#73c7fd","160,200":"#73c7fd","300,200":"#73c7fd","280,200":"#ffffff","280,180":"#ffffff","280,160":"#ffffff","260,140":"#ffffff","280,140":"#73c7fd","240,140":"#001059","240,160":"#001059","240,180":"#001059","240,200":"#001059","260,200":"#000000","260,180":"#000000","260,160":"#000000","220,200":"#000000","220,180":"#000000","220,140":"#ffffff","200,140":"#ffffff","200,160":"#ffffff","200,180":"#ffffff","200,200":"#ffffff","180,200":"#ffffff","180,180":"#ffffff","180,160":"#ffffff","220,160":"#000000"},
  //buttons: [],
  //buttons: [
  //  {'dropIn': 'Drop In'}, 
  //  {'fillUp': 'Fill Up'}, 
  //  {'fillDownSmooth': 'Fill Down (Smooth)'}, 
  //  {'fillDown': 'Fill Down'}, 
  //  {'fillRandom': 'Fill Random'}, 
  //  {'dropRandom': 'Drop Random'}, 
  //  {'noAnim': 'No Animation'}],
  flipIn: false,
  withGrid: true,
  offset: {top: -40, right: -240, bottom: 0, left: 0},
  invertBackground: true
});

// Fill the canvas with falling boxes of same dimensions
fall.fillSingle(/*{
  // dropIn, fillUp, fillDownSmooth, fillDown, fillRandom, dropRandom, appear
  type: 'fillUp', // Default dropIn:
  //fadeIn: true, // Optional: Default false
  // picture: {}, // <- HOW DO I DO THIS?
  // colors: {},
  //domclass: [{ red: 0.25}, {yellow: 0.25}, {green: 0.25}, {blue: 0.25 }], // optional
  buttons: ['dropIn', 'fillUp', 'fillDownSmooth', 'fillDown', 'fillRandom', 'dropRandom', 'noAnim', 'save'],
  //flipIn: true
}*/);

//fall.grid();
