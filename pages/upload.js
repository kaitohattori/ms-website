import { withPageAuthRequired, useUser } from '@auth0/nextjs-auth0';
import { useState } from 'react';
import Layout from '../components/Layout';

function Upload() {
    const [message, setMessage] = useState();
    const { user, _, isLoading } = useUser();

    return (
        <Layout user={user} loading={isLoading}>
            <form onSubmit={uploadVideo} id='form'>
                <label>Title</label>
                <br></br>
                <input type='text' name='title' id='title'></input>
                <br></br>
                <br></br>
                <label>Video file</label>
                <br></br>
                <input type='file' name='file' id='file'></input>
                <br></br>
                <br></br>
                <input type='submit' name='submit'></input>
            </form>
            <p>{message}</p>

            <style jsx global>{`
                * {
                    font-family: 'Arial';
                }
                body {
                    margin: 0px;
                    padding: 40px;
                }
            `}</style>
        </Layout>
    );

    function uploadVideo(event) {
        event.preventDefault();

        setMessage('uploading...');

        const formData = new FormData();
        const fileInput = document.getElementById('file');
        const titleInput = document.getElementById('title');
        formData.append('file', fileInput.files[0]);
        formData.append('title', titleInput.value);

        fetch('/api/videos/upload', {
            method: 'POST',
            body: formData,
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                setMessage('success');
            })
            .catch((error) => {
                console.error(error);
                setMessage('error');
            });
    }
}

export default withPageAuthRequired(Upload);
