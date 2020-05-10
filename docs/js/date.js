'use strict';
const s_dig = '-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz';

function r64_decode(s_in) {
   let n_out = 0;
   for (const s_chr of s_in) {
      n_out = n_out << 6 | s_dig.indexOf(s_chr);
   }
   return n_out;
}

export function f_date(s_id) {
   const n_id = r64_decode(s_id);
   const o1 = new Date(n_id * 1000);
   const s_day = o1.toLocaleString(0, {weekday: 'short'});
   const s_mon = o1.toLocaleString(0, {month: 'short', day: 'numeric'});
   const s_year = o1.toLocaleString(0, {year: 'numeric'});
   return s_day + ' ' + s_mon + ' ' + s_year;
}
