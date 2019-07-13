
  var table = document.getElementById('table');
  var h1 = document.getElementsByTagName('h1')[0];
  var startS = 1;
  var mute = 1;

  HTMLAudioElement.prototype.stop = function() {
    this.pause();
    this.currentTime = 0.0;
  };

  window.onload = addClass();

  function muteSound() {
    
    if (mute == 1) {
      mute = 2;
    }
    else mute = 1;

    var textButton = document.forms[0].elements[0];
     if (textButton.value == 'Отключить звук') {
      textButton.value = 'Включить звук' ;  
    }

    else textButton.value = 'Отключить звук' ;
  }

  function addClass() {
    //***********RANDOM*********
    var arr = [];
    var arru = [];
    for (var i = 1; i < 16; i++) {
      arr.push(i);
    };

    for (;arru.length < 15;) {
      a = Math.floor(Math.random() * 15); // generate 14 max
      
      if (arr[a])  {
        arru.push(arr[a]);
        delete arr[a];
      }
    };
    //*********************************

    var elements = document.getElementsByTagName('td');
   
    for (var i = 0; i < elements.length; i++) {

    	if ( elements[i].innerHTML > 0) {
    		/*elements[i].classList.add('tdt');*/
    		var s = i + 1;
    		elements[i].classList.add("cls" + arru[i]);//**************************************************************
        	elements[i].innerHTML = arru[i];
   	 	 }
    }
  }



document.onmousedown = function(e) {
	var td = e.target;
  var tr = td.parentNode;
	if (td.nodeName !== 'TD') {
      return;
  }

  var TdCoords = getCoords(td);
  var tableCoords = getCoords(table);
  
  var shiftX = e.pageX - TdCoords.left;
  var shiftY = e.pageY - TdCoords.top;

  var currentX = parseInt (td.style.left);
  var currentY = parseInt (td.style.top);
  

  var trNum = tr.sectionRowIndex;
  var tdNum = td.cellIndex;
  if (tdNum !== 0) { 
    var tdEmptyLeft = table.rows[trNum].cells[tdNum - 1]; 
  }
  if (tdNum !== tr.cells.length - 1) { 
    var tdEmptyRirht = table.rows[trNum].cells[tdNum + 1];
  }

  if (trNum !== 0) { 
    var tdEmptyUp = table.rows[trNum - 1].cells[tdNum]; 
  }
  
  if (trNum !== table.rows.length - 1) { 
    var tdEmptyDown = table.rows[trNum + 1].cells[tdNum]; 
  }

  document.onmousemove = function(e) {

      var x = 0;
      var y = 0;
      if (currentX) x = currentX;
      if (currentY) y = currentY;

      // LEFT RIGHT ***************************************
      var newLeft = e.pageX - shiftX - TdCoords.left + x; //- 1*td.offsetWidth
 

      if (e.pageX - shiftX < TdCoords.left - td.offsetWidth ) {
        newLeft =  -td.offsetWidth; 
      }

      if (e.pageX + td.offsetWidth - shiftX > TdCoords.left + 2*td.offsetWidth) {
        newLeft =  td.offsetWidth;;
      }

        
      if (tdEmptyRirht && tdEmptyRirht.innerHTML == 0) {
        if (newLeft < 0 ) newLeft = 0 ;
        td.style.left =  newLeft + 'px';
      }
      
      if (tdEmptyLeft && tdEmptyLeft.innerHTML == 0) {
        if (newLeft > 0 ) newLeft = 0 ;
        td.style.left =  newLeft + 'px';
      }
      
      //********************************************************
      // UP DOWN ***********************
      var newTop = e.pageY - shiftY - TdCoords.top + y;

      if (e.pageY - shiftY < TdCoords.top - td.offsetHeight) {
        newTop =  -td.offsetHeight; 
      }

      if (e.pageY + td.offsetHeight - shiftY > TdCoords.top + 2*td.offsetHeight) {
        newTop =  td.offsetHeight;
      }

      
      if (tdEmptyUp && tdEmptyUp.innerHTML == 0) {
        if (newTop > 0 ) newTop = 0;
        td.style.top =  newTop + 'px';
      }

      if (tdEmptyDown && tdEmptyDown.innerHTML == 0) {
        if (newTop < 0 ) newTop = 0 ;
        td.style.top =  newTop + 'px';
      }  
         // *************************************************************
  };


  document.onmouseup = function(e) {
    move(e);
    document.onmousemove = document.onmouseup = null;
  };


function move(event) { 

  if (td.nodeName == 'TD') {

    if (tdEmptyRirht && tdEmptyRirht.innerHTML == 0) {
      swap(tdEmptyRirht);
    }

    if (tdEmptyLeft && tdEmptyLeft.innerHTML == 0) { 
      swap(tdEmptyLeft);
    }


    if (tdEmptyUp && tdEmptyUp.innerHTML == 0) { 
      swap(tdEmptyUp);
    }

    if (tdEmptyDown && tdEmptyDown.innerHTML == 0) { 
      swap(tdEmptyDown);
    }
  };
 
  function swap(Empty) {
    if (mute == 1) {
    var audio = document.getElementById('audio');
    audio.play();
  }
    var step = document.getElementById('step');
    step.innerHTML = +step.innerHTML + 1;


    Empty.innerHTML = td.innerHTML;
    td.innerHTML = null;

    var cls_name = td.classList;
    var c_n;
     for (var i = 0; i < cls_name.length; i++) { // перечислить классы
      
		if(cls_name[i].indexOf('cls') + 1) {
				c_n = cls_name[i];
					
				//alert( cls_name[i] ); 
		}
    }

Empty.classList.add(c_n);
	td.classList.remove(c_n);


    

    Empty.classList.add('td');
    

    td.classList.remove('td');
    
    td.style.top = 0 + 'px';
    td.style.left =  0 + 'px';

    finish();
    if(startS == 1) {
      StartStop();
      startS = 2;
    }
    
  };
  
};
  
return false; 


function finish() {
  var arrF = [];
  var firstTd = table.rows[1].cells[0].innerHTML;
  if (firstTd != 1) return;

  for (var i = 1; i < table.rows.length; i++) {
    
    var tR = table.rows[i];
      for (let o = 0; o < tR.cells.length; o++) { 
        arrF.push(+tR.cells[o].innerHTML);    
      }
  }

  
  var result = 1;

  for (var i = 0; i < arrF.length-3; i++) {
    if (arrF[arrF.length-2] != 15) result = 2; 
    if (arrF[i] > arrF[i+1]) result = 2;  
  }

  var finish = document.getElementById('finish');
  finish.stop();
     // *****************УДАЛЕНИЕ  16 картинки
   var elements = document.getElementsByTagName('td');
   elements[15].classList.add("cls" + "16");
   elements[15].classList.remove("cls" + "16");
    //**************************************************************

  if (result == 1) {
    finish.play();

   // *****************ДОБАВЛЕНИЕ 16 картинки
   var elements = document.getElementsByTagName('td');
   elements[15].classList.add("cls" + "16");
    //**************************************************************
         
       
   //**********

    StartStop(); 
  }
  
};


};



function getCoords(elem) { // кроме IE8-
      var box = elem.getBoundingClientRect();

      return {
        top: box.top + pageYOffset,
        bottom: box.bottom + pageYOffset,
        left: box.left + pageXOffset,
        right: box.right + pageXOffset
      };
  };




var base = 60; 
var clocktimer,dateObj,dh,dm,ds,ms; 
var readout=''; 
var h=1,m=1,tm=1,s=0,ts=0,ms=0,init=0; 
//функция для очистки поля
function ClearСlock() { 
  clearTimeout(clocktimer); 
  h=1;m=1;tm=1;s=0;ts=0;ms=0; 
  init=0;
  readout='00:00:00.00'; 
  document.getElementById("timer").innerHTML = readout; 
} 
//функция для старта секундомера
function StartTIME() { 
  var cdateObj = new Date(); 
  var t = (cdateObj.getTime() - dateObj.getTime())-(s*1000); 
  if (t>999) { s++; } 
  if (s>=(m*base)) { 
    ts=0; 
    m++; 
  } else { 
    ts=parseInt((ms/100)+s); 
    if(ts>=base) { ts=ts-((m-1)*base); } 
  } 
  if (m>(h*base)) { 
    tm=1; 
    h++; 
  } else { 
    tm=parseInt((ms/100)+m); 
    if(tm>=base) { tm=tm-((h-1)*base); } 
  } 
  ms = Math.round(t/10); 
  if (ms>99) {ms=0;} 
  if (ms==0) {ms='00';} 
  if (ms>0&&ms<=9) { ms = '0'+ms; } 
  if (ts>0) { ds = ts; if (ts<10) { ds = '0'+ts; }} else { ds = '00'; } 
  dm=tm-1; 
  if (dm>0) { if (dm<10) { dm = '0'+dm; }} else { dm = '00'; } 
  dh=h-1; 
  if (dh>0) { if (dh<10) { dh = '0'+dh; }} else { dh = '00'; } 
  readout = dh + ':' + dm + ':' + ds ; 
  document.getElementById("timer").innerHTML = readout; 
  clocktimer = setTimeout("StartTIME()",1); 
} 
//Функция запуска и остановки
function StartStop() { 
  if (init==0){ 
    ClearСlock();
    dateObj = new Date(); 
    StartTIME(); 
    init=1; 
  } else { 
    clearTimeout(clocktimer);
    init=0;
  } 
} 
