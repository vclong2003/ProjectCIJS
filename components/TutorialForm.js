import { Rule } from './Rule.js';

class TutorialForm {
    $container
    $tutorialForm
    $rule
    $text

    constructor() {
        this.$container = document.createElement('div')
        this.$container.classList.add('tutorial-container')

        this.$tutorialForm = document.createElement('ul')
        this.$tutorialForm.classList.add('tutorial-form')

        this.$rule = new Rule('1', 'Một vòng đấu sẽ có 4 người tham gia.')
        this.$rule2 = new Rule('2', 'Sau khi tất cả sẵn sàng thì sau 5s hệ thống sẽ đưa ra câu hỏi.')
        this.$rule3 = new Rule('3', 'Người chơi nhập câu trả lời và ấn trả lời.')
        this.$rule4 = new Rule('4', 'Sau khi hết thời gian đếm ngược hệ thống đưa ra câu trả lời.')
        this.$rule5 = new Rule('5', 'Sau 5s sau khi đưa ra câu trả lời thì hệ thống sẽ công bố thứ tự và điểm của từng người rồi cộng điểm tích lũy của mỗi người.')
        this.$rule6 = new Rule('6', 'Sau 10 câu hỏi sẽ đưa ra thứ tự và điểm của người chơi.')


        this.$bgrBlack = document.createElement('div')
        this.$bgrBlack.classList.add('bgr-black')
        this.$bgrBlack.addEventListener('click', this.offTutorial)

    }

    offTutorial = () => {
        this.$container.style.display = 'none'
    }

    setVisible(visible) {
        if (visible) {

            this.$container.style.display = 'flex'
        } else {
            this.$container.style.display = 'none'
        }
    }

    render() {
        this.$tutorialForm.appendChild(this.$rule.render())
        this.$tutorialForm.appendChild(this.$rule2.render())
        this.$tutorialForm.appendChild(this.$rule3.render())
        this.$tutorialForm.appendChild(this.$rule4.render())
        this.$tutorialForm.appendChild(this.$rule5.render())
        this.$tutorialForm.appendChild(this.$rule6.render())
        this.$container.appendChild(this.$tutorialForm)
        this.$container.appendChild(this.$bgrBlack)
        return this.$container
    }



}

export { TutorialForm }