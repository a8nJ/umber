# List

Videos can be listed with the **playlistItems** or **search** APIs. It is
tempting to use the **playlistItems** API, as it has quota cost 1, while
**search** has quota cost 100. However **playlistItems** are not always
returned in order:

~~~
$ curl -G -s \
> -d part=snippet \
> -d key=AIzaSyCrNB6t8QVxyjXpTSXwpWGCu-kR35Ba8JQ \
> -d playlistId=UU-3jIAlnQmbbVMV6gR7K8aQ \
> https://www.googleapis.com/youtube/v3/playlistItems |
> grep publishedAt
    "publishedAt": "2019-08-10T01:00:00.000Z",
    "publishedAt": "2019-08-10T04:30:02.000Z",
    "publishedAt": "2019-08-10T04:00:00.000Z",
    "publishedAt": "2019-08-10T00:00:02.000Z",
    "publishedAt": "2019-08-10T14:00:09.000Z",
~~~

and no **order** parameter is available. Compare with **search**:

~~~
$ curl -G -s \
> -d order=date \
> -d part=snippet \
> -d key=AIzaSyCrNB6t8QVxyjXpTSXwpWGCu-kR35Ba8JQ \
> -d channelId=UC-3jIAlnQmbbVMV6gR7K8aQ \
> https://www.googleapis.com/youtube/v3/search |
> grep publishedAt
    "publishedAt": "2019-08-10T14:00:09.000Z",
    "publishedAt": "2019-08-10T13:30:02.000Z",
    "publishedAt": "2019-08-10T13:00:01.000Z",
    "publishedAt": "2019-08-10T12:30:00.000Z",
    "publishedAt": "2019-08-10T04:30:02.000Z",
~~~

## References

- <https://developers.google.com/youtube/v3/docs/playlistItems/list>
- <https://developers.google.com/youtube/v3/docs/search/list>
