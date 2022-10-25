import React from 'react';
import PropTypes from 'prop-types';

class Profile extends React.Component {
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
    return (
      <div>
        <span data-testid="profile-email">EMAIL</span>
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
    );
  }
}

Profile.propTypes = {
  history: PropTypes.string.isRequired,
};

export default Profile;
