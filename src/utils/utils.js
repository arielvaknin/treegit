export function parseRowsLocation(dataIn){
    const rowSpacing = 100;
    const rows1 = Array(dataIn.nodes.length);
    let rows = []
  
    for (let i = 0; i< rows1.length; i++) {
      rows[i] = (i+1)*rowSpacing;
    }
  
    // console.log(`rows: ${rows}`);
    return rows
}

export function parseColLocation(dataIn){
    const colSpacing = 100;
    const cols1 = Array(dataIn.all_user_names.length + 1);
    let cols = []
  
    for (let i = 0; i< cols1.length; i++) {
      cols[i] = (i+5)*colSpacing;
    }
    // console.log(`cols: ${cols}`);
    return cols;
}

export function parseUsersToColumns(dataIn, cols) {
    let usersToColumns = {};
    dataIn.all_user_names = dataIn.all_user_names.concat(['Messages']);
    dataIn.all_user_names.forEach((key, i) => usersToColumns[key] = cols[i]);

    return usersToColumns;
}

export function parseArrows(dataIn, usersToColumns, rows) {
    let arrows = [];
    let i = 0;
    for (i ; i < dataIn.edges.length; i++) {
      
      const user_name_1 = dataIn.nodes.find( node => node.id === dataIn.edges[i][0] ).user_name;
      const user_name_2 = dataIn.nodes.find( node => node.id === dataIn.edges[i][1] ).user_name;

      arrows[i] = {};
      arrows[i].x1 = usersToColumns[user_name_1];
      arrows[i].y1 = rows[dataIn.edges[i][0]-1];
      arrows[i].x2 = usersToColumns[user_name_2];
      arrows[i].y2 = rows[dataIn.edges[i][1]-1];
    }

    return arrows;
}