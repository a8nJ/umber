# Soundcloud

No way to autoplay on mobile. Also MP3 transparency is at 175 kbit/s, and
these only uses 128:

~~~
$ youtube-dl -F https://soundcloud.com/wyeoak/mary-is-mary
[soundcloud] wyeoak/mary-is-mary: Downloading webpage
[soundcloud] wyeoak/mary-is-mary: Downloading info JSON
[soundcloud] 312419154: Downloading track url
[soundcloud] 312419154: Downloading m3u8 information
[info] Available formats for 312419154:
format code       extension  resolution note
hls_mp3_128_url   mp3        audio only audio@128k
http_mp3_128_url  mp3        audio only audio@128k (best)
~~~
