const songs = [
    { id: 1, name: 'mockingBird', artist: 'Eminem', img: 'maxresdefault.jpg', genre: 'hip-hop' , sources: "Mockingbird_192(PaglaSongs).mp3"},
    { id: 2, name: 'shapeOfYou', artist: 'Ed sheran', img: 'mqdefault.jpg', genre: 'pop' , sources: "Shape-of-You---Ed-Sheeran(musicdownload.cc).mp3"},
    { id: 3, name: 'mai parwana', artist: 'arijit singh', img: 'maiParwana.png', genre: 'romantic' , sources: "Main-Parwaana-Tera-Naam-Batana(PagalWorlld.Com).mp3"},
    { id: 4, name: 'gooseBump', artist: 'Travis Scot', img: 'download.jpg', genre: 'mumble' , sources: "Travis-Scott-goosebumps.mp3"},
    { id: 5, name: 'chaleya', artist: 'arijit singh', img: 'chaleya-song-141618193-1x1.webp', genre: 'romantic' , sources: "CHALEYA-SONG---JAWAN(musicdownload.cc).mp3"},
    { id: 6, name: 'lovin on me', artist: 'jack Harlow', img: 'lovin on me.jpeg', genre: 'hip-hop' , sources: "Mockingbird_192(PaglaSongs).mp3"},
    { id: 7, name: 'night Changes', artist: 'one direction', img: 'onedirection.jpg', genre: 'pop' , sources: "Mockingbird_192(PaglaSongs).mp3"},
    { id: 8, name: 'praise the lord', artist: 'Asap rocky', img: 'praiseTheLord.jpg', genre: 'mumble' , sources: "Mockingbird_192(PaglaSongs).mp3"},
    { id: 9, name: '295', artist: 'sidhu moosewala', img: '295.jpg', genre: 'punjabi' , sources: "Mockingbird_192(PaglaSongs).mp3"},
    { id: 10, name: 'jingle bell', artist: 'Honey singh', img: 'jingleBell.jpg', genre: 'hip-hop' , sources: "Mockingbird_192(PaglaSongs).mp3"}
];



const allGenres = [...new Set(songs.map(song => song.genre))];

// Create the select element
const genreFilterDropDown = document.createElement('select');
genreFilterDropDown.id = 'genre-filter';
genreFilterDropDown.addEventListener("change", filterSongs);

// Add the label before the genre dropdown
const genreFilterLabel = document.createElement('label');
genreFilterLabel.id = 'genre-filter';
genreFilterLabel.textContent = 'Filter by Genre:';

const allSongsSection = document.getElementById('all-songs');

allSongsSection.insertBefore(genreFilterDropDown, allSongsSection.firstChild);
allSongsSection.insertBefore(genreFilterLabel, allSongsSection.firstChild);

// Add the 'All Genres' option
const allGenresOption = document.createElement('option');
allGenresOption.value = 'all';
allGenresOption.textContent = 'All Genres';
genreFilterDropDown.appendChild(allGenresOption);

// Add the rest of the genre options
allGenres.forEach(genre => {
    const option = document.createElement('option');
    option.value = genre;
    option.textContent = genre.charAt(0).toUpperCase() + genre.slice(1);
    genreFilterDropDown.appendChild(option);
});

// Function to filter the songs based on genre
function filterSongs() {
    const genreFilter = genreFilterDropDown.value;
    const songListContainer = document.getElementById("song-list");

    songListContainer.innerHTML = "";
    const filteredSongs = (genreFilter === 'all') ? songs : songs.filter(song => song.genre === genreFilter);

    filteredSongs.forEach(song => {
        const listItem = document.createElement("li");
        listItem.className = "song-item";
        listItem.textContent = `${song.name} - ${song.artist}`;

        listItem.addEventListener('click', function () {
            renderCurrentSong(song);
        });
        songListContainer.appendChild(listItem);
    });
}

function renderCurrentSong(song) {
    const songCard = document.getElementById('selected-song');

    // Clear the existing content in the song card
    songCard.innerHTML = "";

    // Create elements to display song information
    const imageElement = document.createElement('img');
    imageElement.src = song.img;
    imageElement.alt = song.name;

    const songInfo = document.createElement('div');
    songInfo.innerHTML = `<strong>${song.name}</strong> - ${song.artist}`;


    const audio = document.createElement('audio');
    audio.controls = true;
    audio.autoplay = true;
    const source = document.createElement('source');
    source.src=song.sources;
    source.type='audio/mp3'
    audio.appendChild(source);
  
    

    


    // Create control buttons
    const previousButton = document.createElement('button');
    previousButton.textContent = 'Previous';
    previousButton.addEventListener('click', () => playPreviousSong(song.id));

    const nextButton = document.createElement('button');
    nextButton.textContent = 'Next';
    nextButton.addEventListener('click', () => playNextSong(song.id));

    const addToPlaylistButton = document.createElement('button');
    addToPlaylistButton.textContent = 'Add to Playlist';
    addToPlaylistButton.addEventListener('click', () => addSongToPlaylist(song));

    // Append elements to the song card
    songCard.appendChild(imageElement);
    songCard.appendChild(songInfo);
    songCard.appendChild(audio);
    songCard.appendChild(previousButton);
    songCard.appendChild(nextButton);
    songCard.appendChild(addToPlaylistButton);
}

// Function to play the previous song
function playPreviousSong(ind) {
    if (ind > 1) {
        ind--;
        renderCurrentSong(songs[ind - 1]);
    }
}

// Function to play the next song
function playNextSong(ind) {
    if (ind < songs.length) {
        renderCurrentSong(songs[ind]);
    }
}


const playlists = [];

function createPlaylist() {
  const playlistName = document.getElementById('add-playlist-input').value;
  if (playlistName.trim() !== '') {
    playlists.push({
      name: playlistName,
      songs: []
    });
    playlistName.innerHTML=" ";
    updatePlaylistUI();
   
  }
}

function updatePlaylistUI() {
  const playlistContainer = document.getElementById('playlist-container');
  playlistContainer.innerHTML = '';

  playlists.forEach((playlist, index) => {
    const playlistItem = document.createElement('li');
    playlistItem.classList.add('playlist');
    playlistItem.textContent= `${playlist.name}`;
    playlistItem.addEventListener('click', function() {
     // showSongs(index);
      currentPlaylist(index);
    });
   
    playlistContainer.appendChild(playlistItem);
  });
}



function currentPlaylist(playlistIndex){
const playlistSelect=document.getElementById('current-playlist');
playlistSelect.innerHTML='';
playlistSelect.value=playlistIndex;
playlists[playlistIndex].songs.forEach((song)=>{

  const songlistItem=document.createElement('li');
  songlistItem.classList.add('songlist');
  songlistItem.textContent=`${song}`;


playlistSelect.appendChild(songlistItem);
});
}

function addSongToPlaylist(song) {
  
    const playlistIndex = document.getElementById('current-playlist').value;
    playlists[playlistIndex].songs.push(`${song.name} - ${song.artist}`);
    alert('Song added to the playlist!');
    currentPlaylist(playlistIndex);
  
}

const changeTheme=document.getElementById('toggle');
const toggleButton=document.createElement('button')
toggleButton.textContent='toggle Theme';
toggleButton.addEventListener('click',()=>{
  toggleTheme();
});



function toggleTheme()
{
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';

  // Toggle between light and dark themes
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';

  // Set the new theme in the HTML attribute
  document.documentElement.setAttribute('data-theme', newTheme);

  // Save the theme preference in local storage if needed
  localStorage.setItem('theme', newTheme);

}
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  document.documentElement.setAttribute('data-theme', savedTheme);
}
changeTheme.appendChild(toggleButton);
filterSongs();