'use strict';

export function f_youtube(s_id_2, s_title) {
   const o_a = document.createElement('a');
   // video unavailable: youtube.com/embed/4Dcoz65iKQM
   o_a.href = 'https://www.youtube.com/watch?v=' + s_id_2 + '#' + s_title;
   const o_img = document.createElement('img');
   o_img.src = 'https://i.ytimg.com/vi/' + s_id_2 + '/sd1.jpg';
   // return
   o_a.append(o_img);
   return o_a;
}
