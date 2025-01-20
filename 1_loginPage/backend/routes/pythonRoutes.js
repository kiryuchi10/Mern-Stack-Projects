const express = require('express');
const fileUpload = require('express-fileupload');
const { exec } = require('child_process');
const path = require('path');
const router = express.Router();

// Middleware to handle file uploads
router.use(fileUpload());

// Endpoint to run Python script
router.post('/run-activation-prediction', async (req, res) => {
    if (!req.files || !req.files.fastaFile || !req.files.labelsFile) {
        return res.status(400).json({ message: 'Both files are required' });
    }

    try {
        // Save uploaded files to the server
        const fastaFilePath = path.join(__dirname, '../uploads', req.files.fastaFile.name);
        const labelsFilePath = path.join(__dirname, '../uploads', req.files.labelsFile.name);

        await req.files.fastaFile.mv(fastaFilePath);
        await req.files.labelsFile.mv(labelsFilePath);

        // Run the Python script
        const pythonScriptPath = path.join(__dirname, '../python/protein_active_site_prediction.py');
        const command = `python ${pythonScriptPath} ${fastaFilePath} ${labelsFilePath}`;

        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error('Error executing Python script:', stderr);
                return res.status(500).json({ message: 'Python script error', error: stderr });
            }

            // Send the Python script's output as the response
            res.status(200).json({ output: stdout });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

module.exports = router;
