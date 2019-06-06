import * as React from 'react';
import { CommitsParser } from './CommitsParser';
import { Container, Row, Button, InputGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';

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
            filename: ''
        }
        this.handleAnalyze = this.handleAnalyze.bind(this);
        this.handleChange = this.handleChange.bind(this);
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
                <Row>
                    <CommitsParser dataIn={this.state.dataIn}/>
                </Row>
            </Container>
        );
    }
}