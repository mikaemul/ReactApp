import {useState} from 'react';


const useUploadForm = (callback) => {
    const [inputs, setInputs] = useState({
        title: '',
        description: '',
        file: null,
        dataUrl: '',
    });
    const handleSubmit = (event) => {
      if (event) {
        event.preventDefault();
      }
      callback();
    }
    const handleInputChange = (event) => {
      event.persist();
      setInputs((inputs) => {
          return {
              ...inputs, 
              [event.target.name]: event.target.value,
            };
        });
    }
    const handleFileChange = (event) =>{
        event.persist();
        const x = event.target.files[0];
        console.log('file', x);
        setInputs((inputs) =>{
            return {
                ...inputs, 
                file: x,
              };
        });
    };
    return {
      handleSubmit,
      handleInputChange,
      setInputs,
      inputs,
      handleFileChange,
    };
  }

export default useUploadForm;
