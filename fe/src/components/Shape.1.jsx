import * as React from 'react';
import Konva from 'konva';
import { Arrow, Line, Stage, Layer, Circle, Text } from 'react-konva';


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

const rows = [100, 200, 300, 400]
const cols = [500, 600, 700]
const usersToColumns = { 
  'Ariel Vaknin': 500,
  'Michael Farjon': 600,
  'Messages': 700
 }


const x_position = [500, 500, 600, 500, 600, 500]
const y_position = [100, 180, 220, 260, 300, 340]

export class Shape extends React.Component {
  handleDragStart = e => {
    e.target.setAttrs({
      shadowOffset: {
        x: 15,
        y: 15
      },
      scaleX: 1.1,
      scaleY: 1.1
    });
  };
  handleDragEnd = e => {
    e.target.to({
      duration: 0.5,
      easing: Konva.Easings.ElasticEaseOut,
      scaleX: 1,
      scaleY: 1,
      shadowOffsetX: 5,
      shadowOffsetY: 5
    });
  };
  render() {
      console.log(window.innerWidth);
      console.log(window.innerHeight);
    return (
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
            <Text text='1' x={490} y={85} fontSize='30'/>
            <Text text='2' x={490} y={165} fontSize='30'/>
            <Text text='2a' x={585} y={205} fontSize='30'/>
            <Text text='2b' x={585} y={285} fontSize='30'/>
            <Text text='3' x={490} y={245} fontSize='30'/>
            <Text text='4' x={490} y={325} fontSize='30'/>
            <Arrow 
                points={[500, 120, 500, 155]}
                stroke='red'
                tension={1}
                pointerLength={10}
                pointerWidth={12}
            />
            <Arrow 
                points={[500, 200, 500, 235]}
                stroke='red'
                tension={1}
                pointerLength={10}
                pointerWidth={12}
            />
            <Arrow 
                points={[500, 280, 500, 315]}
                stroke='red'
                tension={1}
                pointerLength={10}
                pointerWidth={12}
            />
            <Arrow 
                points={[600, 240, 600, 275]}
                stroke='red'
                tension={1}
                pointerLength={10}
                pointerWidth={12}
            />
            <Arrow 
                points={[520, 177, 580, 215]}
                stroke='red'
                tension={1}
                pointerLength={10}
                pointerWidth={12}
            />
            <Arrow 
                points={[580, 295, 520, 337]}
                stroke='red'
                tension={1}
                pointerLength={10}
                pointerWidth={12}
            />
          
          {[...Array(6)].map((i, ind) => (
            <Circle
              key={ind}
              x={x_position[ind]}
              y={y_position[ind]}
              numPoints={5}
              Radius={20}
              fill="#89b717"
              opacity={0.2}
              shadowColor="black"
              shadowBlur={10}
              shadowOpacity={0.6}
              onDragStart={this.handleDragStart}
              onDragEnd={this.handleDragEnd}
            />
          ))}
        </Layer>
      </Stage>
    );
  }
}


