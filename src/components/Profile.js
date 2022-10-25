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

<<<<<<< HEAD
function Profile({ updateHeader, history }) {
  useEffect(() => {
    updateHeader('Profile', true, false);
  }, []);
  return (
    <Header history={ history } />
  );
=======
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
>>>>>>> main-group-22
}

Profile.propTypes = {
<<<<<<< HEAD
  updateHeader: PropTypes.func.isRequired,
  history: PropTypes.shape.isRequired,
=======
  history: PropTypes.string.isRequired,
>>>>>>> main-group-22
};

export default Profile;
