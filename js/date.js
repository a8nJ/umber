'use strict';

export function date_f(IdS) {
   const IdN = parseInt(IdS, 36);
   const DateO = new Date(IdN * 1000);
   const FmtO = new Intl.DateTimeFormat('en', {
      day: 'numeric', month: 'short', weekday: 'short', year: 'numeric'
   });
   const PartsF = (AccM, CurM) => {
      return {...AccM, [CurM.type]: CurM.value};
   };
   const m = FmtO.formatToParts(DateO).reduce(PartsF, {});
   return [m.weekday, m.month, m.day, m.year].join(' ');
}
