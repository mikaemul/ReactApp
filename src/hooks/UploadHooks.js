import {useState} from 'react';


const useUploadForm = (callback) => {
    const [inputs, setInputs] = useState({
        title: '',
        description: '',
        file: null,
        dataUrl: '',
        brightness: 100,
        contrast: 100,
        saturation: 100,
        sepia: 0,
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

    const handleSliderChange = (event,value) =>{
      if(event.target.previousElementSibling!== null && event.target.previousElementSibling.name !== undefined )
       //console.log('nimi', event.target.previousElementSibling.name );
       //console.log('arvo', value);
       setInputs((inputs) => {
        return {
            ...inputs, 
            [ event.target.previousElementSibling.name]: value,
          };
      });
    }
    return {
      handleSubmit,
      handleInputChange,
      setInputs,
      inputs,
      handleFileChange,
      handleSliderChange,
    };
  }

export default useUploadForm;
