import { PlayNow } from './playNow.js';
import { PlayWithFriends } from './playWithFriends.js';
import { TypePlay } from './TypePlay.js';
import { setScreen } from '../setScreen.js';

class HallBody {
    $container

    $typePlaySolo
    $playNow

    $typePlayWithFr
    $playWithFr

    playNow;
    playWithFriends;
    constructor() {
        this.$container = document.createElement('div')
        this.$container.classList.add('hall-body')

        this.playNow = new PlayNow();
        this.$typePlaySolo = document.createElement('div')
        this.$typePlaySolo.classList.add('typePlaySolo')
        this.$typePlaySolo.addEventListener('click', () => {setScreen(this.playNow)});
        this.$playNow = new TypePlay('<i class="fa fa-user"></i>', 'Play now')

        this.playWithFriends = new PlayWithFriends();
        this.$typePlayWithFr = document.createElement('div')
        this.$typePlayWithFr.classList.add('typePlayWithFr')
        this.$typePlayWithFr.addEventListener('click', () => {setScreen(this.playWithFriends)});
        this.$playWithFr = new TypePlay('<i class="fa fa-users"></i>', 'Play with friends')

    }
    render() {
        this.$typePlaySolo.appendChild(this.$playNow.render());
        this.$typePlayWithFr.appendChild(this.$playWithFr.render());
        this.$container.appendChild(this.$typePlaySolo);
        this.$container.appendChild(this.$typePlayWithFr);
        return this.$container
    }
}

export { HallBody }