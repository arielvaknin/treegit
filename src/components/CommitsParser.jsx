import * as React from 'react';
import { Arrow, Stage, Layer, Circle, Text, Image } from 'react-konva';
import { parseRowsLocation, parseColLocation, parseUsersToColumns, parseArrows } from '../utils/utils';
import Konva from "konva";

const radius = 20;

export class CommitsParser extends React.Component {

  render() {   
    const dataIn = this.props.dataIn;
    const rows = parseRowsLocation(dataIn);
    const cols = parseColLocation(dataIn);
    const usersToColumns = parseUsersToColumns(dataIn, cols);
    const arrows = parseArrows(dataIn, usersToColumns, rows);

    return (
      <Stage width={ 3000 } height={ 3000 } fill='red'>
        {/* <Layer>
          <Image
            image={this.state.headImage}/>
        </Layer> */}
        {/* <Layer>
          <Image
            src='../images/head.png'
            width={100}
            height={100}
            x={100}
            y={100}

          />
        </Layer> */}
        
        <Layer>
          {/* commits */}
          {dataIn.nodes.map((item, ind) => (
              <Circle
              key={item.id}
              x={usersToColumns[item.user_name]}
              y={rows[ind]}
              numPoints={5}
              Radius={radius}
              fill="#4be3ac"
              stroke='black'
              strokeWidth={2}
              opacity={1}
              shadowColor="black"
              shadowBlur={5}
              shadowOpacity={0.6} 
              onClick={() => this.props.handleCommitclick(item.id, item.user_name, item.category)}
              />
          ))}
        </Layer>
        <Layer>
          {/* Commit ID */}
          {dataIn.nodes.map((item, ind) => (
              <Text 
                text={item.id}
                x={usersToColumns[item.user_name] - 5}
                y={rows[ind] - 10}
                fontSize='15'
              />
          ))}
        </Layer>
        <Layer>
          {/* Titles */}
          {Object.keys(usersToColumns).map( (user, ind) => (
            <Text 
              text={user}
              x={usersToColumns[user] - 50}
              y={0}
              wrap="char"
              align="center"
              width={70}
              fontSize='15'
            /> 
          ))}
        </Layer>
        <Layer>
          {/* Category */}
          {dataIn.nodes.map((item, ind) => (
              <Text 
                text={`${item.category}`}
                x={usersToColumns['Messages']}
                y={rows[ind] - 10}
                fontSize='15'
                width={150}
              />
          ))}
        </Layer>
        <Layer>
          {/* Arrows */}
          {arrows.map( item => (
              <Arrow 
              points={ [item.x1, item.y1 + radius, item.x2, item.y2 - radius] }
              stroke='red'
              strokeWidth={2}
              tension={1}
              pointerLength={5}
              pointerWidth={5}
              fill='red' 
            />
          ))}
        </Layer>
      </Stage>
    );
  }
}
