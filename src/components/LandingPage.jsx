import * as React from 'react';
import { CommitsParser } from './CommitsParser';
import { CommitViewer } from './commitsViewer';

import { Container, Row, Col, Button, InputGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';
import treegit_image from './treegit_image.jpeg' 
import './LandingPage.scss';
document.body.style = 'background: #fcf9ec;';

const API = '/file_info?filePath=';
const API_CommitInfo = '/commit_info/';
const defaultDataIn = {
    "nodes": [],
    "edges": [],
    "all_user_names": []
};
const defaultCommitData = {
    commit_date: "", 
    commit_msg: "", 
    hash_key: "", 
    id: 0, 
    parents: [], 
    user_name: "",
};

export class LandingPage extends React.Component {
    constructor(props, state) {
        super(props, state);
        this.state = {
            dataIn: defaultDataIn,
            filename: '',
            commitData: defaultCommitData,
        }
        this.handleAnalyze = this.handleAnalyze.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCommitclick = this.handleCommitclick.bind(this);
    }

    handleCommitclick(id, user_name, category, hash) {
        const url = API_CommitInfo + id.toString();
           
        axios.get(url)
            .then(result => this.setState({ commitData: result.data }))
            .catch(error => this.setState({ commitData: defaultDataIn }));
      }

    handleChange(event) {
        this.setState({ filename: event.target.value })
    }

    handleAnalyze(event) {
        console.log('clicked on analyze')
        const filename = this.state.filename;
        const url = API + filename;
           
        axios.get(url)
            .then(result => this.setState({ dataIn: result.data }))
            .catch(error => this.setState({ dataIn: defaultDataIn }));
    }

    render () {
        return (
            <Container>
                <img style={{width: '100px', height: '100px'}} src={treegit_image} alt={"logo"}/>
                <h2>Welcome to TreeGit!!</h2>
                <InputGroup className="mb-3" onChange={this.handleChange}>
                    <FormControl
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    />
                </InputGroup>
                <Button variant="primary" onClick={this.handleAnalyze}>Analyze</Button>
                <Row style={{paddingTop: '50px'}} className="main-row">
                    <Col sm={7}>
                        <CommitsParser dataIn={this.state.dataIn} handleCommitclick={this.handleCommitclick}/>
                    </Col>
                    <Col sm={5}>
                        <CommitViewer commitData={ this.state.commitData }/>
                    </Col>
                </Row>
            </Container>
        );
    }
}