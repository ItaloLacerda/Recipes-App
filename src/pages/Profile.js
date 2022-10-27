import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Header from '../components/Header';
import Footer from '../components/Footer';
import { renderHeader } from '../redux/actions';

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
    const { value } = target;
    const { history } = this.props;
    if (value === 'Done Recipes') {
      history.push('/done-recipes');
    } else if (value === 'Favorite Recipes') {
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
        <div>

          <span data-testid="profile-email">{ email }</span>

          <button
            data-testid="profile-done-btn"
            type="button"
            value="Done Recipes"
            onClick={ this.handleClick }
          >
            Done Recipes
          </button>
          <button
            data-testid="profile-favorite-btn"
            type="button"
            value="Favorite Recipes"
            onClick={ this.handleClick }
          >
            Favorite Recipes
          </button>
          <button
            data-testid="profile-logout-btn"
            type="button"
            value="Logout"
            onClick={ this.handleClick }
          >
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
