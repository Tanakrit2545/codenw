import React, { useState } from 'react';
import './Moto.css';

function ContactUs() {
    const [input, setInput] = useState({
        firstName: '',
        lastName: '',
        email: '',
        message: ''
    });

    const hdlChange = (e) => {
        setInput(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    }

    const hdlSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted!");
    }

    return (
        <div className="contact-content">
            <h1 className="contact-title">ติดต่อเราเกี่ยวกับการเช่ารถ</h1>
            <p className="contact-description">
                ติดต่อเราเมื่อคุณต้องการข้อมูลเพิ่มเติมหรือมีคำถามเกี่ยวกับการเช่ารถ
            </p>
            <p className="contact-description">
                ทีมงานของเราพร้อมให้บริการคำตอบแก่คุณเกี่ยวกับการเช่ารถ
            </p>

            <form className="contact-form" onSubmit={hdlSubmit}>
                <input
                    type="text"
                    className="contact-input"
                    name="firstName"
                    placeholder="ชื่อ"
                    value={input.firstName}
                    onChange={hdlChange}
                />
                <input
                    type="text"
                    className="contact-input"
                    name="lastName"
                    placeholder="นามสกุล"
                    value={input.lastName}
                    onChange={hdlChange}
                />
                <input
                    type="email"
                    className="contact-input"
                    name="email"
                    placeholder="อีเมล์"
                    value={input.email}
                    onChange={hdlChange}
                />
                <textarea
                    id="message"
                    className="contact-textarea"
                    name="message"
                    rows="4"
                    placeholder="ข้อความเกี่ยวกับการเช่ารถ"
                    value={input.message}
                    onChange={hdlChange}
                ></textarea>
                <button type="submit" className="contact-button">ส่งข้อความ</button>
            </form>
        </div>
    );
}

export default ContactUs;
