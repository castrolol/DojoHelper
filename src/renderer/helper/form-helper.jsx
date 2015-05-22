class FormHelper {

	constructor(){
		this.regexNotNumbers = /[^0-9]/gi; 
		
	}

	ensureIsNumber(val, min = 0, max = null){

		if(typeof val == "string"){
			val = val.replace(this.regexNotNumbers, "");
			val = +val || 0;
		}

		if(min != null){
			val = Math.max(val, min);
		}

		if(max != null){
			val = Math.min(val, max);
		}

		return val;

	}

	handleKeysInNumber(element, fieldName){

		return function(ev){

			var number = this.ensureIsNumber(element.state[fieldName], null);
			var changesInState = {};
			changesInState[fieldName] = number;

			if(ev.keyCode == 38){
				changesInState[fieldName] += 1;
				ev.preventDefault();
				element.setState(changesInState);
				return;
			}

			if(ev.keyCode == 40){
				changesInState[fieldName] -= 1;
				ev.preventDefault();
				element.setState(changesInState);
				return;
			}
			
		}.bind(this);

	}

}

export default new FormHelper();