checkAnswersBeforeSubmit();

function checkAnswersBeforeSubmit() {
  const submitAnswersButton = document.querySelector('.test .button_submit');
  const testForm = document.querySelector('.test form');

  submitAnswersButton.addEventListener('click', (e) => {
    const questionsNumber = 12;

    const questionsNodeLists = [];
    const unansweredQuestions = [...Array(questionsNumber).keys()].map(x => ++x);

    const testFormElements = testForm.elements;
    for (let i = 1; i <= questionsNumber; i++) {
      questionsNodeLists.push({
        element: testFormElements.namedItem(`question${i}`),
        questionNumber: i,
      });
    }

    for (nodeList of questionsNodeLists) {
      if (nodeList.element.value) {
        const questionIndex = unansweredQuestions.indexOf(nodeList.questionNumber);
        unansweredQuestions.splice(questionIndex, 1);
      }
    }

    if (unansweredQuestions.length !== 0) {
      e.preventDefault();

      const noticeMessage = document.querySelector('.test__notice');
      noticeMessage.style.display = 'block';

      const noticeMessageLink = document.querySelector('.test__notice-link');
      noticeMessageLink.href = `#question-block-${unansweredQuestions[0]}`;

      for (unansweredQuestion of unansweredQuestions) {
        let questionBlock = document.getElementById(`question-block-${unansweredQuestion}`);
        let questionTexts = questionBlock.querySelectorAll('span');
        for (questionText of questionTexts) {
          questionText.classList.add('test__question-text_unanswered');
        }

        let unansweredQuestionInputs = questionBlock.querySelectorAll('input[type="radio"]');
        for (input of unansweredQuestionInputs) {
          input.addEventListener('input', () => {
            for (questionText of questionTexts) {
              questionText.classList.remove('test__question-text_unanswered');
            }
          }, { once: true });
        }
      }
    }
  })
};
