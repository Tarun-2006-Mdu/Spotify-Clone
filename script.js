let songs = [
    {
        id: 1,
        title: "The Fog",
        artist: "Trey Xavier, Rod Kim",
        album: "The Fog",
        dateAdded: "Oct 25, 2023",
        duration: "0:00",
        url: "https://res.cloudinary.com/dtzwp6bwa/video/upload/v1778227019/The_Fog_-_Trey_Xavier_Rod_Kim_u7tf81.mp3",
        cover: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?q=80&w=200&auto=format&fit=crop",
        isLiked: false
    },
    {
        id: 2,
        title: "Working",
        artist: "Cory Barker feat. Jordan King",
        album: "Working",
        dateAdded: "Oct 25, 2023",
        duration: "0:00",
        url: "https://res.cloudinary.com/dtzwp6bwa/video/upload/v1778227013/Working_-_Cory_Barker_feat._Jordan_King_pkg527.mp3",
        cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=200&auto=format&fit=crop",
        isLiked: false
    },
    {
        id: 3,
        title: "Taught Her How To Leave",
        artist: "Bill Douglas",
        album: "Taught Her How To Leave",
        dateAdded: "Oct 25, 2023",
        duration: "0:00",
        url: "https://res.cloudinary.com/dtzwp6bwa/video/upload/v1778227006/Taught_Her_How_To_Leave_-_Bill_Douglas_og9qhi.mp3",
        cover: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=200&auto=format&fit=crop",
        isLiked: false
    },
    {
        id: 4,
        title: "Tonight Again",
        artist: "Rod Kim feat. Mostly Moss",
        album: "Tonight Again",
        dateAdded: "Oct 25, 2023",
        duration: "0:00",
        url: "https://res.cloudinary.com/dtzwp6bwa/video/upload/v1778226997/Tonight_Again_-_Rod_Kim_feat._Mostly_Moss_idsgtr.mp3",
        cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=200&auto=format&fit=crop",
        isLiked: false
    }
];

let currentSongIndex = 0;
let isPlaying = false;
let isMuted = false;
let previousVolume = 1;

// DOM Elements
const audio = document.getElementById('audio-player');
const playBtn = document.getElementById('play-btn');
const playIcon = document.getElementById('play-icon');
const mainPlayBtn = document.getElementById('main-play-btn');
const likedPlayBtn = document.getElementById('liked-play-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

const currentCover = document.getElementById('current-cover');
const currentTitle = document.getElementById('current-title');
const currentArtist = document.getElementById('current-artist');

const progressBarContainer = document.getElementById('progress-container');
const progressFill = document.getElementById('progress');
const progressThumb = document.querySelector('#progress-container .progress-bar-thumb');
const currentTimeEl = document.getElementById('current-time');
const totalTimeEl = document.getElementById('total-time');

const volumeContainer = document.getElementById('volume-container');
const volumeProgress = document.getElementById('volume-progress');
const volumeThumb = document.querySelector('#volume-container .progress-bar-thumb');
const muteBtn = document.getElementById('mute-btn');
const volumeIcon = document.getElementById('volume-icon');

// Views & Navigation
const homeView = document.getElementById('home-view');
const searchView = document.getElementById('search-view');
const libraryView = document.getElementById('library-view');
const likedView = document.getElementById('liked-view');

const topbarSearch = document.getElementById('topbar-search');
const searchInput = document.getElementById('search-input');

const songListTbody = document.getElementById('song-list');
const searchListTbody = document.getElementById('search-list');
const likedListTbody = document.getElementById('liked-list');

const navHome = document.getElementById('nav-home');
const navSearch = document.getElementById('nav-search');
const navLibrary = document.getElementById('nav-library');
const actionCreate = document.getElementById('action-create');
const actionLiked = document.getElementById('action-liked');

const scrollablePlaylists = document.querySelector('.scrollable-playlists');
const likedCount = document.getElementById('liked-count');
const libraryLikedCount = document.getElementById('library-liked-count');

// Init
function init() {
    renderSongsList(songs, songListTbody);
    renderLikedSongs();
    loadSong(currentSongIndex);
    
    audio.volume = 1;
    updateVolumeUI(1);

    songs.forEach((song, index) => {
        const tempAudio = new Audio(song.url);
        tempAudio.addEventListener('loadedmetadata', () => {
            song.duration = formatTime(tempAudio.duration);
            document.querySelectorAll(`.duration-${song.id}`).forEach(el => el.textContent = song.duration);
            if (index === currentSongIndex) {
                totalTimeEl.textContent = song.duration;
            }
        });
    });
}

function renderSongsList(list, tbody, isSearch = false) {
    tbody.innerHTML = '';
    
    if (list.length === 0 && !isSearch) {
        tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; padding: 40px; color: var(--text-subdued);">No songs yet.</td></tr>`;
        return;
    }

    list.forEach((song, index) => {
        const tr = document.createElement('tr');
        tr.className = `song-row-${song.id}`;
        
        tr.innerHTML = `
            <td class="col-index">
                <span class="row-index">${index + 1}</span>
                <span class="material-symbols-outlined filled row-play-icon">play_arrow</span>
                <img src="https://misc.scdn.co/etc/playing.gif" class="playing-gif" alt="playing">
            </td>
            <td>
                <div class="song-info">
                    <img src="${song.cover}" alt="${song.title}" class="song-cover">
                    <div class="song-details">
                        <span class="song-title">${song.title}</span>
                        <span class="song-artist">${song.artist}</span>
                    </div>
                </div>
            </td>
            <td><span class="song-album">${song.album}</span></td>
            ${!isSearch ? `<td><span class="song-date">${song.dateAdded}</span></td>` : ''}
            <td class="col-duration" style="display:flex; justify-content:flex-end; align-items:center; gap:16px;">
                <button class="like-btn-track ${song.isLiked ? 'liked' : ''}" data-id="${song.id}">
                    <span class="material-symbols-outlined ${song.isLiked ? 'filled' : ''}">favorite</span>
                </button>
                <span class="song-time duration-${song.id}">${song.duration}</span>
            </td>
        `;

        tr.addEventListener('click', (e) => {
            if (e.target.closest('.like-btn-track')) return;
            const songIndexInMainArray = songs.findIndex(s => s.id === song.id);
            if (currentSongIndex === songIndexInMainArray) {
                togglePlay();
            } else {
                currentSongIndex = songIndexInMainArray;
                loadSong(currentSongIndex);
                playSong();
            }
        });

        const likeBtn = tr.querySelector('.like-btn-track');
        likeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleLike(song.id);
        });

        tbody.appendChild(tr);
    });
    
    updateActiveRow();
}

function toggleLike(songId) {
    const song = songs.find(s => s.id === songId);
    if (song) {
        song.isLiked = !song.isLiked;
        renderSongsList(songs, songListTbody);
        if (!searchView.classList.contains('hidden')) handleSearch();
        renderLikedSongs();
        showToast(song.isLiked ? 'Added to Liked Songs' : 'Removed from Liked Songs');
    }
}

function renderLikedSongs() {
    const likedSongs = songs.filter(s => s.isLiked);
    renderSongsList(likedSongs, likedListTbody);
    const countText = `${likedSongs.length} song${likedSongs.length !== 1 ? 's' : ''}`;
    if (likedCount) likedCount.textContent = countText;
    if (libraryLikedCount) libraryLikedCount.textContent = countText;
}

// Navigation
function switchView(viewElement, navElement) {
    [homeView, searchView, libraryView, likedView].forEach(v => {
        if(v) v.classList.add('hidden');
    });
    if(viewElement) viewElement.classList.remove('hidden');
    
    [navHome, navSearch, navLibrary, actionLiked].forEach(n => {
        if(n) n.classList.remove('active');
    });
    if (navElement) navElement.classList.add('active');
    
    if (viewElement === searchView) {
        topbarSearch.classList.remove('hidden');
        searchInput.focus();
    } else {
        topbarSearch.classList.add('hidden');
    }
}

navHome?.addEventListener('click', (e) => { e.preventDefault(); switchView(homeView, navHome); });
navSearch?.addEventListener('click', (e) => { e.preventDefault(); switchView(searchView, navSearch); });
navLibrary?.addEventListener('click', (e) => { e.preventDefault(); switchView(libraryView, navLibrary); });
actionLiked?.addEventListener('click', (e) => { e.preventDefault(); switchView(likedView, actionLiked); });
document.getElementById('card-liked-songs')?.addEventListener('click', () => { switchView(likedView, actionLiked); });

actionCreate?.addEventListener('click', (e) => {
    e.preventDefault();
    const p = document.createElement('p');
    p.className = 'playlist-item';
    p.textContent = `My Playlist #${document.querySelectorAll('.playlist-item').length + 1}`;
    scrollablePlaylists.appendChild(p);
    showToast('Playlist created!');
});

searchInput?.addEventListener('input', handleSearch);

function handleSearch() {
    const query = searchInput.value.toLowerCase();
    const resultsTable = document.getElementById('search-results-table');
    const emptyState = document.getElementById('search-empty-state');
    
    if (query.trim() === '') {
        resultsTable.classList.add('hidden');
        emptyState.classList.remove('hidden');
        return;
    }
    
    resultsTable.classList.remove('hidden');
    emptyState.classList.add('hidden');
    
    const filtered = songs.filter(s => 
        s.title.toLowerCase().includes(query) || 
        s.artist.toLowerCase().includes(query)
    );
    
    renderSongsList(filtered, searchListTbody, true);
}

// Player Functions
function loadSong(index) {
    const song = songs[index];
    if(!song) return;
    audio.src = song.url;
    
    currentCover.src = song.cover;
    currentCover.classList.remove('hidden');
    currentTitle.textContent = song.title;
    currentArtist.textContent = song.artist;

    updateActiveRow();
}

function updateActiveRow() {
    document.querySelectorAll('tr').forEach(row => {
        row.classList.remove('playing');
        const playIcon = row.querySelector('.row-play-icon');
        if (playIcon) playIcon.textContent = 'play_arrow';
    });

    const currentSong = songs[currentSongIndex];
    if (!currentSong) return;
    
    const activeRows = document.querySelectorAll(`.song-row-${currentSong.id}`);
    activeRows.forEach(row => {
        row.classList.add('playing');
        const playIcon = row.querySelector('.row-play-icon');
        if (isPlaying && playIcon) {
            playIcon.textContent = 'pause';
        } else if (playIcon) {
            playIcon.textContent = 'play_arrow';
        }
    });
}

function togglePlay() {
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
}

function playSong() {
    isPlaying = true;
    playIcon.textContent = 'pause';
    if(mainPlayBtn) mainPlayBtn.querySelector('.material-symbols-outlined').textContent = 'pause';
    if(likedPlayBtn) likedPlayBtn.querySelector('.material-symbols-outlined').textContent = 'pause';
    audio.play();
    updateActiveRow();
}

function pauseSong() {
    isPlaying = false;
    playIcon.textContent = 'play_arrow';
    if(mainPlayBtn) mainPlayBtn.querySelector('.material-symbols-outlined').textContent = 'play_arrow';
    if(likedPlayBtn) likedPlayBtn.querySelector('.material-symbols-outlined').textContent = 'play_arrow';
    audio.pause();
    updateActiveRow();
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    if (isPlaying) playSong();
}

function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    if (isPlaying) playSong();
}

function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    if (isNaN(duration)) return;

    const progressPercent = (currentTime / duration) * 100;
    progressFill.style.width = `${progressPercent}%`;
    progressThumb.style.left = `${progressPercent}%`;

    currentTimeEl.textContent = formatTime(currentTime);
    totalTimeEl.textContent = formatTime(duration);
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.type.includes('touch') ? e.touches[0].clientX - this.getBoundingClientRect().left : e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

function updateVolumeUI(volume) {
    const percent = volume * 100;
    volumeProgress.style.width = `${percent}%`;
    volumeThumb.style.left = `${percent}%`;

    if (volume === 0) {
        volumeIcon.textContent = 'volume_off';
    } else if (volume < 0.5) {
        volumeIcon.textContent = 'volume_down';
    } else {
        volumeIcon.textContent = 'volume_up';
    }
}

function setVolume(e) {
    const width = this.clientWidth;
    const clickX = e.type.includes('touch') ? e.touches[0].clientX - this.getBoundingClientRect().left : e.offsetX;
    
    let volume = clickX / width;
    if (volume < 0) volume = 0;
    if (volume > 1) volume = 1;

    audio.volume = volume;
    if (volume > 0) {
        isMuted = false;
        previousVolume = volume;
    } else {
        isMuted = true;
    }
    updateVolumeUI(volume);
}

function toggleMute() {
    if (isMuted) {
        audio.volume = previousVolume > 0 ? previousVolume : 1;
        isMuted = false;
    } else {
        previousVolume = audio.volume;
        audio.volume = 0;
        isMuted = true;
    }
    updateVolumeUI(audio.volume);
}

function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}

function showToast(message) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;

    container.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Event Listeners for Player
playBtn.addEventListener('click', togglePlay);
[mainPlayBtn, likedPlayBtn].forEach(btn => {
    btn?.addEventListener('click', () => {
        if (audio.src === '' || audio.src.endsWith(location.host + '/')) {
            loadSong(0);
            playSong();
        } else {
            togglePlay();
        }
    });
});
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('ended', nextSong);

progressBarContainer.addEventListener('click', setProgress);
volumeContainer.addEventListener('click', setVolume);
muteBtn.addEventListener('click', toggleMute);

let isDraggingProgress = false;
progressBarContainer.addEventListener('mousedown', () => isDraggingProgress = true);
document.addEventListener('mouseup', () => isDraggingProgress = false);
progressBarContainer.addEventListener('mousemove', (e) => { if (isDraggingProgress) setProgress.call(progressBarContainer, e); });

let isDraggingVolume = false;
volumeContainer.addEventListener('mousedown', () => isDraggingVolume = true);
document.addEventListener('mouseup', () => isDraggingVolume = false);
volumeContainer.addEventListener('mousemove', (e) => { if (isDraggingVolume) setVolume.call(volumeContainer, e); });

init();
