import React from 'react';
import './Skills.css';

const Skills = (props) => {

  const skills = (props.hero.skills || []).filter(skill => skill.points);
  skills.sort((a, b) => (b.points - a.points) || a.name.localeCompare(b.name));

	return (
		<div className="d2s-hero__component d2s-skills">
      <div className="d2s-skills__header">Skills</div>
      <ul>
        {skills.map(skill => <li key={skill.id}>{skill.points} {skill.name}</li>)}
      </ul>
		</div>
	);
};

export default Skills;
