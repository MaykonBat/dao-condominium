import React, { useState, useEffect } from "react";
import { Status } from "../../services/Web3Service";
import Loader from "../../components/Loader";
import TopicFileRow from "./TopicFileRow";
import { uploadTopicFile, getTopicFiles, deleteTopicFile } from "../../services/ApiService";

type Props = {
    title: string;
    status?: Status;
}

function TopicFiles(props: Props) {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [files, setFiles] = useState<string[]>([]);
    const [newFile, setNewFile] = useState<File>();
    const [uploadMessage, setUploadMessage] = useState<string>("");

    function onDeleteTopic(filename: string) {
        if (props.status !== Status.IDLE) return setUploadMessage("You cannot delete this file.");

        setIsLoading(true);
        setUploadMessage("Deleting the file...wait...")
        deleteTopicFile(props.title, filename)
            .then(() => {
                setIsLoading(false);
                setUploadMessage("");
                loadFiles();
            })
            .catch(err => {
                setIsLoading(false);
                setUploadMessage(err.message ? err.response.data : err.message)
            })
    }

    function onFileChange(evt: React.ChangeEvent<HTMLInputElement>) {
        if (evt.target.files) {
            setNewFile(evt.target.files[0]);
        }
    }

    function loadFiles() {
        setIsLoading(true);
        getTopicFiles(props.title)
            .then(files => {
                setFiles(files);
                setIsLoading(false);
            })
            .catch(err => {
                setUploadMessage(err.message ? err.response.data : err.message);
                setFiles([]);
                setIsLoading(false);
            })
    }

    useEffect(() => {
        loadFiles()
    }, [])

    function btnUploadClick() {
        if (!newFile) return;

        setIsLoading(true);
        setUploadMessage("Uploading the file... wait...");
        uploadTopicFile(props.title, newFile)
            .then(() => {
                setNewFile(undefined);
                setUploadMessage("");
                setIsLoading(false);
                loadFiles();
            })
            .catch(err => {
                setUploadMessage(err.response ? err.response.data : err.message);
                setIsLoading(false);
            })
    }

    return (
        <div className="row">
            <div className="col-12">
                <div className="card my-4">
                    <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                        <div className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                            <h6 className="text-white text-capitalize ps-3">
                                <i className="material-icons opacity-10 me-2">cloud_upload</i>
                                Files
                            </h6>
                        </div>
                    </div>
                    <div className="card-body px-0 pb-2">
                        {
                            isLoading
                                ? < Loader />
                                : <></>
                        }
                        <div className="table-responsive p-0">
                            <table className="table align-items-center mb-0">
                                <thead>
                                    <tr>
                                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">File Name</th>
                                        <th className="text-secondary opacity-7"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        files && files.length
                                            ? files.map(file => <TopicFileRow
                                                key={file}
                                                filename={file}
                                                topicTitle={props.title}
                                                status={props.status}
                                                onDelete={() => onDeleteTopic(file)}
                                            />)
                                            : (
                                                <tr>
                                                    <td colSpan={2}>
                                                        <p className="ms-3">
                                                            There are no files for this topic. Upload one first.
                                                        </p>
                                                    </td>
                                                </tr>
                                            )
                                    }
                                </tbody>
                            </table>
                            <hr />
                        </div>
                        {
                            props.status === Status.IDLE
                                ? (
                                    <div className="row mb-3 ms-3">
                                        <div className="col-md-6 mb-3">
                                            <div className="form-group">
                                                <h6>Upload a new file:</h6>
                                                <div className="input-group input-group-outline">
                                                    <input className="form-control" type="file" id="newFile" onChange={onFileChange} ></input>
                                                    <button className="btn bg-gradient-dark mb-0" onClick={btnUploadClick}>
                                                        <i className="material-icons opacity-10 me-2">cloud_upload</i>
                                                        Upload
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6 mt-5 text-danger">
                                            {uploadMessage}
                                        </div>
                                    </div>
                                )
                                : <></>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TopicFiles;