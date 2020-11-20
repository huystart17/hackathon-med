var SoxCommand = require('sox-audio');


const AudioHelper = {
    async convertSampleRate({
                                input_path, output_path, sample_rate = 16000,
                                onstart = (commandLine = '') => true,
                                onprocess = (progress = '') => true,
                                onprepare = (args = []) => true
                            }) {
        return new Promise((resolve, reject) => {
            let command = SoxCommand()
                .input(input_path)
                .inputFileType('wav')
                .output(output_path)
                .outputSampleRate(sample_rate)
                .outputEncoding('signed')
                .outputBits(16)
                .outputChannels(1)
                .outputFileType('wav');
            command.on('prepare', onprepare);
            command.on('start', onstart);

            command.on('progress', onprocess);

            command.on('error', function(err, stdout, stderr) {
                reject({ err, stdout, stderr });
            });

            command.on('end', function() {
                resolve({ output_path });
                // console.log('Sox command succeeded!');
            });
            command.run();
        });


    }

};


module.exports = { AudioHelper };