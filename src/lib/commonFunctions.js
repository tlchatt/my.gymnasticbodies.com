
let NEWAPI = process.env.REACT_APP_API_NEW
export async function getJustId(mediaId) {
    let testId = "jTRUtQhq.json?exp=1766067687919&sig=64547cb3781a4883e5127a12cb5943ff"

    return mediaId?.split(".")[0]
}
export async function getAndCheckMedia(id) {
    console.log("id is:", id)
    let multipleMedia = Array.isArray(id) ? true : false
    console.log("multipleMedia:", multipleMedia)
    let baseUrl = `https://6z1gtynqfxcjjwix.public.blob.vercel-storage.com`
    let multipleMediaUrls = []
    if (multipleMedia) {
        //url example: https://content.jwplatform.com/v2/media/UwSbT4bF/poster.jpg?width=720
        for (let item of id) {
            let mediaSplitUrl = item.image.split('/') //['https:', '', 'content.jwplatform.com', 'v2', 'media', 'UwSbT4bF', 'poster.jpg?width=720']
            let mediaId = `${mediaSplitUrl[mediaSplitUrl.indexOf('media') + 1]}`//will get the id (UwSbT4bF)
            console.log("id for multiple media:", mediaId)
            let present = await checkForMedia(mediaId)
            if (present) {
                multipleMediaUrls.push({ url: `${baseUrl}/${mediaId}.mp4` })
            } else {
                console.error("error email sent for id: ", mediaId)
            }

        }
        // console.log("multiple media returned::", multipleMediaUrls)
        return multipleMediaUrls
    } else {
        console.log("id inside is:", id)
        console.log("id inside is:", typeof id)


        if (typeof id != 'undefined') {
            id = id?.includes("json") ? id?.split(".")[0] : id
            console.log("id in single media:", id)
            let mediaPresent = await checkForMedia(id)
            console.log("mediaPresent:", mediaPresent)
            if (mediaPresent) {
                return mediaPresent
            }
            // else {
            //     //check if its a folder
            //     id = id?.includes("json") ? id?.split(".")[0] : `${id}`
            //     let urlsFromMediaFolder = await checkForFolder(id)
            //     return urlsFromMediaFolder
            // }
        }

        // console.log("single media returned:",present)

    }
    async function checkForMedia(id) {

        let url = `${baseUrl}/${id}.mp4`;
        console.log("url in checkForMedia:", url)
        try {
            const response = await fetch(url, { method: 'HEAD' });
            if (response.ok) {
                console.log('Media found:', response.headers.get('Content-Type'));//video / mp4
                return url;
            } else {
                //check if its a folder
                id = id?.includes("json") ? id?.split(".")[0] : `${id}`
                let urlsFromMediaFolder = await checkForFolder(id)
                if (urlsFromMediaFolder) {
                    return urlsFromMediaFolder
                } else {
                    let replyTo = 'error@tlchatt.com'
                    if (id) {
                        console.error('Media NOT FOUND FOR ID (might be in Playlist, which we are checking next):', id);
                        const config = {
                            headers: {
                                "Content-Type": "application/json"
                            }
                        }
                        let data = {
                            to: replyTo,
                            bcc: 'contact@tlchatt.com',
                            from: 'contact@tlchatt.com',
                            subject: `Gymnasticbodies - Media not found with Id ${id}`,
                            replyTo: replyTo,
                            mediaId: `${id}`
                        }
                        try {
                            const res = await fetch(NEWAPI + '/api/error', {
                                method: 'POST',
                                headers: {
                                    ...config.headers,
                                },
                                body: JSON.stringify(data),
                            });
                            if (res.ok) {
                                const responseData = await res.json();
                                // handle response data
                            } else {
                                // handle error
                            }
                        } catch (error) {
                            // handle fetch error
                        }
                    }
                }
            }
        } catch (error) {
            console.error('Media NOT FOUND Else Error:', error);
        }
    }
    async function checkForFolder() {
        console.log("process.env.BLOB_READ_WRITE_TOKEN:", process.env.BLOB_READ_WRITE_TOKEN)
        console.log("NEWAPI:", NEWAPI)
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        let data = {
            mediaId: `${id}`
        }
        try {
            const res = await fetch('http://localhost:3001/api/mediaBlob', {
                method: 'POST',
                headers: {
                    ...config.headers,
                },
                body: JSON.stringify(data),
            });
            if (res.ok) {
                const responseData = await res.json();
                console.log("responseData:", responseData)
                return responseData.url
                // handle response data
            } else {
                // handle error
                
            }
        } catch (error) {
            // handle fetch error
        }


    }
}

