'use strict';

export function f_github(s_id_1, s_id_2) {
   // <a>
   const o_a = document.createElement('a');
   o_a.href = location.origin + '/umber/listen?v=' + s_id_1;
   // <img>
   const o_img = document.createElement('img');
   const s_path = '/muv1/umber/releases/download/' + s_id_2 + '/image.jpg';
   o_img.src = 'https://github.com' + s_path;
   // return
   o_a.append(o_img);
   return o_a;
}
