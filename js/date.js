'use strict';

export function getDate(id_s) {
   const id_n = parseInt(id_s, 36);
   const date_o = new Date(id_n * 1000);
   const fmt_o = new Intl.DateTimeFormat('en', {
      day: 'numeric', month: 'short', weekday: 'short', year: 'numeric'
   });
   const parts_f = (acc_m, cur_m) => {
      return {...acc_m, [cur_m.type]: cur_m.value};
   };
   const m = fmt_o.formatToParts(date_o).reduce(parts_f, {});
   return [m.weekday, m.month, m.day, m.year].join(' ');
}
