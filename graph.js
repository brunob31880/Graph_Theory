
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
        this.EdgeListCost = new Map();
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
    addEdge(v, w, cost) {
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
        this.EdgeListCost.set(this.cptEdge, cost);
        this.cptEdge++;
    }
    //
    //
    //
    getCostOfEdge(edge) {
        let index = -1;
        for (const [vert, value] of this.EdgeList) {
            if (value === edge) index = vert;
        }
        return this.EdgeListCost.get(index);
    }
    //
    // Prints the vertex and adjacency list
    //
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
        if (debug) console.log("Distance à " + u);
        if (debug) console.log(dist_u);
        let ecc = 0;
        for (const [key, value] of dist_u) {
            if (value > ecc) ecc = value;
        }
        return ecc;
    }

    //
    //
    //
    radius_diameter(debug) {
        let rad = 1000;
        let diam = 0;

        for (const [vert, value] of this.VertList) {

            let ecc = this.bfs(vert, false);
            if (debug) console.log("ECC node " + vert + "=" + ecc);
            if (ecc < rad) rad = ecc;
            if (ecc > diam) diam = ecc;
        }
        console.log("Radius=" + rad);
        console.log("Diametre=" + diam);
    }
    //
    //
    //
    getIdOfVertex(vertex) {
        for (const [vert, value] of this.VertList) {
            if (vertext === vert) return value;
        }
        return -1;
    }
    //
    //
    //
    getVertexOfId(id) {
        for (const [vert, value] of this.VertList) {
            if (value === id) return vert;
        }
        return "";
    }
    //
    //
    //
    bellman_ford(u, debug) {
        let pi_tab = new Array(this.noOfVertices);
        let pred_tab = new Array(this.noOfVertices);
        // Initialisation
        for (let j = 0; j < this.noOfVertices; j++) {
            pi_tab[j] = (j === this.VertList.get(u)) ? 0 : 1000;
            pred_tab[j]=-1;
        }
        if (debug) console.log(pi_tab[0]);
        let k = 0;
        let stable;
        do {
            if (debug) console.log("Iteration=" + k);
            k = k + 1;
            stable = true;
            for (let x = 0; x < this.noOfVertices; x++) {
                for (let y = 0; y < this.noOfVertices; y++) {
                    // si le path appartient à U :G(S,U)
                    let ch = this.getVertexOfId(x) + "-" + this.getVertexOfId(y);
                    let tab = Array.from(this.EdgeList.values());
                    if (tab.indexOf(ch) !== -1) {
                        if (debug) console.log("Test avec " + ch);
                        if (pi_tab[y] > (pi_tab[x] + this.getCostOfEdge(ch))) {
                            if (debug) console.log("Modification pi_tab pour " + this.getVertexOfId(y)+" a "+(pi_tab[x] + this.getCostOfEdge(ch)));
                            pi_tab[y] = (pi_tab[x] + this.getCostOfEdge(ch));
                            pred_tab[y] = x;
                            stable = false;
                            if (debug) console.log("pred_tab["+this.getVertexOfId(y)+"]="+this.getVertexOfId(x));
                        }           
                    }
                }
            }
          
            if (debug) console.log("Tableau PI="+pi_tab+" Stable="+stable+" Condition="+((!stable) && (k <= this.noOfVertices - 1)));
        } while ((!stable) && (k <= this.noOfVertices - 1))
        if (k > this.noOfVertices - 1) {
            console.log("Negativ circuit no solution");
        }
        console.log("Tableau PI="+pi_tab);
        console.log("Pred_tab="+pred_tab);
    }
    //
    //
    //
    testOnEdgesWithM(){
        
    }
    //
    //
    //
    dijkstras(u,debug){
        let M=new Array(this.noOfVertices);
        let pred_tab = new Array(this.noOfVertices);
       
        let pi_tab = new Array(this.noOfVertices);
        //Initialisation
        for (let j = 0; j < this.noOfVertices; j++) {
            pi_tab[j] = (j === this.VertList.get(u)) ? 0 : 1000;
            pred_tab[j]=-1;
        }
        M.push(u);
        do {

        }while(testOnEdgesWithM())
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
    //
    //
    //
    getLenEdge() {
        return Array.from(this.EdgeList.keys()).length;
    }
}

//
//
//
Graph.prototype.toString = function graphToString() {

    let ch = "";
    let i = 0;
    for (const [cpt, value] of this.EdgeList) {
        ch += value + "(" + this.EdgeListCost.get(cpt) + ")" + ((i === this.getLenEdge() - 1) ? "" : ",");
        i++;
    }
    return "G([" + Array.from(this.VertList.keys()) + "],[" + ch + "])";
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
g.addEdge('A', 'B', 1);
g.addEdge('A', 'D', 1);
g.addEdge('A', 'E', 1);
g.addEdge('B', 'C', 1);
g.addEdge('D', 'E', 1);
g.addEdge('E', 'F', 1);
g.addEdge('E', 'C', 1);
g.addEdge('C', 'F', 1);

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
g2.addEdge('1', '7', 1);
g2.addEdge('6', '7', 1);
g2.addEdge('7', '7', 1);
g2.addEdge('2', '3', 1);
g2.addEdge('7', '3', 1);
g2.addEdge('7', '8', 1);
g2.addEdge('8', '3', 1);
g2.addEdge('3', '4', 1);
g2.addEdge('5', '10', 1);
g2.addEdge('9', '10', 1);
let ecc = g2.bfs("1", false);
console.log(g2.toString());
console.log("ECC node 1=" + ecc);


var g3 = new Graph(8, false);
var vertices3 = ['1', '2', '3', '4', '5', '6', '7', '8'];
// adding vertices
for (var i = 0; i < vertices3.length; i++) {
    g3.addVertex(vertices3[i]);
}

// adding edges
g3.addEdge('1', '5', 1);
g3.addEdge('5', '2', 1);
g3.addEdge('2', '6', 1);
g3.addEdge('2', '7', 1);
g3.addEdge('2', '3', 1);
g3.addEdge('7', '3', 1);
g3.addEdge('3', '4', 1);
g3.addEdge('7', '8', 1);
console.log(g3.toString());
g3.radius_diameter(false);

console.log("=========== SESSION 4 ===========");
var g4 = new Graph(9, true);
var vertices4 = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
// adding vertices
for (var i = 0; i < vertices4.length; i++) {
    g4.addVertex(vertices4[i]);
}
g4.addEdge('1', '2', 3);
g4.addEdge('1', '4', 2);
g4.addEdge('1', '6', 4);
g4.addEdge('2', '3', 7);
g4.addEdge('3', '9', 5);
g4.addEdge('4', '5', 4);
g4.addEdge('4', '7', 5);
g4.addEdge('5', '3', 3);
g4.addEdge('5', '9', 9);
g4.addEdge('6', '7', 3);
g4.addEdge('7', '8', 3);
g4.addEdge('8', '5', -6);
g4.addEdge('8', '9', 5);
console.log(g4.toString());
g4.bellman_ford("1", false);