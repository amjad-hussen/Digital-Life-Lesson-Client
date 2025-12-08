import React from 'react';
import logoWhite from '../../../assets/logo-white.png'
import { Link } from 'react-router';
const Footer = () => {
    return (
        <footer className="footer sm:footer-horizontal bg-[#003220] text-white rounded-xl p-10 gap-10">
            <nav>
                <Link to={'/'}><img src={logoWhite} className='h-15' alt="" /></Link>
                <p className='mt-3'>
                    Digital Life Lessons is a platform where users <br /> can create, store, and share meaningful life <br /> lessons, personal growth insights, and wisdom <br /> they have gathered over time. Users can organize  <br />
                    lessons, mark favorites, track learning progress, <br />and browse public lessons shared by others.
                </p>
            </nav>
            <nav>
                <h6 className="footer-title">Services</h6>
                <a className="link link-hover">Branding</a>
                <a className="link link-hover">Design</a>
                <a className="link link-hover">Marketing</a>
                <a className="link link-hover">Advertisement</a>
            </nav>
            <nav>
                <h6 className="footer-title">Company</h6>
                <a className="link link-hover">About us</a>
                <a className="link link-hover">Contact</a>
                <a className="link link-hover">Jobs</a>
                <a className="link link-hover">Press kit</a>
            </nav>
            <nav>
                <h6 className="footer-title">Legal</h6>
                <a className="link link-hover">Terms of use</a>
                <a className="link link-hover">Privacy policy</a>
                <a className="link link-hover">Cookie policy</a>
            </nav>
        </footer>
    );
};

export default Footer;