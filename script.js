const progress = document.getElementById('progress');
const song = document.getElementById("song");
const Left = document.getElementById('Left');
const Right = document.getElementById('Right');
const Tools = document.getElementById('Tools');
const Artists = document.getElementById('Artists');
const divImg = document.getElementById('divImg');

function updateEye() {
    const Eye = document.getElementById('Eye');
    if (Eye) {
        if (Eye.classList.contains('fa-eye')) {
            Eye.classList.remove('fa-eye');
            Eye.classList.add('fa-eye-low-vision');
        } else {
            Eye.classList.remove('fa-eye-low-vision');
            Eye.classList.add('fa-eye');
        }
    }
}

function Time() {
    const TimeClock = document.getElementById('Time');
    const Lemon = document.getElementById('Lemon');
    const Circle1 = document.querySelector('.circle1');
    const Alert = document.querySelector('.Alert');

    if (TimeClock && Lemon && Circle1 && Alert) {
        if (Circle1.style.display === 'none' || Circle1.style.display === '') {
            Circle1.style.display = 'block';
            Alert.classList.add('AlertAnimation');
            Alert.style.display = 'block';
            Alert.addEventListener('animationend', function() {
                Alert.classList.remove('AlertAnimation');
            }, { once: true });
        } else {
            Circle1.style.display = 'none';
            Alert.style.display = 'none';
        }
    }
}

function playPause() {
    const song = document.getElementById('song');
    const ctrlIcon = document.getElementById('ctrlIcon');

    if (!song || song.readyState < 1) {
        alert('El elemento de audio no se encontró.');
        return;
    }

    if (!ctrlIcon) {
        alert('El icono de control no se encontró.');
        return;
    }

    if (ctrlIcon.classList.contains('fa-cloud-bolt')) {
        song.pause();
        ctrlIcon.classList.remove('fa-cloud-bolt');
        ctrlIcon.classList.add('fa-cloud');
    } else {
        song.play();
        ctrlIcon.classList.remove('fa-cloud');
        ctrlIcon.classList.add('fa-cloud-bolt');
    }
}

function loadSongs(selectedSong) {
    console.log('loadSongs function called with:', selectedSong);

    const songImg = document.querySelector('.songImg');
    const Title = document.getElementById('Title');
    if (song && progress && songImg && Title) {
        let songTime = song.duration;
        console.log('Loading song:', selectedSong);
        Title.innerText = selectedSong;
        song.src = `audios/${selectedSong}.mp3`;
        console.log('Audio source set to:', song.src);

        // Esperar a que se cargue la metadata de la canción
        song.onloadedmetadata = function () {
            console.log('Audio metadata loaded:', song.duration);

            progress.max = songTime;
            setInterval(() => {
                progress.value = song.currentTime;
            }, 1000);

            // Actualizar la imagen según la duración de la canción
            const sizeMapping = {
                60: 'XS',
                120: 'S',
                240: 'M',
                480: 'L',
                Infinity: 'XL'
            };
            for (const [limit, size] of Object.entries(sizeMapping)) {
                if (songTime < limit) {
                    songImg.src = `images/${size}.png`;
                    break;
                }
            }

            // Actualizar el tamaño de la música
            const MusicsSizes = document.getElementById('MusicSize');
            if (MusicsSizes) {
                if (songTime < 60) {
                    MusicsSizes.innerHTML = 'Extra Small';
                } else if (songTime >= 60 && songTime < 120) {
                    MusicsSizes.innerHTML = 'Small';
                } else if (songTime >= 120 && songTime < 240) {
                    MusicsSizes.innerHTML = 'Medium';
                } else if (songTime >= 240 && songTime < 480) {
                    MusicsSizes.innerHTML = 'Large';
                } else if (songTime >= 480) {
                    MusicsSizes.innerHTML = 'Extra Large';
                } else {
                    MusicsSizes.innerHTML = 'Music Size Not Found';
                }
            }
        };

        song.onerror = function() {
            console.error('Error loading audio file:', song.src);
        };
    }
}

const musics = ['WetHands', 'Sweden', 'MiceOnVenus', 'AnotherSong']; // Ensure this list is correct

let songIndex = 0;
loadSongs(musics[songIndex]);
