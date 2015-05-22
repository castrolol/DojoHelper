class ArrayHelper {

	constructor(){
		this.regexNotNumbers = /[^0-9]/gi; 
	}

	removeRandomly(array, exclude){
		debugger;
		var filteredArray = array.filter((item) => {
			return !this.contains(exclude, item);
		});

		var lastItem = filteredArray.length -1;
		var index = Math.round( Math.random() * lastItem );
		var originalIndex = array.indexOf(filteredArray[index]);
		return array.splice(originalIndex, 1);
	}

	contains(array, item){
		return ~array.indexOf(item);
	}
}

export default new ArrayHelper();