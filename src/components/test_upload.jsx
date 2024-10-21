import axios from "axios"
import react from "react"
import { useState } from "react"
const Testupload = () => {
    const [file, setFile] = useState(null)
    const [gpt,setgpt]=useState("")
    const handleChange = (e) => {
        console.log(e.target.files[0])
        setFile(e.target.files[0])
        console.log(file)
    }
    // var formdata = new FormData();
    // formdata.append("file", file)
    // console.log(formdata)
    const handleClick = async () => {
        const data = new FormData();
        data.append('image', file);
        // data.append('name', 'myimage.jpg');
        console.log(data)
        // const options = {
        //     method: 'POST',
        //     url: 'https://upload-images-hosting-get-url.p.rapidapi.com/upload',
        //     headers: {
        //         'x-rapidapi-key': '23a7819980msh3eb3b5081972f4cp1eed03jsn403f78d8eea7',
        //         'x-rapidapi-host': 'upload-images-hosting-get-url.p.rapidapi.com'
        //     },
        //     data: data
        // };










        try {
            const response = await axios.post("https://upload-images-hosting-get-url.p.rapidapi.com/upload", data, {
                headers: {
                    'x-rapidapi-key': '23a7819980msh3eb3b5081972f4cp1eed03jsn403f78d8eea7',
                    'x-rapidapi-host': 'upload-images-hosting-get-url.p.rapidapi.com'
                }
            });
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }





    }
    const chatgpt=async ()=>{

        
        const options = {
            method: 'POST',
            url: 'https://chatgpt-42.p.rapidapi.com/conversationgpt4-2',
            headers: {
                'x-rapidapi-key': '23a7819980msh3eb3b5081972f4cp1eed03jsn403f78d8eea7',
                'x-rapidapi-host': 'chatgpt-42.p.rapidapi.com',
                'Content-Type': 'application/json'
            },
            data: {
                messages: [
                    {
                        role: 'user',
                        content: 'what is the meaing of nai nai?'
                    }
            ],
            system_prompt: '',
            temperature: 0.9,
            top_k: 5,
            top_p: 0.9,
            max_tokens: 256,
            web_access: false
        }
    };
    try {
        const response = await axios.request(options);
        console.log(response.data);
        setgpt(response.data.result)
    } catch (error) {
        console.error(error);
    }

        

    }
    return (
        <>
            <input type="file" onChange={handleChange} />
            <button onClick={chatgpt}>click me!</button>
            <p>{gpt}</p>
        </>
    )
}
export default Testupload