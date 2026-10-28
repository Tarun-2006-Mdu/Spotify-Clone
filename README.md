# 🎵 Spotify Clone App

A modern, web-based **Spotify Clone** built using HTML, CSS, and JavaScript. This project recreates the core interface and music playback experience of Spotify, featuring a sleek dark-themed design, song search, liked songs, library navigation, and an interactive music player.

The application demonstrates front-end web development concepts, including DOM manipulation, event handling, audio playback, and dynamic user interface updates.

## ✨ Features

* 🎧 **Music Player:** Play and pause songs directly in the browser.
* ⏭️ **Playback Controls:** Switch between the next and previous tracks.
* 🔍 **Song Search:** Search for songs by title or artist.
* ❤️ **Liked Songs:** Add songs to or remove songs from your liked collection.
* 📚 **Your Library:** Access your library and liked songs.
* 🎶 **Playlist Interface:** View songs in a playlist-style layout.
* ➕ **Create Playlist:** Add playlist entries to the sidebar.
* ⏱️ **Playback Progress:** View the current playback time and track duration.
* 🎚️ **Volume Control:** Adjust playback volume and mute or unmute audio.
* 🖼️ **Album Artwork:** Display cover images alongside song information.
* 📱 **Responsive Design:** Designed as a modern music-streaming interface.
* 🔔 **Toast Notifications:** Receive feedback when songs are liked or playlists are created.

## 🛠️ Technologies Used

| Technology       | Purpose                                                 |
| ---------------- | ------------------------------------------------------- |
| HTML5            | Structures the application interface                    |
| CSS3             | Styles the interface and dark-themed layout             |
| JavaScript       | Implements music playback and interactive functionality |
| HTML Audio API   | Plays audio tracks and provides playback information    |
| Google Fonts     | Provides the Inter typography                           |
| Material Symbols | Supplies interface icons                                |
| Cloudinary       | Hosts audio files used by the player                    |
| Unsplash         | Provides album artwork images                           |

## 📸 Application Overview

The application is organized into several sections:

### 🏠 Home

Displays the main playlist with song titles, artists, albums, dates added, and track durations.

### 🔍 Search

Allows users to search the available song collection by title or artist.

### 📚 Your Library

Provides access to the library interface and liked songs collection.

### ❤️ Liked Songs

Displays songs marked as favorites and provides playback controls.

### 🎵 Music Player

A persistent bottom player provides:

* Play and pause.
* Previous and next track navigation.
* Current playback time and total duration.
* Clickable playback progress bar.
* Volume adjustment and mute controls.
* Current track title, artist, and cover image.

## 📂 Project Structure

```text
Spotify-Clone/
│
├── index.html       # Main application interface
├── style.css        # Styling and layout
├── script.js        # Music player and application logic
└── README.md        # Project documentation
```

*The filenames above reflect the expected structure. Adjust them if your repository uses a different naming convention.*

## 🚀 Getting Started

Follow these steps to run the application locally.

### Prerequisites

You need:

* A modern web browser such as Chrome, Edge, or Firefox.
* A code editor such as Visual Studio Code.
* An active internet connection for remotely hosted audio, album artwork, and external fonts and icons.

### 1. Clone the Repository

```bash
git clone YOUR_REPOSITORY_URL
```

Replace `YOUR_REPOSITORY_URL` with your GitHub repository's clone URL.

### 2. Navigate to the Project Folder

```bash
cd Spotify-Clone
```

Replace `Spotify-Clone` with your actual project directory name if it differs.

### 3. Run the Application

**Option 1: Open directly**

Open `index.html` in your web browser.

**Option 2: Use Visual Studio Code**

1. Open the project folder in VS Code.
2. Install the Live Server extension if needed.
3. Right-click `index.html`.
4. Select **Open with Live Server**.

The application should open in your browser.

## 🎼 How to Use

1. Open the application in your browser.
2. Browse the available songs on the Home page.
3. Select a song to start playback.
4. Use the player controls to pause, resume, or change tracks.
5. Search for songs using the Search section.
6. Click the heart icon to add a song to Liked Songs.
7. Open Your Library to access the library interface.
8. Adjust the volume or seek to a specific position in a track using the player controls.

**Note:** The current implementation uses a predefined collection of songs. Search results are limited to tracks included in that collection.

## ⚙️ Key Implementation Details

### Dynamic Song Rendering

JavaScript dynamically generates song rows containing track information, album artwork, duration, and like buttons.

### Audio Playback

The HTML Audio API manages audio playback, track duration, playback progress, and volume.

### Search Functionality

The application filters the predefined song collection using case-insensitive matching against song titles and artist names.

### Liked Songs Management

Users can toggle the liked status of individual songs. The Home, Search, and Liked Songs views are updated to reflect changes.

### Navigation

JavaScript switches between Home, Search, Library, and Liked Songs views without reloading the page.

### Playback Progress and Volume

The player updates the progress bar and timestamps during playback. Users can click or drag across the progress and volume bars to adjust playback position and volume.

## 🔮 Future Enhancements

Potential improvements include:

* User authentication and personalized accounts.
* Persistent liked songs using Local Storage or a database.
* Fully functional, user-managed playlists.
* Album and artist browsing.
* Shuffle and repeat playback.
* Keyboard shortcuts for music controls.
* Mobile-responsive refinements.
* Integration with a music metadata API.
* Backend support for user preferences and playlists.
* Improved accessibility and keyboard navigation.

## 🎯 Learning Outcomes

This project provides practical experience with:

* Front-end web application development.
* JavaScript DOM manipulation.
* Event listeners and event handling.
* Audio playback using the HTML Audio API.
* Dynamic rendering of data.
* Search and filtering functionality.
* Interactive user interface design.
* Organizing a multi-file web application.

## 👨‍💻 Author

**Tarunraj M.**

* GitHub: [Tarun-2006-Mdu](https://github.com/Tarun-2006-Mdu)

## ⚖️ Disclaimer

This project is an independent educational clone created for learning and demonstration purposes. It is not affiliated with, endorsed by, or sponsored by Spotify.

Spotify is a trademark of Spotify AB. All third-party trademarks, music, and artwork belong to their respective owners.

## ⭐ Show Your Support

If you find this project useful, consider giving the repository a ⭐ on GitHub!

---

**Built with ❤️ using HTML, CSS, and JavaScript.**
