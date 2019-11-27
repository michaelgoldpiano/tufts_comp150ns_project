<!DOCTYPE html>
<meta charset="utf-8">

<script>

/* Purpose: Creates a complete random graph with
            random edge weights in range [0, 1).
            Made in object format, as seen in other graphs online.
   Inputs: Number of nodes to create
   Outputs: Complete random graph in form
			{nodes: [{id: n1},
					 {id: n2}, ...],
			 edges: [{source: n1, target: n2, value: w1},
			 		 {source: n1, target: n3, value: w2}, ...]}
			where n is a node and w is a weight in range [0, 1)]
*/
function get_random_graph(total_nodes) {
	// Create node list
	let nodes = function(num_nodes) {
		nodes_array = [];
		for(let i = 0; i < num_nodes; i++) {
			nodes_array.push(
				{id: i}
			);
		}
		return nodes_array;
	}(total_nodes);

	// Create edge list
	let edges = function(nodes) {
		edges_array = [];
		for(let i = 0; i < nodes.length; i++) {
			for(let j = i + 1; j < nodes.length; j++) {
				weight = Math.random() // Range [0, 1)
				edges_array.push(
					{source: i,
					 target: j,
					 value: weight}
				);
			}
		}
		return edges_array;
	}(nodes);

	// Compile into graph
	let graph = {
		nodes: nodes,
		edges: edges
	};
	return graph;
}


// TESTING
let random_graph = get_random_graph(total_nodes=3);
random_graph["edges"].forEach(e => e["value"] = 0);
let actual_graph = {nodes: [{id: 0},
						    {id: 1},
						    {id: 2}],
					edges: [{source: 0, target: 1, value: 0},
							{source: 0, target: 2, value: 0},
							{source: 1, target: 2, value: 0}]};
console.log("random_graph: ", random_graph)
console.log("actual_graph: ", actual_graph)
console.log("Graphs same? ", JSON.stringify(random_graph) == JSON.stringify(actual_graph));

</script>