'use strict';

function Radix64() {
   let s = '-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz';
   this.s_dig = s;
}

Radix64.prototype.decode = function (s_in) {
   let n_out = 0;
   for (let s_chr of s_in) {
      n_out = n_out * 64 + this.s_dig.indexOf(s_chr);
   }
   return n_out;
};

export function f_date(s_id) {
   const o_rad = new Radix64;
   const n_id = o_rad.decode(s_id);
   const o_dat = new Date(n_id * 1000);
   const s_day = o_dat.toLocaleString(0, {weekday: 'short'});
   const s_mon = o_dat.toLocaleString(0, {month: 'short', day: 'numeric'});
   const s_year = o_dat.toLocaleString(0, {year: 'numeric'});
   return s_day + ' ' + s_mon + ' ' + s_year;
}
