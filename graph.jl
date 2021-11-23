import Cairo,Fontconfig
using Graphs
using GraphPlot, Compose
g = SimpleGraph(3);
add_edge!(g, 1, 2);
add_edge!(g, 2, 3);
draw(PNG("./simple.png", 16cm, 16cm), gplot(g))
