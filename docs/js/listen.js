'use strict';
const gei = s1 => document.getElementById(s1);
const path = 'https://github.com/muv1/umber/releases/download';
const s_json = '/umber/umber.json';

fetch(s_json).
then(resp => resp.json()).
then(a1 => {
   const n_id = new URLSearchParams(location.search).get('v');
   const vdeo = a1.find(trck => trck[0] == n_id);
   const dstr = new Date(vdeo[0] * 1000).toDateString();

   gei('listen').src = path + '/' + vdeo[2].slice(2) + '/' + vdeo[0];
   gei('listen').poster = path + '/' + vdeo[2].slice(2) + '/image.jpg';
   gei('artist').textContent = vdeo[3];
   gei('date').textContent = 'released ' + vdeo[1] + ' - posted ' + dstr;
   document.title = vdeo[3] + ' - Umber Listen';
});
