class TypePlay {
    $container
    $icon
    $txt

    constructor(icon, txt) {
        this.$container = document.createElement('div');
        this.$container.classList.add('typePlay')

        this.$icon = document.createElement('span')
        this.$icon.innerHTML = icon
        this.$icon.style.fontSize = '100px'

        this.$txt = document.createElement('div')
        this.$txt.innerHTML = txt
        this.$txt.style.fontSize = '32px'


    }
    render() {
        this.$container.appendChild(this.$icon)
        this.$container.appendChild(this.$txt)
        return this.$container
    }
}

export { TypePlay }