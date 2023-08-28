import React from 'react'
import Input from '../input/Input'
import { useState } from 'react';
import axios from 'axios';
function DropdownInput({ options, selectedOption, onOptionChange }) {
  return (
    <select value={selectedOption} onChange={e => onOptionChange(e.target.value)}>
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}


const Register = ({ onUpdate }) => {
  const [formData, setFormData] = useState({
    fullname:'',
    email:'',
    rollno :'',
  })
  const [selectedYear, setSelectedYear] = useState(1);
  const [selectedSection, setSelectedSection]  = useState('A')

  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };


  //RADIO BUTTON OPTIONS
  const yearOptions = [
    { value: 1, label: '1st Year' },
    { value: 2, label: '2nd Year' },
    { value: 3, label: '3rd Year' },
    { value: 4, label: '4th Year' }
  ];

  const sectionOptions = [
    { value:'A', label:'A'},
    { value:'B', label:'B'},
    { value:'C', label:'C'},
    { value:'D', label:'D'}
  ]




  const handleChange = (event) =>{
    const {value,name} = event.target;
    setFormData((prevData)=>({
      ...prevData,
      [name]:value
    }))
  }

  //Dropdown handlers
  const handleSectionChange = (section) =>{
    setSelectedSection(section);
  };

  const handleYearChange = (year) => {
    setSelectedYear(year);
  };



  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const user = {
      fullname: formData.fullname,
      email: formData.email,
      rollno: formData.rollno,
      year: selectedYear,
      section: selectedSection,
    };
  
    const formDataToSend = new FormData();
    formDataToSend.append('image', selectedImage);
    for (const key in user) {
      formDataToSend.append(key, user[key]);
    }
  
    try {
      await axios.post('/register', formDataToSend);
      setFormData({
        fullname: '',
        email: '',
        rollno: '',
      });
      setSelectedImage(null); // Reset the selected image
      onUpdate();
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };
  
  return (
    <div className='register-body'>
      <form onSubmit={handleSubmit}>
        <Input
          label = "Full name"
          name='fullname'
          value={formData.fullname}
          onChange={handleChange}
          type="text"
          required>
        </Input>
        <Input
          label = "Email"
          name='email'
          value={formData.email}
          onChange={handleChange}
          type="email"
          required>
        </Input>
        <Input
          label = "Roll number"
          name='rollno'
          value={formData.rollno}
          onChange={handleChange}
          type="text"
          required>
        </Input>
        <div className='year'>
          <h3>Select year</h3>
          <DropdownInput
            
            options={yearOptions}
            selectedOption={selectedYear}
            onOptionChange={handleYearChange}
          />
        </div>
        <div className='Section'>
          <h3>Select Section</h3>
          <DropdownInput
            options={sectionOptions}
            selectedOption={selectedSection}
            onOptionChange={handleSectionChange}
          />
        </div>
        <Input
          label="Profile Image"
          name="image"
          type="file"
          onChange={handleImageChange}
          required
        />

        
        <button className='btn btn-primary'>Register</button>
        

      </form>

    </div>
  )
}

export default Register