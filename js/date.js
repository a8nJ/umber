'use strict';

export function getDate(id) {
   const parse = parseInt(id, 36);
   const date = new Date(parse * 1000);
   const fmt = new Intl.DateTimeFormat('en', {
      day: 'numeric', month: 'short', weekday: 'short', year: 'numeric'
   });
   const parts = (acc, cur) => {
      return {...acc, [cur.type]: cur.value};
   };
   const m = fmt.formatToParts(date).reduce(parts, {});
   return [m.weekday, m.month, m.day, m.year].join(' ');
}
