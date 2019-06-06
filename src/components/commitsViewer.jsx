import * as React from 'react';
import { Alert } from 'react-bootstrap';

export class CommitViewer extends React.Component {
  render() {   
    const commitData = this.props.commitData;

    return (
      <Alert variant="success">
        <Alert.Heading>Details for Commit {commitData.id}</Alert.Heading>
        <p>
          Commit user name is: {commitData.user_name}
        </p>
        <p>
          Commit message is: {commitData.category}
        </p>
        <hr />
        <p className="mb-0">
          Commit hash code is: 
        </p>
      </Alert>
      // <div style={{backgroundColor: '#220022'}}>
      //   <h4>
      //     Commit id is: {commitData.id}
      //   </h4>
      //   <h4>
      //     Commit user name is: {commitData.user_name}
      //   </h4>
      //   <h4>
      //     Commit category is: {commitData.category}
      //   </h4>
      // </div>
    );
  }
}
