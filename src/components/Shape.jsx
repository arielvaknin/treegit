import * as React from 'react';
import Konva from 'konva';
import { Arrow, Line, Stage, Layer, Circle, Text } from 'react-konva';
import axios from 'axios';

import { parseRowsLocation, parseColLocation, parseUsersToColumns, parseArrows } from '../utils/utils';


// constants
// =========
const radius = 20;
// const API = '127.0.0.1:5000/';

// input from json
// ===============
const dataIn = {
  all_user_names: ['Ariel Vaknin', 'Michael Farjon'],
  nodes: [
    { id: 1, user_name: 'Ariel Vaknin', category: 'message 1' },
    { id: 2, user_name: 'Ariel Vaknin', category: 'message 2' },
    { id: 3, user_name: 'Michael Farjon', category: 'message 3' },
    { id: 4, user_name: 'Ariel Vaknin', category: 'message 4' }
  ],
  edges: [[1,2], [2,3], [3,4], [2,4]], 
};

export interface ShapeState {};

export class Shape extends React.Component {
  constructor(props, state) {
    super(props, state);
    this.state = {
      dataIn: dataIn
    }
  }
  componentDidMount() {
    console.log('component did mount')
    const url = '/file_info?filePath=F:/Users/elahav109995/Desktop/programming/hackathon/TreeGitTest/f1.txt';
    console.log(`url is: ${url}`)
    axios.get(url)
      .then(result => this.setState({
        dataIn: result.data
      }));
  }

  render() {
    console.log('fetching url...');
   
    const dataIn = this.state.dataIn;
    const rows = parseRowsLocation(dataIn);
    const cols = parseColLocation(dataIn);
    const usersToColumns = parseUsersToColumns(dataIn, cols);
    const arrows = parseArrows(dataIn, usersToColumns, rows);

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
                text={`${item.category}`}
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


