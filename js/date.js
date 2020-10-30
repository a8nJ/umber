'use strict';

export function f_date(s_id) {
   const n_id = parseInt(s_id, 36);
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
