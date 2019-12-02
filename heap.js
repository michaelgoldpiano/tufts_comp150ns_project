
// [_,
//  1,
//  2, 3,
//  4, 5, 6, 7,
//  ...]

export default class minheap {
	constructor() {
		/* [{obj:o1, val:v1},
	        {obj:o2, val:v2}, ...]
	        where o is some object in JSON format,
	        and v is the value to sort that object by*/
		this.heap = [null];
	}

	/* Purpose: Tells whether heap is empty.
	   Inputs: None
	   Returns: Boolean of if heap is empty.*/
	is_empty() {
		return this.heap.length <= 1;
	}

	/* Purpose: Adds object-value pair to heap.
	   Inputs: Object to sort into minheap, value to sort that object by.
	   Returns: None*/
	push(object, value) {
		let heap_obj = {obj:object, val:value};
		this.heap.push(heap_obj);
		this.float(this.heap.length-1)
	}

	/* Purpose: Removes and returns the minimum-value object from heap.
	   Inputs: None
	   Returns: Object with minimum value.*/
	pop() {

		// Heap empty
		if(this.heap.length <= 1) {
			console.error("Error: Cannot remove from empty heap.");
			return null;
		}

		// One element left
		else if(this.heap.length == 2) {
			return this.heap.pop()["obj"];
		}

		// Move last element to top, and sink that element
		else {
			let to_return = this.heap[1]["obj"];
			this.heap[1] = this.heap.pop();
			this.sink(1);
			return to_return;
		}
	}

	/* Purpose: Recursively floats an element into heap-sorted place.
	   Inputs: index of item to float.
	   Returns: None*/
	float(curr_index) {
		let parent_index = Math.floor(curr_index / 2);

		// Can't float higher
		if(parent_index < 1) {
			return;
		}

		let curr = this.heap[curr_index];
		let parent = this.heap[parent_index];

		// Switch and float if curr < parent
		if(curr["val"] < parent["val"]) {
			this.heap[curr_index] = parent;
			this.heap[parent_index] = curr;
			this.float(parent_index);
		}
	}

	/* Purpose: Recursively sinks an element into heap-sorted place.
	   Inputs: Index of item to sink.
	   Returns: None*/
	sink(curr_index) {
		let left_index = curr_index * 2;
		let right_index = curr_index * 2 + 1;
		let curr = this.heap[curr_index];
		let left = left_index < this.heap.length ? this.heap[left_index] : null;
		let right = right_index < this.heap.length ? this.heap[right_index] : null;
		let to_swap = null;

		// Case: No children exist
		if(left == null) {
			return;
		}

		// Case: Only left child exists
		else if(right == null) {
			// Left less than current?
			if(curr["val"] > left["val"]) {
				this.heap[curr_index] = left;
				this.heap[left_index] = curr;
				this.sink(left_index);
			}
		}

		// Case: Both children exist
		else {
			// Children less than current?
			if(curr["val"] > Math.min(left["val"], right["val"])) {
				// Which child is least?
				if(left["val"] < right["val"]) {
					this.heap[curr_index] = left;
					this.heap[left_index] = curr;
					this.sink(left_index);
				} else {
					this.heap[curr_index] = right;
					this.heap[right_index] = curr;
					this.sink(right_index);
				}
			}
		}
	}

	get_json() {
		let heap_copy = Array.from(this.heap);
		heap_copy.splice(0, 1);
		return JSON.stringify(heap_copy);
	}
}


// TESTING
function test_minheap() {
	let my_minheap = new minheap();
	let input_list = [9, 10, 7, 8, 5, 6, 3, 4, 1, 2];
	input_list.forEach((elem) => {
		my_minheap.push(elem, elem);
	});

	// Expected
	let expected = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, null];

	// Produced
	let produced = [];
	for(let i = 0; i < 11; i++) {
		let elem = my_minheap.pop();
		produced.push(elem);
	}

	// Output
	let name = "test_minheap";
	let e_json = JSON.stringify(expected);
	let p_json = JSON.stringify(produced);
	let passed = e_json == p_json;
	console.log(name);
	console.log("Expected: ", e_json);
	console.log("Produced: ", p_json);
	passed ? console.log("SUCCESS") : console.error("FAILURE");
	console.log("\n");
}

test_minheap();