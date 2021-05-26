---
title: Download 320kbps MP3s From Your Premium Spotify Account
description: Learn how to store a local copy of your premium Spotify music using open-source software.
tags: [music, spotify]
published: true
publishDate: 2015-01-27
previousUrl: https://blog.benjamincharity.com/download-320kbps-mp3s-from-your-premium-spotify-account/
---

# Download 320kbps MP3s from your premium Spotify account.

Recently I ran across a Node.js library called [Spotijay][spotijay] which allowed you to download Spotify playlists 
to your hard-drive and keep them synced. While Spotify allows you to save tracks to your device for 'offline' 
listening, I've found that the app needs at least some small amount of data transfer just to start up. Which, in my 
eyes, kind of kills the primary benefit of having 'offline' tracks. This feature seems to be about saving bandwidth rather than listening to tracks with no cell service.

I ran into a few issues getting it set up, so I thought I would post the solutions in case it could help anyone else.


### Prerequisites

- **Homebrew:** The [Homebrew][homebrew] package manager should be installed.
- **Spotify App Keys:** Download your Spotify premium developer app key. Find your keys [here][spotify_keys].

> **Note:** If you have not yet requested to be a Spotify developer, you will be asked to do so before your keys are made accessible.


### Setting the groundwork

1. Update/upgrade Homebrew:

```bash
brew update
brew upgrade
```

2. Install a few dependencies:

```bash
brew install homebrew/binary/libspotify lame sox eyeD3
```

3. Clone the [Spotijay][spotijay] repo to your desired location:

```bash
git clone git@github.com:alexperezpaya/Spotijay.git
```

4. CD into the directory that you just cloned:

```bash
cd spotijay
```

5. Grab the Spotify app key that you downloaded earlier and place it inside this directory.

6. Install [NPM][npm] dependencies:

```bash
npm install
```

7. Install [Forever][forever]. This is a tool that will keep the Spotijay script running continuously.

```bash
npm install -g forever
```

> **Note:** If you see an error on this step, you may need to install libspotify from source. More info [here][install_error].


### Configuring Spotijay

Next we need to configure the app with Spotify authentication. For help, run:

```bash
node app.js help
```

This is where I ran into this error:

<script src="https://gist.github.com/benjamincharity/df50392a38652534f4be.js"></script>

We can see from this error message that we seem to be missing a file here: `/usr/local/opt/libspotify/lib/libspotify`. Once we enter the `lib` directory:

```bash
cd /usr/local/opt/libspotify/lib/
```

You should see these contents:

```bash
pkgconfig/
libspotify.dylib
libspotify.12.dylib
libspotify.12.1.51.dylib
```

> **Note:** This was not my first attempt at getting libspotify installed. So I may have more files listed here than you are seeing in your directory. The important one is `libspotify.dylib`.

Now, I'm not one to go changing file or directory names within library directories all willy-nilly, but after reading [this thread][libspotify_name] I decided to give it a try.  For safety's sake, I duplicated the `libspotify.dylib` file before changing the name. Then I simply removed the `.dylib` extension to match the file noted in the error message.

Just like that, `$ node app.js help` worked beautifully.

Next up, we need to run the spotijay config script:

```bash
                      a)               b)               c) 
node app.js config -u your_username -p your_password -d ~/music_download
```

Nothing too magical here. We are simply calling config on the app.js server and passing in our a) user name, b) password and c) the destination folder (where the music will be saved).

At this point, you should be ready to begin downloading some music!


### Running Spotijay

The Spotijay [documentation][spotijay_docs] references this command to begin:

```bash
forever start app.js playlist spotify:playlistURI
```

But this did **not** work for me. I had to include my username in the call:

```bash
forever start app.js playlist spotify:user:MY_USERNAME:playlist:playlistURI
```

> **Note:** A playlist URI will be a string of random characters like this: `5uSLUnV6U9easnPRO4rNu3`. The only way I know of to find the URI for a playlist is to open the [Spotify web player][web_player] and navigate to the desired playlist. In the browser address bar you should see a URL ending with the current playlist's URI such as: `https://play.spotify.com/user/your_username/playlist/5uSLUnV6U9easnPRO4rNu3`

While the Spotijay documentation doesn't mention it, by looking at the [source code][track] it seems that you can also download single tracks if you so desire.

```bash
forever start app.js track spotify:user:MY_USERNAME:track:trackURI
```


##### Managing `Forever`

```bash
# See a list of all running forever process'
forever list

# Stop a process
forever stop UID  # replace `UID` with the UID returned from `forever list`

# Start a process
forever start app.js playlist spotify:user:MY_USERNAME:playlist:playlistURI
```


### A few final notes

- If your Spotify account is used from anywhere else, Forever's connection with Spotify will be ended. Simply kill the Forever process and restart it.
- Spotijay will only download files that are not found in the directory. So no worries about duplicates when restarting process'.
- When waking your computer from sleep, Forever will pick right back up where it left off; no restart necessary.

The only other thing that I wish Spotijay did out of the box was support different directories per playlist call. I'm sure it wouldn't be hard to extend the script (it's fairly small). Maybe I'll get around to that..someday.


[spotijay]: https://github.com/alexperezpaya/Spotijay
[homebrew]: http://brew.sh/
[spotify_keys]: https://devaccount.spotify.com/my-account/keys/
[npm]: https://www.npmjs.com/
[forever]: https://github.com/foreverjs/forever
[install_error]: https://github.com/alexperezpaya/Spotijay/issues/3
[libspotify_name]: https://github.com/alexperezpaya/Spotijay/issues/5
[spotijay_docs]: https://github.com/alexperezpaya/Spotijay/blob/master/README.md
[web_player]: http://play.spotify.com
[track]: https://github.com/alexperezpaya/Spotijay/blob/master/app.js#L103-L111
