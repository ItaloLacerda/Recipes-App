import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Header from '../components/Header';
import Footer from '../components/Footer';
import { renderHeader } from '../redux/actions';
import DoneICON from '../images/icones/Group 10.png';
import FavoriteICON from '../images/icones/Group 9.png';
import LogoutICON from '../images/icones/Group 8.png';
import '../css/profile.css';

class Profile extends React.Component {
  state = {
    email: '',
  };

  componentDidMount() {
    const { updateHeader } = this.props;
    const getUserEmail = localStorage.getItem('user');
    let email = '';
    if (getUserEmail !== null) {
      email = JSON.parse(getUserEmail).email;
    }
    console.log(email);
    this.setState({
      email,
    });
    updateHeader('Profile', true, false);
  }

  handleClick = ({ target }) => {
    const { name } = target;
    const { history } = this.props;
    if (name === 'btnDone') {
      history.push('/done-recipes');
    } else if (name === 'btnFavorite') {
      history.push('/favorite-recipes');
    } else {
      localStorage.clear();
      history.push('/');
    }
  };

  render() {
    const { history } = this.props;
    const { email } = this.state;
    return (
      <>
        <Header history={ history } />
        <div className="profile_container">

          <span className="EMAIL_user" data-testid="profile-email">{ email }</span>

          <button
            className="BTN_profile"
            data-testid="profile-done-btn"
            type="button"
            name="btnDone"
            value="Done Recipes"
            onClick={ this.handleClick }
          >
            <img
              src={ DoneICON }
              alt="Icon Done Recipes"
              name="btnDone"
            />
            Done Recipes
          </button>
          <hr width="290px" />
          <button
            className="BTN_profile"
            data-testid="profile-favorite-btn"
            type="button"
            name="btnFavorite"
            value="Favorite Recipes"
            onClick={ this.handleClick }
          >
            <img src={ FavoriteICON } alt="Icon Favorite" name="btnFavorite" />
            Favorite Recipes
          </button>
          <hr width="290px" />
          <button
            className="BTN_profile"
            data-testid="profile-logout-btn"
            type="button"
            name="btnLogout"
            value="Logout"
            onClick={ this.handleClick }
          >
            <img src={ LogoutICON } alt="Icon Logout" name="btnLogout" />
            Logout
          </button>
        </div>
        <Footer />
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateHeader: (pageTitle, profileIcon, searchIcon) => (
    dispatch(renderHeader(pageTitle, profileIcon, searchIcon))),
});

Profile.propTypes = {
  updateHeader: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Profile);
