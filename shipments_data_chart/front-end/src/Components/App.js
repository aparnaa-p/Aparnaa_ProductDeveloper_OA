import React, { Component } from 'react';
import '../App.css';
import Viz from './Viz';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            config: ''
        };

        this.handleUploadFile = this.handleUploadFile.bind(this);
    }

    handleUploadFile(ev) {
        ev.preventDefault();

        const data = new FormData();
        data.append('file', this.uploadInput.files[0]);
        data.append('filename', this.fileName.value);

        fetch('http://localhost:4000/vizConfig', {
            method: 'POST',
            body: data
        }).then(response => {
                this.setState({ config: response.json()})
            })
        };


  render() {
    return (
        <div className="App">
          <h1>Shipments Data Chart</h1>
            <Viz />
            <form onSubmit={this.handleUploadFile}>
                <div>
                    <input
                        ref={ref => {
                            this.uploadInput = ref;
                        }}
                        type="file"
                    />
                </div>
                <br />
                <div>
                    <input
                        ref={ref => {
                            this.fileName = ref;
                        }}
                        type="text"
                        placeholder="Enter the desired name of file"
                    />
                </div>
                <br />
                <div>
                    <button>Upload</button>
                </div>
                <hr />
            </form>

        </div>
    );
  }
}


export default App;
