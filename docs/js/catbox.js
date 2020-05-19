'use strict';

export function f_catbox(s_id_1, s_id_3) {
   // <a>
   const o_a = document.createElement('a');
   o_a.href = location.origin + '/umber/catbox?v=' + s_id_1;
   // <img>
   const o_img = document.createElement('img');
   o_img.src = 'https://files.catbox.moe/' + s_id_3 + '.jpg';
   // return
   o_a.append(o_img);
   return o_a;
}
