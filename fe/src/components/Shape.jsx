import * as React from 'react';
import Konva from 'konva';
import { Arrow, Line, Stage, Layer, Circle, Text } from 'react-konva';

// constants
// =========
const radius = 20;

// input from json
// ===============
const dataIn = {
  allUserNames: ['Ariel Vaknin', 'Michael Farjon'],
  nodes: [
    { id: 1, user_name: 'Ariel Vaknin', date: '19/3/2018', message: 'message 1' },
    { id: 2, user_name: 'Ariel Vaknin', date: '11/1/2019', message: 'message 2' },
    { id: 3, user_name: 'Michael Farjon', date: '8/2/2019', message: 'message 3' },
    { id: 4, user_name: 'Ariel Vaknin', date: '1/4/2019', message: 'message 4' }
  ],
  edges: [[1,2], [2,3], [3,4], [2,4]], 
};

// parse data
// ==========
// [rows, cols] = parseData(dataIn);
//   const firstRow = 100;
//   const rows = []

const rows = [100, 200, 300, 400];
const cols = [500, 600, 700];

var usersToColumns = {};
dataIn.allUserNames = dataIn.allUserNames.concat(['Messages'])
dataIn.allUserNames.forEach((key, i) => usersToColumns[key] = cols[i]);

var arrows = [];
var i = 0
for (i ; i < dataIn.edges.length; i++) {
  
  var user_name_1 = dataIn.nodes.find( node => node.id === dataIn.edges[i][0] ).user_name;
  var user_name_2 = dataIn.nodes.find( node => node.id === dataIn.edges[i][1] ).user_name;

  arrows[i] = {};
  arrows[i].x1 = usersToColumns[user_name_1]
  arrows[i].y1 = rows[dataIn.edges[i][0]-1]
  arrows[i].x2 = usersToColumns[user_name_2]
  arrows[i].y2 = rows[dataIn.edges[i][1]-1]
}

export class Shape extends React.Component {
  render() {
      console.log(window.innerWidth);
      console.log(window.innerHeight);
    return (
      <Stage width={ window.innerWidth } height={ window.innerHeight }>
        <Layer>
          {dataIn.nodes.map((item, ind) => (
              <Circle
                key={item.id}
                x={usersToColumns[item.user_name]}
                y={rows[ind]}
                numPoints={5}
                Radius={radius}
                fill="#89b717"
                opacity={0.2}
                shadowColor="black"
                shadowBlur={10}
                shadowOpacity={0.6}
              />
          ))}
        </Layer>
        <Layer>
          {dataIn.nodes.map((item, ind) => (
              <Text 
                text={item.id}
                x={usersToColumns[item.user_name] - 5}
                y={rows[ind] - 10}
                fontSize='20'
              />
          ))}
        </Layer>
        <Layer>{ 
          Object.keys(usersToColumns).map( (user, ind) => (
            // console.log(`user: ${user}, location: ${usersToColumns[user]}`);
            <Text 
              text={user}
              x={usersToColumns[user] - 50}
              y={0}
              wrap="char"
              align="center"
              width={70}
              fontSize='20'
            /> 
          ))}
        </Layer>
        <Layer>
          {dataIn.nodes.map((item, ind) => (
              <Text 
                text={`${item.message} ${item.date}`}
                x={usersToColumns['Messages']}
                y={rows[ind] - 10}
                fontSize='20'
              />
          ))}
        </Layer>
        <Layer>
          {arrows.map( item => (
              <Arrow 
                points={ [item.x1, item.y1 + radius, item.x2, item.y2 - radius] }
                stroke='red'
                tension={1}
                pointerLength={10}
                pointerWidth={12}
            />
          ))}
        </Layer>
      </Stage>
    );
  }
}


