import React, { useContext, useEffect } from 'react';

import noteContext from '../context/notes/noteContext';

 const About = () => {
     const val = useContext(noteContext)
     useEffect(() => {
        val.updateValue();
     })
    return (
        <div>
            About component !!
            {val.state.name} and {val.state.phn}
        </div>
    )
}

export default About