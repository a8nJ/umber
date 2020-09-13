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
   const o_date = new Date(n_id * 1000);
   const o_fmt = new Intl.DateTimeFormat('en', {
      day: 'numeric', month: 'short', weekday: 'short', year: 'numeric'
   });
   const f_parts = (m_acc, m_cur) => {
      return {...m_acc, [m_cur.type]: m_cur.value};
   };
   const m = o_fmt.formatToParts(o_date).reduce(f_parts, {});
   return [m.weekday, m.month, m.day, m.year].join(' ');
}
