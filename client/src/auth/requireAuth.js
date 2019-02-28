import React from 'react';

export default function(Component) {
  return class Authenticated extends React.Component {
    render() {
      const token = localStorage.getItem('jwt');
      const notAuthorized = 
        <div>
          Please log in to see this content.
        </div>;
      return (
        <>
          {token ?
            <Component {...this.props}></Component>
            : notAuthorized
          }
        </>
      );
    }
  }
}