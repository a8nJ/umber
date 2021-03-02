'use strict';
export const hash = 'QmdY1QwDTnikSsBFUWNW42qzi6JGPGBpwCQwEqaewYBDBg';

export function cloudflare(param) {
   const m = {};
   m.href = location.origin + '/umber/cloudflare?a=' + param.get('a');
   m.src = '//cloudflare-ipfs.com/ipfs/' + hash + '/' + param.get('b') + '.jpg';
   return m;
}
