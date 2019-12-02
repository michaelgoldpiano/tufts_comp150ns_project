import graph from "./graph.js";

/* Purpose: Creates a complete random graph with
            random edge weights in range [0, 1).
            Made in object format, as seen in other graphs online.
   Inputs: Number of nodes to create.
   Outputs: Complete random graph.*/
function get_complete_random_graph(num_nodes) {
    let complete_graph = new graph();

    // Add nodes
    for(let i = 0; i < num_nodes; i++) {
        // complete_graph[i] = {};
        complete_graph.add_node(i);
    }

    // Add complete edges
    for(let i = 0; i < num_nodes; i++) {
        for(let j = i + 1; j < num_nodes; j++) {
            let weight = Math.random();
            complete_graph.add_edge_undirected(i, j, weight);
        }
    }

    return complete_graph;
}


// TESTING
function test_get_random_graph() {
    // Expected
    let expected = new graph();
    expected.graph = {0: {1: 0,
                          2: 0},
                      1: {0: 0,
                          2: 0},
                      2: {0: 0,
                          1: 0}};

    // Produced
    let produced = get_complete_random_graph(3);
    produced.forEach_node(node_id => {
        produced.forEach_nbr_of_node(node_id, nbr_id => {
            produced.graph[node_id][nbr_id] = 0;
        });
    });

    // Output
    let name = "test_get_random_graph";
    let e_json = expected.get_json();
    let p_json = produced.get_json();
    let passed = e_json == p_json;
    console.log(name);
    console.log("Expected: ", e_json);
    console.log("Produced: ", p_json);
    passed ? console.log("SUCCESS") : console.error("FAILURE");
    console.log("\n");
}

test_get_random_graph();