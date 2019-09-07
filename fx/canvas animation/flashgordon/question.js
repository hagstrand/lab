
var list = {
	1: {q:"hello", a:'བཀྲ་ཤིས་བདེ་ལེགས།', t:'tashi delek' },
	2: {q:"how are you?", a:'ཁྱེད་རང་སྐུ་གཇུགས་བདེ་པོ་ཡིན་པས།', t:'kayrang kusu debo yimbay?' },
	3: {q:"fine", a:'ང་བདེ་པོ་ཡིན།', t:'nga debo yin' },
	4: {q:"What's your name?", a:'ཁྱེད་རང་གི་མཚན་ལ་ག་རེ་ཞུ་གི་ཡོད།', t:'kayrang gi minglâ karay ray?' },
	5: {q:"good morning", a:'སྔ་དྲོ་བདེ་ལེགས།', t:'nga-to delek' },
	6: {q:"thank you", a:'ཐུགས་རྗེ་ཆེ་།', t:'tujay chay' },
	7: {q:"you're welcome", a:'ཞུ་དགོས་ཡག་ཡོད་ཡོད་མ་རེད།', t:'shu-goyak yaw maray' },
}

Question = function() {
	this.q = '';
	this.a = '';
	this.t = '';
	this.answers = [];
	
}

Question.prototype.answer = function(passed) {
	this.answers.push(passed);  // passed is true or false
	if (passed) {
		this.explode();
	}
	else {
		this.klunk();
	}
}


Game
	onetime setup
		draw answers
	every tick
		draw current question

	answer
		onclick
			check answer, true or false
	
	how to detect mouseclick on answer
	how to do objects on canvas
	
	