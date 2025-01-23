import React, { useState } from 'react';
import axios from 'axios';

const WelcomePage = () => {
    const [fastaFile, setFastaFile] = useState(null);
    const [labelsFile, setLabelsFile] = useState(null);
    const [output, setOutput] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleFileUpload = async () => {
        if (!fastaFile || !labelsFile) {
            setError('Both files are required');
            return;
        }

        setLoading(true);
        setError('');
        setOutput('');

        const formData = new FormData();
        formData.append('fastaFile', fastaFile);
        formData.append('labelsFile', labelsFile);

        try {
            const response = await axios.post('http://localhost:5000/api/python/run-activation-prediction', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setOutput(response.data.output);
        } catch (err) {
            setError('Error running prediction');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Welcome to Activation Site Prediction</h1>
            <p>Upload the required files and run the prediction:</p>

            <input
                type="file"
                accept=".fasta"
                onChange={(e) => setFastaFile(e.target.files[0])}
            />
            <input
                type="file"
                accept=".txt"
                onChange={(e) => setLabelsFile(e.target.files[0])}
            />

            <button onClick={handleFileUpload} disabled={loading}>
                {loading ? 'Running Prediction...' : 'Do Activation Site Prediction'}
            </button>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            {output && (
                <div>
                    <h3>Prediction Output:</h3>
                    <pre>{output}</pre>
                </div>
            )}
        </div>
    );
};

export default WelcomePage;
