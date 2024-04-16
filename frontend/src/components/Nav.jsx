import { Link } from 'react-router-dom';

export default function Head() {
    const linkStyle = {
        textDecoration: 'none',
        color: '#f5400f'
    }
  return (
    <nav>
        <div className="logo">
            <Link to={'/'} style={linkStyle}><h2>iNote</h2></Link>
        </div>
    </nav>
  )
}
