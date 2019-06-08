import * as React from "react";

export class FileSelector extends React.Component
{
    // constructor(props)
    // {
    //     super(props);
    // }

    render ()
    {
        return <div>
            <input type="file" onChange={ (e) => this.props.handleChange(e.target.files) } />
        </div>;
    }
}
