(function() {
    var questions = [{
      question: "Dünyada en çok ziyaret edilen ülke hangisi? ",
      choices: [" A) Çin"," B) ABD", " C) Fransa"," D) Rusya"],
      correctAnswer: 2
    }, {
      question: "Atmosferdeki karbondioksitin ne kadarı doğal kaynaklı?",
      choices: [" A) Altıda biri"," B) Dörtte biri", " C) Üçte ikisi"," D) Üçte biri"],
      correctAnswer: 4
    }, {
      question: "Dünyada temiz suya ulaşamayan kaç kişi var?",
      choices: [" A) 300 milyon"," B) 700 milyon", " C) 900 milyon"," D) 1 milyardan fazla"],
      correctAnswer: 0
    }, {
      question: "Vişnu hangi dinin Tanrıçasıdır?",
      choices: [" A) Budizm"," B) Hinduizm", " C) Yahudilik"," D) Hıristiyanlık"],
      correctAnswer: 3
    }, {
      question: "Dünyanın en çok ziyaret edilen internet portalı hangisi?",
      choices: [" A) Yahoo"," B) MSN", " C) Excite"," D) Google"],
      correctAnswer: 4
    }];
    
    var questionCounter = 0; 
    var selections = []; 
    var quiz = $('#quiz'); 
    
    displayNext();
    
    $('#next').on('click', function (e) {
      e.preventDefault();
      
      if(quiz.is(':animated')) {        
        return false;
      }
      choose();
      
      if (isNaN(selections[questionCounter])) {
        alert('Soru boş geçilemez');
      } else {
        questionCounter++;
        displayNext();
      }
    });
    
    $('#prev').on('click', function (e) {
      e.preventDefault();
      
      if(quiz.is(':animated')) {
        return false;
      }
      choose();
      questionCounter--;
      displayNext();
    });
    
    $('#start').on('click', function (e) {
      e.preventDefault();
      
      if(quiz.is(':animated')) {
        return false;
      }
      questionCounter = 0;
      selections = [];
      displayNext();
      $('#start').hide();
    });
    
    $('.button').on('mouseenter', function () {
      $(this).addClass('active');
    });
    $('.button').on('mouseleave', function () {
      $(this).removeClass('active');
    });
    

    function createQuestionElement(index) {
      var qElement = $('<div>', {
        id: 'question'
      });
      
      var header = $('<h2>Soru ' + (index + 1) + ':</h2>');
      qElement.append(header);
      
      var question = $('<p>').append(questions[index].question);
      qElement.append(question);
      
      var radioButtons = createRadios(index);
      qElement.append(radioButtons);
      
      return qElement;
    }
    
    function createRadios(index) {
      var radioList = $('<ul>');
      var item;
      var input = '';
      for (var i = 0; i < questions[index].choices.length; i++) {
        item = $('<li>');
        input = '<input type="radio" name="answer" value=' + i + ' />';
        input += questions[index].choices[i];
        item.append(input);
        radioList.append(item);
      }
      return radioList;
    }
    
    function choose() {
      selections[questionCounter] = +$('input[name="answer"]:checked').val();
    }
    
    function displayNext() {
      quiz.fadeOut(function() {
        $('#question').remove();
        
        if(questionCounter < questions.length){
          var nextQuestion = createQuestionElement(questionCounter);
          quiz.append(nextQuestion).fadeIn();
          if (!(isNaN(selections[questionCounter]))) {
            $('input[value='+selections[questionCounter]+']').prop('checked', true);
          }
          
          if(questionCounter === 1){
            $('#prev').show();
          } else if(questionCounter === 0){
            
            $('#prev').hide();
            $('#next').show();
          }
        }else {
          var scoreElem = displayScore();
          quiz.append(scoreElem).fadeIn();
          $('#next').hide();
          $('#prev').hide();
          $('#start').show();
        }
      });
    }
    
    function displayScore() {
      var score = $('<p>',{id: 'question'});
      
      var numCorrect = 0;
      for (var i = 0; i < selections.length; i++) {
        if (selections[i] === questions[i].correctAnswer) {
          numCorrect++;
        }
      }
      
      score.append("Test Bitmiştir...");
      return score;
    }
  })();