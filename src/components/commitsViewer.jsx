import * as React from 'react';

// ---------- hard - coded ----------------
const hash = '43h93h48fh3'
const message = 'Bug fix'
const date = '24/05/19 13:45'
const author = 'Adiel Charbash'

const commitData =  { 
    hash: hash,
    message: message,
    date: date,
    author: author
 }
    


export class CommitsParser extends React.Component {
  render() {   
    //const commitData = this.props.commitdata;
    
    return (
      <div>
          {commitData}
      </div>
    );
  }
}
