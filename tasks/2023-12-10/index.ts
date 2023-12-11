export type Graph = Record<string, string[]>;
type GraphVisited = { [node: string]: boolean };

export function findCyclesBetweenLocations(graph: Graph): string[][] {
    validate(graph);

    const cycles: string[][] = [];
    const visited: GraphVisited = {};

    for (let startNode in graph) {
        dfs(graph, startNode, startNode, visited, [], cycles);
    }

    return cycles;
}

function dfs(graph: Graph, node: string, startNode: string, visited: GraphVisited, path: string[], cycles: string[][]) {
    if (visited[node]) {
        if (node === startNode) {
            cycles.push([...path, node]);
        }
        return;
    }

    visited[node] = true;
    path.push(node);
    graph[node].forEach(neigbor => dfs(graph, neigbor, startNode, { ...visited }, [ ...path ], cycles));

    delete graph[node];
}

function validate(graph: Graph) {
    for (const node in graph) {
        graph[node].forEach(neighbor => {
            const nodeInGraph = neighbor in graph;
            if (!nodeInGraph) {
                throw new Error('Invalid graph: missing nodes');
            }
        })
    }
}