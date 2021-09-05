class Item {
    $container

    constructor(text, icon) {
        this.$container = document.createElement('li');
        this.$container.classList.add('items')
        this.$container.innerHTML = `${text} ${icon}`


    }
    render() {
        return this.$container
    }
}

export { Item }