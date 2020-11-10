'use strict';
import {DateF} from '/umber/js/date.js';

function JsonF(RespO) {
   return RespO.json();
}

function ListenF(TableA) {
   // part 1
   const RowA = TableA.find(TrackF);
   // part 2
   const IdA = RowA[2].split('/');
   const DateO = document.getElementById('date');
   const VidO = document.getElementById('vid');
   const DateS = RowA[0];
   const PathS = 'https://f002.backblazeb2.com/file/0Tl4aD';
   const TitleS = RowA[3];
   const YearS = RowA[1].toString();
   document.getElementById('track').textContent = TitleS;
   document.title = TitleS + ' / Backblaze player';
   DateO.textContent = 'released ' + YearS + ' - posted ' + DateF(DateS);
   // need this for audio files
   VidO.poster = PathS + '/' + IdA[1] + '.jpg';
   VidO.src = PathS + '/' + DateS + '.' + IdA[0];
}

function TrackF(RowA) {
   const o = new URLSearchParams(location.search);
   return RowA[0] == o.get('v');
}

fetch('/umber/umber.json').then(JsonF).then(ListenF);
