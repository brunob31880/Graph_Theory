
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
        // document.write(this.VertList.get(v) + " " + this.VertList.get(w));
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
    // 
    //
    add_Matrix_Line(tLigne) {

        document.write("<mtr>");
        let tab = Array.from(tLigne);
        for (let i = 0; i < tab.length; i++) {
            document.write("<mtd><mn>" + tab[i] + "</mn></mtd>");
        }
        document.write("</mtr>");
    }
    //
    // Affiche en math ML une matrice de n lignes p colonnes
    //
    draw_Matrix(name, mat, n) {

        document.write("<math xmlns = \"http://www.w3.org/1998/Math/MathML\">");
        document.write("<mrow>");
        document.write("<mi>" + name + "</mi>");
        document.write("<mo>=</mo>");
        document.write("<mo>[</mo>");
        document.write("<mtable>");
        for (let i = 0; i < n; i++) {
            this.add_Matrix_Line(mat[i]);
        }
        document.write("</mtable>");
        document.write("<mo>]</mo>");
        document.write("</mrow>");
        document.write("</math>");
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
            document.write(i + " -> " + conc);
            document.write("<br/>");
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
            // document.write(u+" "+key);
            dist_u.set(key, (u === key) ? 0 : 1000);
        }
        let stable;
        do {
            stable = true;
            if (debug) document.write("Distance " + k);
            for (const [key, value] of this.VertList) {
                if (dist_u.get(key) === k) {
                    if (debug) process.stdout.write(key + ",");
                    var get_List = this.AdjList.get(key);
                    if (debug) document.write(get_List);
                    for (var i in get_List) {
                        let vert = get_List[i];
                        // unvisited
                        if (dist_u.get(vert) === 1000) {
                            if (debug) document.write("Voisin " + get_List[i]);
                            stable = false;
                            dist_u.set(vert, k + 1);
                        }
                    }
                }
                //else document.write(key+" "+dist_u.get(key));
            }
            k = k + 1;
        } while (!stable)
        if (debug) document.write("Distance à " + u);
        if (debug) document.write(dist_u);
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
            if (debug) document.write("ECC node " + vert + "=" + ecc);
            if (ecc < rad) rad = ecc;
            if (ecc > diam) diam = ecc;
        }
        document.write("Radius=" + rad);
        document.write("<br/>");
        document.write("Diametre=" + diam);
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
    getIdOfEdge(edge) {
        for (const [id, value] of this.EdgeList) {
            if (edge === value) return id;
        }
        console.log("can't find "+edge);
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
            pred_tab[j] = -1;
        }
        if (debug) document.write(pi_tab[0]);
        let k = 0;
        let stable;
        do {
            if (debug) document.write("Iteration=" + k);
            k = k + 1;
            stable = true;
            for (let x = 0; x < this.noOfVertices; x++) {
                for (let y = 0; y < this.noOfVertices; y++) {
                    // si le path appartient à U :G(S,U)
                    let ch = this.getVertexOfId(x) + "-" + this.getVertexOfId(y);
                    let tab = Array.from(this.EdgeList.values());
                    if (tab.indexOf(ch) !== -1) {
                        if (debug) document.write("Test avec " + ch);
                        if (pi_tab[y] > (pi_tab[x] + this.getCostOfEdge(ch))) {
                            if (debug) document.write("Modification pi_tab pour " + this.getVertexOfId(y) + " a " + (pi_tab[x] + this.getCostOfEdge(ch)));
                            pi_tab[y] = (pi_tab[x] + this.getCostOfEdge(ch));
                            pred_tab[y] = x;
                            stable = false;
                            if (debug) document.write("pred_tab[" + this.getVertexOfId(y) + "]=" + this.getVertexOfId(x));
                        }
                    }
                }
            }

            if (debug) document.write("Tableau PI=" + pi_tab + " Stable=" + stable + " Condition=" + ((!stable) && (k <= this.noOfVertices - 1)));
        } while ((!stable) && (k <= this.noOfVertices - 1))
        if (k > this.noOfVertices - 1) {
            document.write("Negativ circuit no solution");
        }
        document.write("Tableau PI=" + pi_tab);
        document.write("<br/>");
        document.write("Pred_tab=" + pred_tab);
    }
    //
    //
    //
    edgesWithM(M, debug) {
        let ret = [];
        if (debug) document.write("Searching with M=" + M);
        for (const [key, value] of this.EdgeList) {

            var init = value.charAt(0);
            var end = value.charAt(2);
            if ((M.indexOf(init) !== -1) && (M.indexOf(end) == -1)) {
                if (debug) document.write("Find good edge Value=" + value);
                ret.push(init + "-" + end);
            }
        }
        return ret;
    }
    //
    //
    //
    testOnEdgesWithM(M, debug) {
        return (this.edgesWithM(M, debug).length === 0 ? false : true);
    }
    //
    //
    //
    searchVertexMin(pi_tab, M, debug) {
        let pi = 1000;
        let tabedges = this.edgesWithM(M, debug);
        if (debug) document.write("TabEdges=" + tabedges);
        let utilde;
        for (i in tabedges) {
            let edge = tabedges[i];
            let cost = this.getCostOfEdge(edge);
            let iverte = edge.charAt(0);
            let index_ivert = this.VertList.get(iverte);
            let piu = pi_tab[index_ivert];
            let sum = piu + cost;
            if (debug) document.write("Sum=" + sum + " pi=" + pi);
            if (sum < pi) {
                pi = sum;
                utilde = edge;
            }
        }
        let ret = [];
        ret.push(utilde);
        ret.push(pi);
        if (debug) document.write("UTILDE=" + utilde)
        return ret;
    }
    //
    //
    //
    dijkstra(u, debug) {
        let M = [];
        let pred_tab = new Array(this.noOfVertices);

        let pi_tab = new Array(this.noOfVertices);
        //Initialisation
        for (let j = 0; j < this.noOfVertices; j++) {
            pi_tab[j] = (j === this.VertList.get(u)) ? 0 : 1000;
            pred_tab[j] = -1;
        }
        M.push(u);
        do {
            let ret = this.searchVertexMin(pi_tab, M, debug);
            let utilde = ret[0];
            let x = utilde.charAt(2);
            pi_tab[this.VertList.get(x)] = ret[1];
            pred_tab[this.VertList.get(x)] = this.VertList.get(utilde.charAt(0));
            if (debug) document.write("Adding " + x + " to M");
            M.push(x);
            if (debug) document.write(M);
        } while (this.testOnEdgesWithM(M, debug))
        document.write("Tableau PI=" + pi_tab);
        document.write("<br/>");
        document.write("Pred_tab=" + pred_tab);
    }
    //
    // retourne 1 si un edge est dans la liste -1 s'il existe en inverse et 0 sinon
    //
    getSignOfEdge(edgeIN) {
        let tab=Array.from(this.EdgeList.values());
       
        for (let i = 0; i < tab.length; i++) {
            let edge = tab[i];
            if (edgeIN === edge) return 1;
            else {
                let I = edgeIN.charAt(0);
                let T = edgeIN.charAt(2);
                let invEdgeIN = T + "-" + I;
                if (invEdgeIN === edge) return -1;
            }
        }
        return 0;
    }
    //
    // trouve le minimum de flow dans une change augmentante
    //
    minInChain(chain, flow) {
        if (chain.length === 0) return 1000;
        let E = 1000;
        let cost;
        for (let i = 0; i < chain.length; i++) {
            let edge = chain[i];
            let ind = this.getIdOfEdge(edge);
          //  document.write(ind + " " + flow.get(ind) + "/" + this.getCostOfEdge(edge));
          //  document.write("<br/>");
            cost = this.getCostOfEdge(edge) - flow.get(ind);
            if (cost < E) E = cost;
        }
        return E;
    }
    //
    //
    //
    fillChainWith(visi) {

        let chain = [];
        let lastItem;
        if (visi.has("T")) lastItem = "T";
        else {
            let arr = visi.keys();
            let tabKeys = Array.from(arr);
            lastItem = tabKeys[tabKeys.length - 1];
        }

        console.log("Last=" + lastItem);
        chain.push(visi.get(lastItem) + "-" + lastItem);
        let I = visi.get(lastItem);
        let cpt = 0;
        let stop = false;
        do {
            //   console.log("Adding to Chain " + I + " " + visi.get(I));
            if (visi.get(I) && I) {
                chain.push(visi.get(I) + "-" + I);
                I = visi.get(I);
            }
            else stop = true;
            cpt++;
        } while ((I !== "S") && (!stop))
        return chain.reverse();
    }
    //
    //
    //
    computeEpsilonFor(chain, flow) {
        let EPLUS = [];
        let EMOINS = [];
        for (let i = 0; i < chain.length; i++) {
            let edge = chain[i];
            let sign = this.getSignOfEdge(edge);
            if (sign === 1) EPLUS.push(edge);
            else if (sign === -1) EMOINS.push(edge);
        }
        let minPLUS = this.minInChain(EPLUS, flow);
        let minMOINS = this.minInChain(EMOINS, flow);
        let tabRET = [];
        tabRET.push(EPLUS);
        tabRET.push(EMOINS)
        if (minPLUS < minMOINS) tabRET.push(minPLUS);
        else tabRET.push(minMOINS);
        return tabRET;
    }
    //
    // Modifie le flow avec le tableau epsilon calculé plus haut
    //
    modifyFlowWithEpsilon(flow, tabEpsilon) {
        // pour ceux dans le "bon sens"
        for (let i = 0; i < tabEpsilon[0].length; i++) {
            // trouve la clef dans les edge du edge en cours de traitement
            let id = this.getIdOfEdge(tabEpsilon[0][i]);
            let actual = flow.get(id);
         //   console.log("Setting (Positive) " + id + " to " + (parseInt(actual) + parseInt(tabEpsilon[2])));
            flow.set(id, (parseInt(actual) + parseInt(tabEpsilon[2])));
        }
        // pour ceux dans le "mauvais sens"
        for (let i = 0; i < tabEpsilon[1].length; i++) {
            // trouve la clef dans les edge du edge en cours de traitement
            let I = tabEpsilon[1][i].charAt(0);
            let T = tabEpsilon[1][i].charAt(2);
            let id = this.getIdOfEdge(T + "-" + I);
            let actual = flow.get(id);
         //   console.log("Setting (Negative) " + id + " to " + (parseInt(actual) - parseInt(tabEpsilon[2])));
            flow.set(id, (parseInt(actual) - parseInt(tabEpsilon[2])));
        }
    }
    isNumber(value) {
        return typeof value === 'number' && isFinite(value);
    }
    //
    // agorithme pour trouver une chaine augmentante
    //
    augmented_chain(flowEdge) {
        let visited = new Map();
        let showv = [];
        visited.set("S", "*");
        let stable;
        let cpt = 0;
        do {
            stable = 0;
            let find = false;
            for (const [key, value] of this.EdgeList) {

                if ((visited.has(value.charAt(0))) && (!visited.has(value.charAt(2)))) {
                    if (flowEdge.get(key) < this.EdgeListCost.get(key)) {
                        if (showv.indexOf(value.charAt(0))===-1) showv.push(value.charAt(0));
                        document.write("Visiting direct " + value.charAt(0));
                            document.write("</br>");
                        visited.set(value.charAt(2), value.charAt(0));
                        find = true;
                        stable = 1;
                    }
                }
            }
            if (!find) {
                for (const [key, value] of this.EdgeList) {
                    if ((visited.has(value.charAt(2))) && (!visited.has(value.charAt(0)))) {
                        if (flowEdge.get(key) > 0) {
                            if (showv.indexOf(value.charAt(0))===-1) showv.push(value.charAt(0));
                            document.write("Visiting inv " + value.charAt(0));
                            document.write("</br>");
                            visited.set(value.charAt(0), value.charAt(2));
                            stable = 1;
                        }
                    }
                }
            }

            cpt = cpt + 1;

        } while (stable !== 0);
        document.write("<h3>Visited</h3>");
        for (let j=0;j< showv.length;j++) {
            document.write(showv[j]);
            document.write("<br/>");
        }
        document.write("<br/>");
        return this.fillChainWith(visited);
    }

    //
    //
    //
    hasTInside(tab) {
        for (let i = 0; i < tab.length; i++) {
            if (tab[i].indexOf("T") !== -1) return 1;
        }
        return 0;
    }
    //
    // Affiche le flow
    //
    showFlow(flow) {
        document.write("<h3>FLOW</h3>");
        let flow_total = 0;
        for (const [key, value] of flow) {
            document.write(key + "=> flow=(" + value + ") edge=[" + this.EdgeList.get(key) + "] cost=(" + this.EdgeListCost.get(key) + ")");
            if (this.EdgeList.get(key).charAt(2) === "T") flow_total += parseInt(flow.get(key));
            document.write("<br/>");
        }
        document.write("TOTAL FLOW=" + flow_total);
    }
    //
    // Algorithme de ford fulkerson
    //
    ford_fulkerson() {
        let flowEdge = new Map();
        let filled;
        let cpt = 0;
        for (const [key, value] of this.EdgeList) {
            //console.log("Setting "+key+" at 0");
            flowEdge.set(key, 0);
        }
        document.write("<h2> Initialisation </h2>");
        this.showFlow(flowEdge);

        do {
            cpt++;
            //   console.log("CPT="+cpt);
            document.write("<h2> Traitment n°" + cpt + " </h2>");
            filled = this.augmented_chain(flowEdge);
            document.write("Augmented Chain " + filled);
            document.write("<br/>");
            if ((this.hasTInside(filled) === 1)) {
                let tab = this.computeEpsilonFor(filled, flowEdge);
                document.write("Direct=" + tab[0] + " Indirect=" + tab[1] + " Mini=" + tab[2]);
                document.write("<br/>");
                this.modifyFlowWithEpsilon(flowEdge, tab);
                this.showFlow(flowEdge);
            }
        } while ((this.hasTInside(filled) === 1))

    }
    //
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
        document.write(vert);

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
        /*  for (var i = 0; i < this.noOfVertices; i++) {
              for (var j = 0; j < this.noOfVertices; j++) {
                  var ch1 = (j === 0) ? "|" : "";
                  var ch2 = (j === this.noOfVertices - 1) ? "|" : "";
                  if (debug) console.log(ch1 + this.AdjMatrix[i][j] + ch2);              
                  if (j === this.noOfVertices - 1) document.write();
              }
          }
          */
        this.draw_Matrix("Adj", this.AdjMatrix, this.noOfVertices);
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
        /*
        for (var i = 0; i < this.noOfVertices; i++) {
            for (var j = 0; j < this.cptEdge; j++) {
                var ch1 = (j === 0) ? "|" : "";
                var ch2 = (j === this.cptEdge - 1) ? "|" : "";
                document.write(ch1 + inc_matrix[i][j] + ch2);
                if (j === this.cptEdge - 1) document.write();
            }
        }
        */
        this.draw_Matrix("Inc", inc_matrix, this.noOfVertices);
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
document.write("<h1>SESSION 1</h1>");
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
document.write("<h1>Adjency List</h1>");
g.adj_List();
document.write("<h1>Adjency Matrix</h1>");
g.adj_Matrix();
document.write("<h1>Incidence Matrix</h1>");
g.inc_Matrix();

document.write("<h1>SESSION 3</h1>");

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
document.write(g2.toString());
document.write("<br/>");
document.write("ECC node 1=" + ecc + "");
document.write("<br/>");

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
document.write(g3.toString());
document.write("<br/>");
g3.radius_diameter(false);

document.write("<h1>SESSION 4</h1>");
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
document.write(g4.toString());
document.write("<h1>Algorithme de Bellman Ford</h1>");
g4.bellman_ford("1", false);
//
//
var g5 = new Graph(8, true);
var vertices5 = ['s', '1', '2', '3', '4', '5', '6', 't'];
// adding vertices
for (var i = 0; i < vertices5.length; i++) {
    g5.addVertex(vertices5[i]);
}
g5.addEdge('s', '3', 2);
g5.addEdge('1', 's', 1);
g5.addEdge('1', '2', 7);
g5.addEdge('2', '4', 2);
g5.addEdge('3', '1', 4);
g5.addEdge('3', '2', 6);
g5.addEdge('3', '4', 9);
g5.addEdge('4', '6', 3);
g5.addEdge('4', 't', 6);
g5.addEdge('5', '3', 4);
g5.addEdge('6', '5', 2);
g5.addEdge('6', 't', 1);
g5.addEdge('t', '2', 5);
document.write(g5.toString());
document.write("<h1>Algorithme de Djikstra</h1>");
g5.dijkstra("s", false);

document.write("<h1>Exercices 1 SESSION 4</h1>");

var g7 = new Graph(8, true);
var vertices7 = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
// adding vertices
for (var i = 0; i < vertices7.length; i++) {
    g7.addVertex(vertices7[i]);
}
g7.addEdge('A', 'B', 3);
g7.addEdge('B', 'A', 3);

g7.addEdge('C', 'B', 3);
g7.addEdge('B', 'C', 3);

g7.addEdge('A', 'C', 7);
g7.addEdge('C', 'A', 7);

g7.addEdge('B', 'E', 11);
g7.addEdge('E', 'B', 11);

g7.addEdge('C', 'E', 3);
g7.addEdge('E', 'C', 3);

g7.addEdge('A', 'D', 11);
g7.addEdge('D', 'A', 11);

g7.addEdge('C', 'D', 4);
g7.addEdge('D', 'C', 4);

g7.addEdge('B', 'D', 7);
g7.addEdge('D', 'B', 7);

g7.addEdge('E', 'D', 9);
g7.addEdge('D', 'E', 9);

g7.addEdge('E', 'G', 10);
g7.addEdge('G', 'E', 10);

g7.addEdge('D', 'G', 2);
g7.addEdge('G', 'D', 2);

g7.addEdge('E', 'F', 8);
g7.addEdge('F', 'E', 8);

g7.addEdge('F', 'G', 4);
g7.addEdge('G', 'F', 4);

g7.addEdge('F', 'H', 7);
g7.addEdge('H', 'F', 7);

g7.addEdge('H', 'G', 12);
g7.addEdge('G', 'H', 12);

document.write(g7.toString());
document.write("<h1>Algorithme de Djikstra</h1>");
g7.dijkstra("A", false);
document.write("<h1>Algorithme de Bellman Ford</h1>");
g7.bellman_ford("A", false);
document.write("<h1>Exercices 3 SESSION 4</h1>");
var g6 = new Graph(6, true);
var vertices6 = ['a', 'b', 'c', 'd', 'e', 'f'];
// adding vertices
for (var i = 0; i < vertices6.length; i++) {
    g6.addVertex(vertices6[i]);
}
g6.addEdge('a', 'b', 4);
g6.addEdge('b', 'd', -2);
g6.addEdge('d', 'f', 3);
g6.addEdge('e', 'f', 1);
g6.addEdge('e', 'c', 2);
g6.addEdge('b', 'e', 1);
g6.addEdge('c', 'b', 1);
g6.addEdge('a', 'c', 1);

document.write(g6.toString());
document.write("<h1>Algorithme de Bellman Ford</h1>");
g6.bellman_ford("a", false);
document.write("<h1>SESSION 5</h1>");
var g8 = new Graph(6, true);
var vertices8 = ['S', '2', '3', '5', '6', 'T'];
// adding vertices
for (var i = 0; i < vertices8.length; i++) {
    g8.addVertex(vertices8[i]);
}
g8.addEdge('S', '2', 4);
g8.addEdge('S', '5', 2);
g8.addEdge('S', '6', 7);
g8.addEdge('S', '3', 4);

g8.addEdge('2', '3', 3);

g8.addEdge('3', 'T', 8);

g8.addEdge('5', 'T', 11);
g8.addEdge('5', '3', 6);

g8.addEdge('6', '5', 4);
document.write("<h1>Algorithme de Ford fulkerson</h1>");
document.write(g8.toString());
document.write("<br/>");

g8.ford_fulkerson();

document.write("<h1>Exercice 2 SESSION 5</h1>");
var g9 = new Graph(8, true);
var vertices9 = ['S', '1', '2', '3', '4', '5', '6', 'T'];
// adding vertices
for (var i = 0; i < vertices9.length; i++) {
    g9.addVertex(vertices9[i]);
}
g9.addEdge('S', '1', 2);
g9.addEdge('S', '2', 5);
g9.addEdge('S', '3', 5);

g9.addEdge('1', '5', 3);
g9.addEdge('1', '4', 1);

g9.addEdge('2', '5', 2);
g9.addEdge('2', '4', 2);
g9.addEdge('2', '6', 4);

g9.addEdge('3', '4', 2);
g9.addEdge('3', '6', 2);

g9.addEdge('4', '5', 2);
g9.addEdge('4', '6', 1);

g9.addEdge('5', 'T', 5);

g9.addEdge('6', 'T', 7);

document.write("<h1>Algorithme de Ford fulkerson</h1>");
document.write(g9.toString());
document.write("<br/>");

g9.ford_fulkerson();