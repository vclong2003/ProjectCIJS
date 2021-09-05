class HallFooter {
    $container

    $ranking

    $imgWheel

    $music
    $musicPlaying
    $musicPause
    isPlaying
    constructor() {

        this.$container = document.createElement('div')
        this.$container.classList.add('hall-footer')

        this.$ranking = document.createElement('div')
        this.$ranking.classList.add('ranking')

        this.$rankingImg = document.createElement('div')
        this.$rankingImg.classList.add('rankingImg')
        this.$rankingImg.innerHTML = '<img src="../assets/rank.png" alt=""> '

        this.$rankingTxt = document.createElement('span')
        this.$rankingTxt.innerHTML = 'Ranking'


        this.$imgWheel = document.createElement('div')
        this.$imgWheel.classList.add('imgWheel')
        this.$imgWheel.innerHTML = '<img src="../assets/spin.png" alt="">'


        this.$music = document.createElement('div');
        this.$music.classList.add('music')
        this.$music.addEventListener('click', this.handleMusic)

        this.$musicPlaying = document.createElement('div')
        this.$musicPlaying.classList.add('musicPlaying')
        this.$musicPlaying.innerHTML = '<i class="fa fa-volume-up "></i>'

        this.$musicPause = document.createElement('div')
        this.$musicPause.classList.add('musicPause')
        this.$musicPause.innerHTML = '<i class="fa fa-volume-off "></i>'

        this.isPlaying = false

    }

    handleMusic = () => {
        if (!this.isPlaying) {
            console.log('a');
            this.isPlaying = true
            audio.play()
            this.$music.classList.add('playing')

        } else {
            console.log('b');
            this.isPlaying = false
            audio.pause()
            this.$music.classList.remove('playing')

        }
    }


    render() {
        this.$container.appendChild(this.$imgWheel)

        this.$ranking.appendChild(this.$rankingImg)
        this.$ranking.appendChild(this.$rankingTxt)
        this.$container.appendChild(this.$ranking)

        this.$music.appendChild(this.$musicPlaying)
        this.$music.appendChild(this.$musicPause)
        this.$container.appendChild(this.$music)

        // this.$container.appendChild(this.$audio)

        return this.$container
    }
}

export { HallFooter }