let player, isPlaying = false;

console.log('script.js loaded');

// Declaração da função de API do YouTube
function onYouTubeIframeAPIReady() {
    console.log('YouTube API is ready');
    player = new YT.Player('player', {
        height: '315',
        width: '560',
        videoId: 'StarrySky', // ID do vídeo
        events: { 'onReady': () => console.log('Player is ready') }
    });
}

// Função de alternância de play/pause
function togglePlay() {
    const playButton = document.getElementById('play').querySelector('i');
    if (!player) return console.error('Player not initialized');
    
    isPlaying = !isPlaying;
    playButton.classList.toggle('fa-play', !isPlaying);
    playButton.classList.toggle('fa-pause', isPlaying);

    player.getPlayerState() === YT.PlayerState.PLAYING ? player.pauseVideo() : player.playVideo();
}

// Exibir o alerta de volume
function showVolumeAlert(volume) {
    const volumeDisplay = document.getElementById('volume-display');
    volumeDisplay.innerText = `Volume: ${volume}%`;
    volumeDisplay.style.display = 'block';
    setTimeout(() => volumeDisplay.style.display = 'none', 2000);
}

// Aumentar volume
function increaseVolume() {
    const currentVolume = player.getVolume();
    if (currentVolume <= 90) updateVolume(currentVolume + 10);
}

// Diminuir volume
function decreaseVolume() {
    const currentVolume = player.getVolume();
    if (currentVolume >= 10) updateVolume(currentVolume - 10);
}

// Atualizar volume e exibir alerta
function updateVolume(volume) {
    player.setVolume(volume);
    showVolumeAlert(volume);
}

// Alternar fullscreen
function toggleFullscreen() {
    const iframe = document.getElementById('player');
    const requestFullscreen = iframe.requestFullscreen || iframe.mozRequestFullScreen || iframe.webkitRequestFullscreen || iframe.msRequestFullscreen;
    if (requestFullscreen) requestFullscreen.call(iframe);
}
