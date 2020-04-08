# YouTube

## "img" over "iframe"

- `iframe` requires embedly in some cases
- Killing embeds makes loading faster
- Links will allow use of CSS `:focus` or `:active`
- Not all links can be embedded
- Using embeds breaks keyboard shortcuts

## Images

YouTube offers these image formats:

Resolution | URL
-----------|-----------------------------------------------------
1280 x 720 | <https://i.ytimg.com/vi/Vc-XzhnwpVc/maxresdefault.jpg>
1280 x 720 | <https://i.ytimg.com/vi/Vc-XzhnwpVc/maxres1.jpg>
640 x 480  | <https://i.ytimg.com/vi/Vc-XzhnwpVc/sddefault.jpg>
640 x 480  | <https://i.ytimg.com/vi/Vc-XzhnwpVc/sd1.jpg>
480 x 360  | <https://i.ytimg.com/vi/Vc-XzhnwpVc/hqdefault.jpg>
480 x 360  | <https://i.ytimg.com/vi/Vc-XzhnwpVc/hq1.jpg>
320 x 180  | <https://i.ytimg.com/vi/Vc-XzhnwpVc/mqdefault.jpg>
320 x 180  | <https://i.ytimg.com/vi/Vc-XzhnwpVc/mq1.jpg>
120 x 90   | <https://i.ytimg.com/vi/Vc-XzhnwpVc/default.jpg>
120 x 90   | <https://i.ytimg.com/vi/Vc-XzhnwpVc/1.jpg>

Note that **{maxres,sd,hq,mq,}{2,3}** are also available, they are taken from
different times in the video. We need to start by eliminating all the
**maxres** and **default** URLs, as they fail in some cases:

~~~
$ curl -I https://i.ytimg.com/vi/2Lpw3yMCWro/maxres1.jpg
HTTP/2 404

$ curl -I https://i.ytimg.com/vi/2Lpw3yMCWro/maxresdefault.jpg
HTTP/2 404

$ curl -I https://i.ytimg.com/vi/2Lpw3yMCWro/sd1.jpg
HTTP/2 200

$ curl -I https://i.ytimg.com/vi/2Lpw3yMCWro/sddefault.jpg
HTTP/2 404
~~~

Also **default** produces a different image:

- <https://i.ytimg.com/vi/SIBRmK74Tzk/sd1.jpg>
- <https://i.ytimg.com/vi/SIBRmK74Tzk/sddefault.jpg>

Our minimum resolution is 426 x 240, so that leaves us with **sd1** and
**hq1**. **hq1** displays significant artifacts, so we end with **sd1**.
We cannot trust the source of the page, as not all resolutions are listed:

~~~
$ curl -s https://www.youtube.com/watch?v=Vc-XzhnwpVc |
> grep -E -o '/(maxres|sd|hq|mq|[[:digit:]])[^/]*\.jpg' | sort -u
/hqdefault.jpg
/maxresdefault.jpg
~~~

Note **sd1** fails with some videos:

- <https://i.ytimg.com/vi/KbqzJYml520/sd1.jpg>
- <https://i.ytimg.com/vi/KbqzJYml520/hq1.jpg>

but these videos are 360p or lower resolution. Typically we will be able to
find alternative videos of higher quality.
