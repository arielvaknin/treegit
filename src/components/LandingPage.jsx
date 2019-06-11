import * as React from 'react';
import { CommitsParser } from './CommitsParser';
import { CommitViewer } from './commitsViewer';
import { Container, Row, Col, Button, InputGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';
import treegit_image from './treegit_image.jpeg' 
import './LandingPage.scss';
document.body.style = 'background: #fcf9ec;';

const API_fileinfo = '/file_info?filePath=';
const API_CommitInfo = '/commit_info/';
const API_commitsCompare = '/commitsCompare';

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
            singleCommitData: defaultCommitData,
            selectedCommits: [defaultCommitData, defaultCommitData],
            analyzing: false,
            allowToCompare: false,
        }
        this.handleClickOnAnalyze = this.handleClickOnAnalyze.bind(this);
        this.handleFilenameChange = this.handleFilenameChange.bind(this);
        this.handleCommitclick = this.handleCommitclick.bind(this);
        this.handleCompareCommmits = this.handleCompareCommmits.bind(this);
    }

    updateCommitData(data) {
        let selectedCommits = [...this.state.selectedCommits];
        selectedCommits.pop();
        selectedCommits.unshift(data);

        let allowToCompare = this.state.allowToCompare;
        if (selectedCommits[0].id === 0 || selectedCommits[1].id === 0) {
            allowToCompare = false;
        } else {
            allowToCompare = true;
        }

        this.setState( { selectedCommits: selectedCommits, allowToCompare: allowToCompare } )
    }

    handleCommitclick(id) {
        console.log(`id is: ${id}`);
        const url = API_CommitInfo + id.toString();
                   
        axios.get(url)
            .then(result => this.updateCommitData(result.data))
            .catch(error => this.updateCommitData(defaultCommitData));
      }

    handleFilenameChange(event) {
        this.setState({ filename: event.target.value })
    }

    handleClickOnAnalyze(event) {
        this.setState({ analyzing: true });
        const filename = this.state.filename;
        const url = API_fileinfo + filename;
           
        axios.get(url)
            .then(result => this.setState({ dataIn: result.data, analyzing: false }))
            .catch(error => this.setState({ dataIn: defaultDataIn }));
    }

    handleCompareCommmits() {
        const id1 = this.state.selectedCommits[0].id.toString();
        const id2 = this.state.selectedCommits[1].id.toString();
        const url = API_commitsCompare + `?id1=${id1}&id2=${id2}`;
        axios.get(url);
    }

    render () {
        const analyzing = this.state.analyzing;
        const allowToCompare = this.state.allowToCompare;

        return (
            <Container>
                <img style={{width: '100px', height: '100px'}} src={treegit_image} alt={"logo"}/>
                <h2>Welcome to TreeGit!!</h2>
              
                <Row className='load-file'>
                    <Col>
                        <InputGroup className="mb-2" onChange={this.handleFilenameChange}>
                            <FormControl
                             aria-label="Default"
                             aria-describedby="inputGroup-sizing-default"
                             />
                        </InputGroup>
                    </Col>
                </Row>
                
                <Button variant="primary" onClick={this.handleClickOnAnalyze} disabled={analyzing}>
                    {analyzing && <span>Analyzing...</span>}
                    {!analyzing && <span>Analyze</span>}
                </Button>
                <Row style={{paddingTop: '50px'}} className="main-row">
                    <Col sm={7}>
                        <CommitsParser 
                        dataIn={this.state.dataIn} 
                        handleCommitclick={this.handleCommitclick}
                        selectedCommits={this.state.selectedCommits}
                        />
                    </Col>
                    <Col sm={5}>
                        <Button variant="primary" onClick={this.handleCompareCommmits} disabled={!allowToCompare}>
                            Compare
                        </Button>
                        { this.state.selectedCommits.map( (item) => <CommitViewer commitData={ item }/>) }
                    </Col>
                </Row>
            </Container>
        );
    }
}