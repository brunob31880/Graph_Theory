
//
// Créer un Tableau 2D
//
function Creer_Tableau(largeur, longueur) {
    var monTableau = new Array(largeur);
    for (var i = 0; i < 10; i++) {
        monTableau[i] = new Array(longueur);
    }
    for (var i = 0; i < largeur; i++) {
        for (var j = 0; j < longueur; j++) {
            monTableau[i][j] = 0;
        }
    }

    return monTableau;

}
// create a graph class
class Graph {
    // defining vertex array and
    // adjacent list
    constructor(noOfVertices, directed) {
        this.noOfVertices = noOfVertices;
        this.AdjList = new Map();
        this.VertList = new Map();
        this.EdgeList = new Map();
        this.AdjMatrix = Creer_Tableau(noOfVertices, noOfVertices);
        this.cptVertex = 0;
        this.directed = directed;
        this.cptEdge = 0;
    }

    // functions to be implemented

    // add vertex to the graph
    addVertex(v) {
        // initialize the adjacent list with a
        // null array
        this.AdjList.set(v, []);
        this.VertList.set(v, this.cptVertex);
        this.cptVertex++;
    }
    // add edge to the graph
    addEdge(v, w) {
        // get the list for vertex v and put the
        // vertex w denoting edge between v and w
        this.AdjList.get(v).push(w);
        //
        //  
        // console.log(this.VertList.get(v) + " " + this.VertList.get(w));
        // Since graph is undirected,
        // add an edge from w to v also
        this.AdjList.get(w).push(v);
        this.AdjMatrix[this.VertList.get(v)][this.VertList.get(w)] = 1;
        this.AdjMatrix[this.VertList.get(w)][this.VertList.get(v)] = 1;
        this.EdgeList.set(this.cptEdge, v + "-" + w);
        this.cptEdge++;
    }
    // Prints the vertex and adjacency list
    adj_List() {
        // get all the vertices
        var get_keys = this.AdjList.keys();

        // iterate over the vertices
        for (var i of get_keys) {
            // great the corresponding adjacency list
            // for the vertex
            var get_values = this.AdjList.get(i);
            var conc = "";

            // iterate over the adjacency list
            // concatenate the values into a string
            for (var j of get_values)
                conc += j + " ";

            // print the vertex and its adjacency list
            console.log(i + " -> " + conc);
        }
    }
    //
    //
    //
    bfs(u, debug) {
        let k = 0;
        // 1000 corresponds au maximum
        let dist_u = new Map();
        for (const [key, value] of this.VertList) {
            // console.log(u+" "+key);
            dist_u.set(key, (u === key) ? 0 : 1000);
        }
        let stable;
        do {
            stable = true;
            if (debug) console.log("Distance " + k);
            for (const [key, value] of this.VertList) {
                if (dist_u.get(key) === k) {
                    if (debug) process.stdout.write(key + ",");
                    var get_List = this.AdjList.get(key);
                    if (debug) console.log(get_List);
                    for (var i in get_List) {
                        let vert = get_List[i];
                        // unvisited
                        if (dist_u.get(vert) === 1000) {
                            if (debug) console.log("Voisin " + get_List[i]);
                            stable = false;
                            dist_u.set(vert, k + 1);
                        }
                    }
                }
                //else console.log(key+" "+dist_u.get(key));
            }
            k = k + 1;
        } while (!stable)
        if (debug) console.log("Distance à "+u);
        if (debug) console.log(dist_u);
        let ecc=0;
        for (const [key, value] of dist_u) {
            if (value>ecc) ecc=value;
        }
        return ecc;
    }

    //
    //
    //
    radius_diameter(debug){
        let rad=1000;
        let diam=0;
       
        for (const [vert, value] of this.VertList) {
        
            let ecc=this.bfs(vert,false);
            if (debug) console.log("ECC node "+vert+"="+ecc);
            if (ecc<rad) rad=ecc;
            if (ecc>diam) diam=ecc;
        }
        console.log("Radius="+rad);
        console.log("Diametre="+diam);
    }
    // dfs(v)
    // Main DFS method
    dfs(startingNode) {
        var visited = {};
        this.DFSUtil(startingNode, visited);
    }

    // Recursive function which process and explore
    // all the adjacent vertex of the vertex with which it is called
    DFSUtil(vert, visited) {
        visited[vert] = true;
        console.log(vert);

        var get_neighbours = this.AdjList.get(vert);

        for (var i in get_neighbours) {
            var get_elem = get_neighbours[i];
            if (!visited[get_elem])
                this.DFSUtil(get_elem, visited);
        }
    }

    //
    // Matrice d'adjacence 
    //
    adj_Matrix() {
        for (var i = 0; i < this.noOfVertices; i++) {
            for (var j = 0; j < this.noOfVertices; j++) {
                var ch1 = (j === 0) ? "|" : "";
                var ch2 = (j === this.noOfVertices - 1) ? "|" : "";
                process.stdout.write(ch1 + this.AdjMatrix[i][j] + ch2);
                if (j === this.noOfVertices - 1) console.log();
            }
        }
    }
    //
    // Matrice d'incidence
    //
    inc_Matrix() {
        var inc_matrix = Creer_Tableau(this.noOfVertices, this.cptEdge);

        for (var i = 0; i < this.cptEdge; i++) {
            var init = this.EdgeList.get(i).charAt(0);
            var end = this.EdgeList.get(i).charAt(2);
            inc_matrix[this.VertList.get(init)][i] = 1;
            inc_matrix[this.VertList.get(end)][i] = this.directed ? -1 : 1;
        }
        for (var i = 0; i < this.noOfVertices; i++) {
            for (var j = 0; j < this.cptEdge; j++) {
                var ch1 = (j === 0) ? "|" : "";
                var ch2 = (j === this.cptEdge - 1) ? "|" : "";
                process.stdout.write(ch1 + inc_matrix[i][j] + ch2);
                if (j === this.cptEdge - 1) console.log();
            }
        }
    }
    
}
Graph.prototype.toString = function graphToString() {
    return "G(["+Array.from( this.VertList.keys() )+"],["+Array.from( this.EdgeList.values() )+"])";
  };
console.log("=========== SESSION 1 ===========");
// Using the above implemented graph class
var g = new Graph(6, true);
var vertices = ['A', 'B', 'C', 'D', 'E', 'F'];

// adding vertices
for (var i = 0; i < vertices.length; i++) {
    g.addVertex(vertices[i]);
}

// adding edges
g.addEdge('A', 'B');
g.addEdge('A', 'D');
g.addEdge('A', 'E');
g.addEdge('B', 'C');
g.addEdge('D', 'E');
g.addEdge('E', 'F');
g.addEdge('E', 'C');
g.addEdge('C', 'F');

// prints all vertex and
// its adjacency list
// A -> B D E
// B -> A C
// C -> B E F
// D -> A E
// E -> A D F C
// F -> E C
console.log("Adj_List");
g.adj_List();
console.log("Adj Matrix");
g.adj_Matrix();
console.log("Inc Matrix");
g.inc_Matrix();

console.log("=========== SESSION 3 ===========");

var g2 = new Graph(10, false);
var vertices2 = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
// adding vertices
for (var i = 0; i < vertices2.length; i++) {
    g2.addVertex(vertices2[i]);
}
// adding edges
g2.addEdge('1', '7');
g2.addEdge('6', '7');
g2.addEdge('7', '7');
g2.addEdge('2', '3');
g2.addEdge('7', '3');
g2.addEdge('7', '8');
g2.addEdge('8', '3');
g2.addEdge('3', '4');
g2.addEdge('5', '10');
g2.addEdge('9', '10');
let ecc=g2.bfs("1", false);
console.log(g2.toString());
console.log("ECC node 1="+ecc);


var g3 = new Graph(8, false);
var vertices3 = ['1', '2', '3', '4', '5', '6', '7', '8'];
// adding vertices
for (var i = 0; i < vertices3.length; i++) {
    g3.addVertex(vertices3[i]);
}

// adding edges
g3.addEdge('1', '5');
g3.addEdge('5', '2');
g3.addEdge('2', '6');
g3.addEdge('2', '7');
g3.addEdge('2', '3');
g3.addEdge('7', '3');
g3.addEdge('3', '4');
g3.addEdge('7', '8');
console.log(g3.toString());
g3.radius_diameter(false);
