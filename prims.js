import graph from "./graph.js";
import minheap from "./heap.js";


/* PRIMS ALGORITHM:
   Init: Add edges of a vertex to heap.
   While heap is not empty:
       Pop min weight edge off heap
       If edge connects to a node not in min-span-tree:
           Add node to min-span-tree
           Add edge to min-span-tree
           Add edges of newly connected node to heap*/

/* Purpose: Finds minimum spanning tree using prims algorithm.
   Inputs: Graph in form:
           {n1: {n1: w1,
                 n2: w2, ...},
            n2: {n1: w1,
                 n2: w2, ...}, ...}
            This is a table of nodes, each containing
            a table of nodes that connect via edges,
            each containing a weight of that edge,
            where n is a node id and w is a weight in range [0, 1).
   Returns: Graph representation of minimum spanning tree.*/
function prims(input_graph) {
    // Interface for edge representation within heap.
    function make_heap_obj(node1_id, node2_id, weight) {
        return [node1_id, node2_id, weight];
    }
    function get_n1_from_heap_obj(heap_obj) {
        return heap_obj[0];
    }
    function get_n2_from_heap_obj(heap_obj) {
        return heap_obj[1];
    }
    function get_wt_from_heap_obj(heap_obj) {
        return heap_obj[2];
    }

    let min_span_tree = new graph();
    let edges_minheap = new minheap();

    // Initialize spanning tree with first node
    let node_id = input_graph.get_first_node_id();
    min_span_tree.add_node(node_id);

    // Initialize edges_minheap with first node's edges
    input_graph.forEach_nbr_of_node(node_id, nbr_id => {
        let wt = input_graph.get_edge_weight(node_id, nbr_id);
        let edge = make_heap_obj(node_id, nbr_id, wt);
        edges_minheap.push(edge, wt);
    });

    // Prims
    while(!edges_minheap.is_empty()) {
        let edge = edges_minheap.pop();
        let n1 = get_n1_from_heap_obj(edge);  // In spanning tree
        let n2 = get_n2_from_heap_obj(edge);  // Not in spanning tree
        let wt = get_wt_from_heap_obj(edge);

        // Node already in spanning tree?
        if(!min_span_tree.has_node(n2)) {

            // Add to spanning tree
            min_span_tree.add_node(n2);
            min_span_tree.add_edge_undirected(n1, n2, wt);

            // Add edges to edges_minheap
            input_graph.forEach_nbr_of_node(n2, nbr_id => {
                let nbr_wt = input_graph.get_edge_weight(n2, nbr_id);
                let nbr_edge = make_heap_obj(n2, nbr_id, nbr_wt);
                edges_minheap.push(nbr_edge, nbr_wt);
            });
        }
    }

    return min_span_tree;
}


// TESTING
function test_prims() {
    // Expected
    let expected = new graph();
    expected.graph = {0: {1: .4},
                      1: {0: .4,
                          2: .4},
                      2: {1: .4,
                          3: .4,
                          4: .4},
                      3: {2: .4},
                      4: {2: .4}};

    // Produced
    let input_graph = new graph();
    input_graph.graph = {0: {1: .4,
                             2: .8,
                             3: .8,
                             4: .8},
                         1: {0: .4,
                             2: .4,
                             3: .8,
                             4: .8},
                         2: {0: .8,
                             1: .4,
                             3: .4,
                             4: .4},
                         3: {0: .8,
                             1: .8,
                             2: .4,
                             4: .8},
                         4: {0: .8,
                             1: .8,
                             2: .4,
                             3: .8}};
    let produced = prims(input_graph);

    // Output
    let name = "test_prims";
    let e_json = expected.get_json();
    let p_json = produced.get_json();
    let passed = e_json == p_json;
    console.log(name);
    console.log("Expected: ", e_json);
    console.log("Produced: ", p_json);
    passed ? console.log("SUCCESS") : console.error("FAILURE");
    console.log("\n");
}

test_prims();