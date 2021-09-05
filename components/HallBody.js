import { TypePlay } from './TypePlay.js'

class HallBody {
    $container

    $typePlaySolo
    $playNow

    $typePlayWithFr
    $playWithFr
    constructor() {
        this.$container = document.createElement('div')
        this.$container.classList.add('hall-body')

        this.$typePlaySolo = document.createElement('div')
        this.$typePlaySolo.classList.add('typePlaySolo')
        this.$playNow = new TypePlay('<i class="fa fa-user"></i>', 'Play now')

        this.$typePlayWithFr = document.createElement('div')
        this.$typePlayWithFr.classList.add('typePlayWithFr')
        this.$playWithFr = new TypePlay('<i class="fa fa-users"></i>', 'Play with friends')

    }
    render() {
        this.$typePlaySolo.appendChild(this.$playNow.render())
        this.$typePlayWithFr.appendChild(this.$playWithFr.render())
        this.$container.appendChild(this.$typePlaySolo)
        this.$container.appendChild(this.$typePlayWithFr)
        return this.$container
    }
}

export { HallBody }