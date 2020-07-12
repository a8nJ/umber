<?php
declare(strict_types = 1);

function r64_encode($n_in) {
   $s_dig = '-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz';
   $s_out = '';
   do {
      $s_out = $s_dig[$n_in % 64] . $s_out;
      $n_in = intdiv($n_in, 64);
   } while ($n_in > 0);
   return $s_out;
}
