import { PropTypes } from 'react';

const userTypes = {
  valueLink: PropTypes.shape({
    value: PropTypes.any.isRequired,
    requestChange: PropTypes.func.isRequired
  })
};

export default userTypes;
