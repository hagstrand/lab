/*
	stored in database per user
	each array matches the corresponding test array
	what about adding, removing and reorganizing questions in the test?
	do we need to keep a sequence for each question?
	NO.  If we reorganize a test, we will do a onetime fix of the answer table in the database.
*/
var answers = {
	temperament: [0,0,0,0],
	motivation: [],
	vak: [],
};
