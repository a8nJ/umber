'use strict';
import {BackblazeF} from '/umber/js/backblaze.js';
import {BandcampF} from '/umber/js/bandcamp.js';
import {DateF} from '/umber/js/date.js';
import {SoundcloudF} from '/umber/js/soundcloud.js';
import {YoutubeF} from '/umber/js/youtube.js';

function JsonF(RespO) {
   return RespO.json();
}

function DataF(TableA) {
   const ParO = new URLSearchParams(location.search);
   // 1. filter
   if (ParO.has('q')) {
      const QueryS = ParO.get('q');
      function FilterF(RowA) {
         /* for now, we are going to match on just the artist and recording. if
         we later decide to match other items, its tempting to just join the
         array and match on that. however the year is a number, and some
         languages dont allow arrays of different types. so if the time comes,
         handle each element individually rather than trying to join the
         array. */
         const SongS = RowA[3];
         return RegExp(QueryS, 'i').test(SongS);
      }
      TableA = TableA.filter(FilterF);
   }
   // 2. slice
   let BeginN = 0;
   if (ParO.has('v')) {
      const IdS = ParO.get('v');
      function IndexF(RowA) {
         // account for deleted entries
         return RowA[0] <= IdS;
      }
      BeginN = TableA.findIndex(IndexF);
      if (BeginN == -1) {
         BeginN = 0;
      }
      document.title = 'Umber - ' + DateF(IdS);
   }
   const PageN = 30;
   const SliceA = TableA.slice(BeginN, BeginN + PageN);
   const FigsO = document.getElementById('figures');
   for (const RowA of SliceA) {
      const FigO = FigureF(RowA);
      FigsO.append(FigO);
   }
   const OldO = document.getElementById('older');
   const OldN = BeginN + PageN;
   if (OldN < TableA.length) {
      const IdS = TableA[OldN][0];
      ParO.set('v', IdS);
      OldO.href = '?' + ParO.toString();
   } else {
      OldO.remove();
   }
   const NewO = document.getElementById('newer');
   const NewN = BeginN - PageN;
   if (NewN >= 0) {
      const IdS = TableA[NewN][0];
      ParO.set('v', IdS);
      NewO.href = '?' + ParO.toString();
   } else {
      NewO.remove();
   }
}

function FigureF(RowA) {
   // column 0
   const DateS = RowA[0];
   // column 1
   const YearS = RowA[1].toString();
   // column 2
   const HostA = RowA[2].split('/');
   const SiteS = HostA[0];
   const AudioS = HostA[1];
   let VideoS = '';
   if (HostA.length == 3) {
      VideoS = HostA[2];
   }
   // column 3
   const TitleS = RowA[3];
   let m;
   switch (SiteS) {
   case 'b':
      m = BandcampF(AudioS, VideoS);
      break;
   case 'm4a':
   case 'mp3':
   case 'mp4':
      m = BackblazeF(DateS, AudioS);
      break;
   case 's':
      m = SoundcloudF(AudioS, VideoS);
      break;
   case 'y':
      m = YoutubeF(AudioS, VideoS);
   }
   // part 1
   const TempO = document.querySelector('#temp');
   // part 2
   const FigO = TempO.content.cloneNode(true);
   // part 3
   const CapAnO = FigO.querySelector('figcaption a');
   const ImgO = FigO.querySelector('img');
   const ImgAnO = FigO.querySelector('a');
   const TimeO = FigO.querySelector('time');
   CapAnO.href = m.href;
   CapAnO.target = '_blank';
   CapAnO.textContent = TitleS;
   ImgO.src = m.src;
   ImgAnO.href = m.href;
   ImgAnO.target = '_blank';
   TimeO.textContent = 'released ' + YearS + ' - posted ' + DateF(DateS);
   return FigO;
}

fetch('/umber/umber.json').then(JsonF).then(DataF);
