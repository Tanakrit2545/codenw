import React, { useState } from "react";
import axios from 'axios';

const AddMotorcycleForm = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [crustType, setCrustType] = useState('');
    const [size, setSize] = useState('');
    const [price, setPrice] = useState('');
    const [imageLink, setImageLink] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/motorcycles', {
                name,
                description,
                crustType,
                size,
                price,
                image: imageLink
            });
            console.log(response.data);
            setName('');
            setDescription('');
            setCrustType('');
            setSize('');
            setPrice('');
            setImageLink('');
            setError('');
            alert('Motorcycle added successfully!');
        } catch (error) {
            setError(error.response.data.error);
        }
    };

    return (
        <div>
            <h2>Add Motorcycle</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                </div>
                <div>
                    <label>Crust Type:</label>
                    <input type="text" value={crustType} onChange={(e) => setCrustType(e.target.value)} required />
                </div>
                <div>
                    <label>Size:</label>
                    <input type="text" value={size} onChange={(e) => setSize(e.target.value)} required />
                </div>
                <div>
                    <label>Price:</label>
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
                </div>
                <div>
                    <label>Image Link:</label>
                    <input type="text" value={imageLink} onChange={(e) => setImageLink(e.target.value)} required />
                </div>
                <button type="submit">Add Motorcycle</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default AddMotorcycleForm;
