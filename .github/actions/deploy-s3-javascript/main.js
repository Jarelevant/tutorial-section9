const core = require('@actions/core');
// const github = require('@actions/github');
const exec = require('@actions/exec');


function run(){

    const bucket = core.getInput('bucket', { required:true })
    const bucketRegion = core.getInput('bucket-region', { required:true })
    const distList = core.getInput('dist-folder', { required:true })

    const s3URI = `s3://${bucket}`
    exec.exec(`aws s3 sync ${distList} ${s3URI} --region ${bucketRegion}`)

    const staticWebsideURL = `http://${bucket}.s3-website-${bucketRegion}.amazonaws.com`
    core.setOutput ('website-url',staticWebsideURL)
}

run()