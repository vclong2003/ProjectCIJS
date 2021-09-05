import { HallHeader } from './HallHeader.js'
import { HallBody } from './HallBody.js'
import { HallFooter } from './HallFooter.js'

class Hall {
    $container
    $header
    $body
    $footer

    constructor() {
        this.$container = document.createElement('div')
        this.$container.classList.add('hall-background')

        this.$header = new HallHeader()
        this.$body = new HallBody()
        this.$footer = new HallFooter()
    }

    render() {
        this.$container.appendChild(this.$header.render())
        this.$container.appendChild(this.$body.render())
        this.$container.appendChild(this.$footer.render())
        return this.$container
    }
}

export { Hall }