'use strict';
const s_dig = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_';

function r64_decode(s_in) {
   let n_out = 0;
   for (const s_chr of s_in) {
      n_out = n_out << 6 | s_dig.indexOf(s_chr);
   }
   return n_out;
}

export function f_date(s_id) {
   const n_id = r64_decode(s_id);
   return new Date(n_id * 1000).toDateString();
}
