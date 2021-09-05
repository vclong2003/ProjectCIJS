class InputGroup {
    $container
    $input
    $errorMsg
    constructor(type, placeHolder) {
        this.$container = document.createElement('div');

        this.$input = document.createElement('input');
        this.$input.classList.add('inputGroup');
        this.$input.type = type
        this.$input.placeholder = placeHolder

        this.$errorMsg = document.createElement('div')
    }
    render() {
        this.$container.appendChild(this.$input)
        this.$container.appendChild(this.$errorMsg)
        return this.$container
    }

    getInputValue() {
        return this.$input.value
    }

    setError(error) {
        if (error) {
            this.$errorMsg.innerHTML = error
            this.$errorMsg.classList.add('error-msg')
        } else {
            this.$errorMsg.innerHTML = ''
            this.$errorMsg.classList.remove('error-msg')

        }
    }

    onBlur(error) {
        if (error) {
            this.$errorMsg.innerHTML = error
            this.$errorMsg.classList.add('error-msg')
        } else {
            this.$errorMsg.innerHTML = ''
            this.$errorMsg.classList.remove('error-msg')

        }
    }

}

export { InputGroup }