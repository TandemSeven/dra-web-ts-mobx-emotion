import React from 'react';

// must exist to use the HOC in a type-safe'ish way to
// control JSS injection point in HTML <head>
declare class JssProvider extends React.Component<any, any> { 
}

export default JssProvider;
