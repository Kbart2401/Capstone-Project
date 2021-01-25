import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import LogoutButton from '../../auth/LogoutButton';
import { useSelector } from 'react-redux';
import LoginModal from '../../modals/LoginModal';
import SignUpModal from '../../modals/SignupModal';
import MailPopOver from '../../modals/MailPopOver';
import { AiTwotoneHome } from 'react-icons/ai';
import { Input } from '@chakra-ui/react';
import './NavBar.css';

const NavBar = () => {
  const user = useSelector(state => state.session.user)
  /*we're using session here just to re-render, keying into friendsWaiting wasn't 
  re-rendering the component, redux uses strict equality for comparison but still shouldn't updated */
  const session = useSelector(state => state.session)
  const friendReqs = useSelector(state => state.session.friendsWaiting)
  const history = useHistory()
  const [search, setSearch] = useState('')


  const onSearch = async (e) => {
    e.preventDefault()
    const res = await fetch(`/api/users/${search}`)
    const users = await res.json()
    setSearch('')
    return history.push('/users', { users })
  }

  const mailCount = () => {
    debugger
    if (friendReqs.length) {
      return <div id='mail-count'>{friendReqs.length}</div>
    }
  }

  return (
    <div className='nav-container'>
      <nav className='navbar-main'>
        <div className='navbar-left'>
          <ul>
            <li className='logo'><span id='one'>Eco</span><span id='two'>Hub</span></li>
            {user &&
              <>
                <li>
                  <NavLink to="/" exact={true} activeClassName="active">
                    <AiTwotoneHome size='30px' />
                  </NavLink>
                </li>
                <li>
                  <form onSubmit={onSearch}>
                    <Input onChange={e => setSearch(e.target.value)}
                      placeholder='search EcoHub users' value={search}></Input>
                  </form>
                </li>
              </>
            }
          </ul>
        </div>
        <div className='navbar-right'>
          <ul>
            {!user &&
              <li>
                <LoginModal />
              </li>
            }
            {!user &&
              <li>
                <SignUpModal />
              </li>
            }
            {user &&
              <>
                <li>
                  <div className='navbar-mail'>
                    <MailPopOver />
                    {friendReqs && mailCount()}
                  </div>
                </li>
                <li>
                  <LogoutButton />
                </li>
              </>
            }
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;