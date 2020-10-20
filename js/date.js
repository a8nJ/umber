'use strict';

const Radix64 = {
   digits: '-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz',
   decode(s_in) {
      let n_out = 0;
      for (let s_chr of s_in) {
         n_out = n_out * 64 + this.digits.indexOf(s_chr);
      }
      return n_out;
   }
};

export function f_date(s_id) {
   const n_id = Radix64.decode(s_id);
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
