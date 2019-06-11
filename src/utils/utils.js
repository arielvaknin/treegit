export function parseRowsLocation(dataIn){
    return rangeArray(100, 100, dataIn.nodes.length)
}

export function parseColLocation(dataIn){
    return rangeArray(100, 110, dataIn.all_user_names.length + 1)
}

function rangeArray(start, spacing, size) {
    let arr = []
  
    for (let i = 0; i < size; i++) {
      arr[i] = (i+1) * spacing;
    }
    console.log(`arr: ${arr}`)
    return arr;

}

export function parseUsersToColumns(dataIn, cols) {
    let data = {...dataIn};
    let usersToColumns = {};
    data.all_user_names = data.all_user_names.concat(['Messages']);
    data.all_user_names.forEach((key, i) => usersToColumns[key] = cols[i]);

    return usersToColumns;
}

export function parseArrows(dataIn, usersToColumns, rows) {
    let arrows = [];

    for (let i=0; i < dataIn.edges.length; i++) {
      
      const user_name_1 = dataIn.nodes.find( node => node.id === dataIn.edges[i][0] ).user_name;
      const user_name_2 = dataIn.nodes.find( node => node.id === dataIn.edges[i][1] ).user_name;

      arrows.push({
          x1: usersToColumns[user_name_1],
          y1: rows[dataIn.edges[i][0]-1],
          x2: usersToColumns[user_name_2],
          y2: rows[dataIn.edges[i][1]-1],
      });
    }

    return arrows;
}