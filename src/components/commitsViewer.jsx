import * as React from 'react';

export class CommitViewer extends React.Component {
  render() {   
    const commitData = this.props.commitData;

    return (
      <div>
        <h4>
          Commit id is: {commitData.id}
        </h4>
        <h4>
          Commit user name is: {commitData.user_name}
        </h4>
        <h4>
          Commit category is: {commitData.category}
        </h4>
      </div>
    );
  }
}
