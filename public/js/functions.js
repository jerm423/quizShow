//Here we are setting the initial variables to store the info
//coming from the json file.
var quizName = "";
var quizQuestions = [];
var currentQuestionNumber = -1;
var correctAnswers = 0;
var userAnswers = [];

//Here we're loading the content of the json file in a synchronous call
$.ajax({
	url : 'quiz/quiz.json',
	dataType : 'json',
	type : 'get',
	cache : false,
	async : false,
	success : function(data){

		var questionsQuantity = 0;


		questionsQuantity = data.preguntas.length;
		
		for (i=0; i < questionsQuantity; i++){
			quizQuestions.push(data.preguntas[i]);
		}


	}
});


//$('.quizDescription').html('preguntas del quiz');
//$("Preguntas del quiz").appendTo("div#questionsContainer");



function generateAnswerFields (){

	console.log("Hola");

	$("<p id='answer1'> Hola putassss </p>").appendTo("div#questionsContainer");


};

//Function that loads 



function loadNewQuestion(){

	removeQuestionElements();

	currentQuestionNumber = currentQuestionNumber +1;

	var questionsNumber = quizQuestions.length;

	if (currentQuestionNumber < questionsNumber){

		

		currentQuestion = quizQuestions[currentQuestionNumber];


		var questionStatement = currentQuestion.enunciado;


		$("<span> " + questionStatement +  " </span>").appendTo("div#statementContainer");


		var optionsNumber = currentQuestion.opciones.length;
		var answersNumber = currentQuestion.correctas.length;

		if (answersNumber > 1){
			//This means that the question has multiple values

			for (var i = 0; i < optionsNumber; i++) {
				$('#questionsContainer').append("<input type='checkbox' name='question' value='"  + currentQuestion.opciones[i] +  "' > " + currentQuestion.opciones[i] + " </value> ");

			};

			
		}
		else{

			for (var i = 0; i < optionsNumber; i++) {
				$('#questionsContainer').append("<input type='radio' name='question' value='" + currentQuestion.opciones[i] +  "' > " + currentQuestion.opciones[i] + " </value> ");
			};
		}

		var hintsNumber = currentQuestion.pistas.length;

		for (var j = 0; j < hintsNumber; j++) {

			$('#hintsContainer').append("<div> " + currentQuestion.pistas[j] + " </div> ");
		}


		


	}

	else{
		generateScore(userAnswers);

	}

	


};



function removeQuestionElements(){

	$( "#statementContainer" ).empty();
	$( "#questionsContainer" ).empty();
	$( "#hintsContainer" ).empty();
};


function reloadQuestion(){

	removeQuestionElements();

	var questionsNumber = quizQuestions.length;

	currentQuestion = quizQuestions[currentQuestionNumber];


	var questionStatement = currentQuestion.enunciado;


	$("<span> " + questionStatement +  " </span>").appendTo("div#statementContainer");

	var optionsNumber = currentQuestion.opciones.length;
	var answersNumber = currentQuestion.correctas.length;

	if (answersNumber > 1){
		//This means that the question has multiple values
		for (var i = 0; i < optionsNumber; i++) {
			$('#questionsContainer').append("<input type='checkbox' name='question' value='"  + currentQuestion.opciones[i] +  "' > " + currentQuestion.opciones[i] + " </value> ");

		};

			
	}
	else{

		for (var i = 0; i < optionsNumber; i++) {
			$('#questionsContainer').append("<input type='radio' name='question' value='" + currentQuestion.opciones[i] +  "' > " + currentQuestion.opciones[i] + " </value> ");
		};
	}

	var hintsNumber = currentQuestion.pistas.length;

	for (var j = 0; j < hintsNumber; j++) {

		$('#hintsContainer').append("<div> " + currentQuestion.pistas[j] + " </div> ");
	}


}

function validateAnswer(){

	//I'll start the function assuming the user has answered correctly. If the func 
	//finds something wrong then it will set this to false.
	var answerCorrect = true;

	//Here we extract the current question in the test
	var currentQuestion = quizQuestions[currentQuestionNumber];

	//I'm storing the answers that the user has entered
	var userChooses = [];
	//I'm looping through the options and finiding the selected ones to push'em to the
	//answers array
	$('input[name="question"]:checked').each(function() {

        userChooses.push($(this).val());

    });

    //I'm taking the length of the answers array
	var userAnswersLength = userChooses.length;


	if(userAnswersLength < 1){
		alert("¡Por favor escoja una o varias respuestas para continuar!");
		reloadQuestion();
	}
	else{

		for (var i = 0; i < currentQuestion.correctas.length; i++) {



			

			if ($.inArray(currentQuestion.correctas[i], userChooses) !== -1)
			{
				//Means the answer is correct
			}		
			else{
				//Means the answer wasn't correct and terminates
				answerCorrect = false;
			}
		}//Ends the for loop

		userAnswers.push(answerCorrect);

		loadNewQuestion();

	}
	
	
};

function loadNextQuestion(){

	validateAnswer();
	
};

function generateScore(userAnswers){


	$( "#mainQuestions" ).empty();
	$( "#nextButtonContainer" ).empty();

	console.log(userAnswers);

	var correctAnswersCount = 0;
	for (var i = 0; i < userAnswers.length; i++){

		if(userAnswers[i] == true){
			correctAnswersCount = correctAnswersCount + 1;
		}
		else{
			//It does not count anything
		}

	}

	var score = ((correctAnswersCount/userAnswers.length)*100);

	$('#mainQuestions').append("<p > Nota: " + score + "</p>");


};

