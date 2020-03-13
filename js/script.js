

let main = document.querySelector('.main');
let icoHtml = document.querySelector('.icoHtml');

main.addEventListener('mouseover', () => {
    main.style.top = '0';
    icoHtml.style.display = 'block';
}

);

main.addEventListener('mouseout', () => {
    main.style.top = '-3vh';
    icoHtml.style.display = 'none';
}

);

document.querySelector('.btnSpan').addEventListener('click', () => {
    document.querySelector('.modalWindow').classList.toggle('modalClose');
}

);

document.querySelector('.inWindowBtnClose').addEventListener('click', () => {
    document.querySelector('.modalWindow').classList.add('modalClose');
}

);



function hook(e) {
    //var el = e.srcElement || e.target;
    var el = document.getElementById("div_main");
    el.startX = (e.type == 'mousedown') ? (e.clientX - el.offsetWidth) : 0;
    el.startY = (e.type == 'mousedown') ? (e.clientY - el.offsetHeight) : 0;
}

function move(e) {
    //var el = e.srcElement || e.target;
    var el = document.getElementById("div_main");

    if (el.startX) el.style.width = e.clientX - el.startX + 'px';

    if (el.startY) el.style.height = e.clientY - el.startY + 'px';

    (e.preventDefault) ? e.preventDefault() : e.returnValue = false;
}

if (!document.attachEvent) {
    document.attachEvent = function (e, f) {
        this.addEventListener(e.substr(2), f, false);
    }
}

document.attachEvent('onmouseup', hook);
document.attachEvent('onmousemove', move);


// Перетаскиваем блок
dragElement(document.querySelector(".modalClose"));

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
        /* if present, the header is where you move the DIV from:*/
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
        /* otherwise, move the DIV from anywhere inside the DIV:*/
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
    }
}