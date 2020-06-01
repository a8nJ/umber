# Content

If we have a layout like this:

~~~html
<figure>
   <a href="//youtube.com/watch?v=NpTZVtNXht4">
      <img src="//i.ytimg.com/vi/NpTZVtNXht4/sd1.jpg">
      <figcaption>Shawn Colvin - Crazy</figcaption>
   </a>
   <time>released 2007 - posted Tue Feb 16 2016</time>
</figure>
~~~

Its maybe not ideal, as `<figcaption>` is block level:

<https://developer.mozilla.org/Web/HTML/Block-level_elements>

which makes the link block level. But then again, we might want block level to
ensure it is on separate line from the image. Only way to solve is to have two
`<a>`: one outside the `<img>` and one inside the `<figcaption>`. Result:

~~~html
<figure>
   <a href="//youtube.com/watch?v=NpTZVtNXht4">
      <img src="//i.ytimg.com/vi/NpTZVtNXht4/sd1.jpg">
   </a>
   <figcaption>
      <a href="//youtube.com/watch?v=NpTZVtNXht4">Shawn Colvin - Crazy</a>
   </figcaption>
   <time>released 2007 - posted Tue Feb 16 2016</time>
</figure>
~~~
