
function proccessFacts(facts, schema) {
	let singleList = [];
	let manyList = [];
	let alreadySingle = {};

	schema.map((item) => {
		if (item[2] === 'many')
			return manyList.push(item[0]);

		alreadySingle[item[0]] = [];
		return singleList.push(item[0]);
	});

	let normalized = facts.filter((fact, i) => {
		if (fact[3]) {
			if (singleList.includes(fact[1])) {
				if (!alreadySingle[fact[1]].includes(fact[0])) {
					alreadySingle[fact[1]].push(fact[0]);
					return fact;
				}
			}

			if (manyList.includes(fact[1])) {
				return fact;
			} 
		}
	});

	return normalized;
};


function init() {
    var facts = [
	  	['gabriel', 'endereço', 'av rio branco, 109', true],
	  	['joão', 'endereço', 'rua alice, 10', true],
	  	['joão', 'endereço', 'rua bob, 88', true],
	  	['joão', 'telefone', '234-5678', true],
	  	['joão', 'telefone', '91234-5555', true],
	  	['joão', 'telefone', '234-5678', false],
	  	['gabriel', 'telefone', '98888-1111', true],
	  	['gabriel', 'telefone', '56789-1010', true],
	];

	var schema = [
	    ['endereço', 'cardinality', 'one'],
	    ['telefone', 'cardinality', 'many']
	];

	console.log(proccessFacts(facts, schema));
}

init();