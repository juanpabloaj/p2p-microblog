## P2P microblog

Distributed microblogging with [beakerbrowser].

* Every post is a new and separated dat file.
* The dat url of the new posts are added to the `posts.json` file.
* Every user can subscribe to other user adding the dat url to the `sources.json` file.
* The subscription is based on following the changes of the `posts.json` file of the other user.

[beakerbrowser]: https://beakerbrowser.com/
