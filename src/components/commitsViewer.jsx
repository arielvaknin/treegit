import * as React from 'react';
import { Alert } from 'react-bootstrap';

export class CommitViewer extends React.Component {
  render() {   
    const commitData = this.props.commitData;
    if (commitData.id == 0){
      return (
        <Alert variant="success" style={{marginTop: '10px'}}>
          <p>
            <u>Select commit to watch details</u>
          </p>
        </Alert>
      ) 
    } else {
      return (
        <Alert variant="success" style={{marginTop: '10px'}}>
          <Alert.Heading>Details for Commit {commitData.id}</Alert.Heading>
          <p>
            Commit user name is: <u>{commitData.user_name}</u>
          </p>
          <p>
            Commit date is: <u>{commitData.commit_date}</u>
          </p>
          <p>
            Commit message is: <u>{commitData.commit_msg}</u>
          </p>
          <hr />
          <p className="mb-0">
            Commit hash code is: <br /> {commitData.hash_key}
          </p>
          <br />
          <p>
            Commit parent/s is/are: <br />
            { commitData.parents.map( item => item + "\n") }
          </p>
        </Alert>
      );
    }
  }
}
