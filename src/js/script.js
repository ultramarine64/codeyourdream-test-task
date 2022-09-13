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

    for (questionsNodeList of questionsNodeLists) {
      if (questionsNodeList.element.value) {
        const questionIndex = unansweredQuestions.indexOf(questionsNodeList.questionNumber);
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
        let questionText = questionBlock.querySelector('span');
        questionText.classList.add('test__question-text_unanswered');
      }
    }
  })
};
