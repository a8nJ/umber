'use strict';

const fmt = [
   {weekday: 'short'}, {month: 'short'}, {day: 'numeric'}, {year: 'numeric'}
];

export function getDate(id) {
   const parse = parseInt(id, 36);
   const date = new Date(parse * 1000);
   return join(date, fmt, ' ');
}

function join(t, a, s) {
   function format(m) {
      let f = new Intl.DateTimeFormat('en', m);
      return f.format(t);
   }
   return a.map(format).join(s);
}
