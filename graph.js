


/* Graph in form:
   {n1: {n1: w1,
         n2: w2, ...},
    n2: {n1: w1,
         n2: w2, ...}, ...}
   This is a table of nodes, each containing
   a table of nodes that connect via edges,
   each containing a weight of that edge,
   where n is a node id and w is a weight in range [0, 1).*/
export default class graph {
	constructor() {
		this.graph = {};
	}

	has_node(node_id) {
		return this.graph.hasOwnProperty(node_id);
	}

	add_node(node_id) {
		// Add node if not in graph
		if(!this.has_node(node_id)) {
			this.graph[node_id] = {};
		} else {
			console.error("Error: Cannot add node that already exists.");
		}
	}

	add_edge_undirected(node1_id, node2_id, weight) {
		// Node not in graph
		if(!this.has_node(node1_id) || !this.has_node(node2_id)) {
			console.error("Error: Cannot add edge to nonexistant node.");
		}

		// Edge already exists
		else if(this.graph[node1_id].hasOwnProperty(node2_id) ||
		        this.graph[node2_id].hasOwnProperty(node1_id)) {
			console.error("Error: Cannot add edge that already exists.");
		}

		// Add edge
		else {
			this.graph[node1_id][node2_id] = weight;
			this.graph[node2_id][node1_id] = weight;
		}
	}

	forEach_node(fn) {
		let node_ids = Object.keys(this.graph);
		node_ids.forEach(node_id => {
			fn(node_id);
		});
	}

	forEach_nbr_of_node(node_id, fn) {
		let nbr_ids = Object.keys(this.graph[node_id]);
		nbr_ids.forEach(nbr_id => {
			fn(nbr_id);
		});
	}

	get_first_node_id() {
		return Object.keys(this.graph)[0];
	}

	get_edge_weight(node1_id, node2_id) {
		return this.graph[node1_id][node2_id];
	}

	get_json() {
		return JSON.stringify(this.graph);
	}
}


// TESTING
function test_graph() {
	// Expected
	let expected = new graph();
	expected.graph = {0: {1: .5},
					  1: {0: .5,
					  	  2: .6},
					  2: {1: .6}};

	// Produced
	let produced = new graph();
	produced.add_node(0);
	produced.add_node(1);
	produced.add_node(2);
	produced.add_node(2);  // Error: Duplicate node
	produced.add_edge_undirected(0, 1, .5);
	produced.add_edge_undirected(1, 2, .6);
	produced.add_edge_undirected(0, 3, .7);  // Error: Nonexistant node's edge
	produced.add_edge_undirected(0, 1, .4);  // Error: Duplicate edge

	// Output
	let name = "test_graph";
	let e_json = expected.get_json();
	let p_json = produced.get_json();
	let passed = e_json == p_json;
	console.log(name);
	console.log("Expected: ", e_json);
	console.log("Produced: ", p_json);
	passed ? console.log("SUCCESS") : console.error("FAILURE");
	console.log("\n");
}

function test_graph_forEach() {
	// Expected
	let expected = new graph();
	expected.graph = {0: {1: .8},
					  1: {0: .8,
					  	  2: .8},
					  2: {1: .8}};

	// Produced
	let produced = new graph();
	produced.add_node(0);
	produced.add_node(1);
	produced.add_node(2);
	produced.add_edge_undirected(0, 1, .5);
	produced.add_edge_undirected(1, 2, .6);
	produced.forEach_node(node_id => {
		produced.forEach_nbr_of_node(node_id, nbr_id => {
			produced.graph[node_id][nbr_id] = .8;
		});
	});

	// Output
	let name = "test_graph_forEach";
	let e_json = expected.get_json();
	let p_json = produced.get_json();
	let passed = e_json == p_json;
	console.log(name);
	console.log("Expected: ", e_json);
	console.log("Produced: ", p_json);
	passed ? console.log("SUCCESS") : console.error("FAILURE");
	console.log("\n");
}

test_graph();
test_graph_forEach();