import React from 'react';

import { CivicStoryCard, Placeholder } from '@hackoregon/component-library';

export class VulnerableStudentPopulations extends React.Component {
  componentDidMount() {
    // initialize data here
  }

  render() {
    return (
      <CivicStoryCard
        title="Vulnerable Student Populations"
        slug="vulnerable-student-populations"
      >
        <Placeholder issue="228"/>
      </CivicStoryCard>
    );
  }
}

VulnerableStudentPopulations.displayName = 'VulnerableStudentPopulations';

// Connect this to the redux store when necessary
export default VulnerableStudentPopulations;
