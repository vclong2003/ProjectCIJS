class Rule {
    $container
    $ruleNumber
    $numb
    $ruleContent
    constructor(numb, content) {
        this.$container = document.createElement('li')
        this.$container.classList.add('rule')

        this.$ruleNumber = document.createElement('div')
        this.$ruleNumber.classList.add('rule-number')
        this.$numb = document.createElement('div')
        this.$numb.innerHTML = numb
        this.$ruleNumber.appendChild(this.$numb)

        this.$ruleContent = document.createElement('div')
        this.$ruleContent.classList.add('rule-content')
        this.$ruleContent.innerHTML = content
    }
    render() {
        this.$container.appendChild(this.$ruleNumber)
        this.$ruleNumber.appendChild(this.$ruleContent)

        this.$container.appendChild(this.$ruleContent)
        return this.$container
    }
}

export { Rule }