import './Styles/Header.css';

function Header() {

    return (
        <div className='topnav'>
            <a className='active' href='/'>Home</a>
            <input type="text" placeholder="Search.."></input>
        </div>
    );
};

export default Header;