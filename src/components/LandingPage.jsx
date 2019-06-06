import * as React from 'react';
import { CommitsParser } from './CommitsParser';
import { CommitViewer } from './commitsViewer';

import { Container, Row, Col, Button, InputGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';

import './LandingPage.scss';

const API = '/file_info?filePath=';
const defaultDataIn = {
    "nodes": [],
    "edges": [],
    "all_user_names": []
};

export class LandingPage extends React.Component {
    constructor(props, state) {
        super(props, state);
        this.state = {
            dataIn: defaultDataIn,
            filename: '',
            commitData: {id: '', user_name: '', category: ''}
        }
        this.handleAnalyze = this.handleAnalyze.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCommitclick = this.handleCommitclick.bind(this);
    }

    handleCommitclick(id, user_name, category, hash) {
        this.setState({ commitData: { id: id, user_name: user_name, category: category } });
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
                <h2>Welcome to TreeGit!!</h2>
                <InputGroup className="mb-3" onChange={this.handleChange}>
                    <FormControl
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    />
                </InputGroup>
                <Button variant="primary" onClick={this.handleAnalyze}>Analyze</Button>
                <Row style={{paddingTop: '50px'}} className="main-row">
                    <Col sm={8}>
                        <CommitsParser dataIn={this.state.dataIn} handleCommitclick={this.handleCommitclick}/>
                    </Col>
                    <Col sm={4}>
                        <CommitViewer commitData={ this.state.commitData }/>
                    </Col>
                </Row>
            </Container>
        );
    }
}