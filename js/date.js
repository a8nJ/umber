'use strict';

const fmts = [
   {weekday: 'short'}, {month: 'short'}, {day: 'numeric'}, {year: 'numeric'}
];

export function getDate(id) {
   const parse = parseInt(id, 36);
   const date = new Date(parse * 1000);
   return join(date, fmts, ' ');
}

function join(date, fmts, sep) {
   function format(fmt) {
      let time = new Intl.DateTimeFormat('en', fmt);
      return time.format(date);
   }
   return fmts.map(format).join(sep);
}
