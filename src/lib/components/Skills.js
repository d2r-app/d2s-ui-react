import React from 'react';
import './d2s-ui-react.css';
import './Skills.css';

const Skills = (props) => {

  const skills = (props.hero.skills || []).filter(skill => skill.points);
  skills.sort((a, b) => (b.points - a.points) || a.name.localeCompare(b.name));

  return (
    <div className={'d2s-hero__component' + (props.compact ? ' d2s-hero__component--compact' : '') + ' d2s-skills'}>
      {props.headerLabel && <div className="d2s-hero__component__name">
        {props.headerLabel}
      </div>}
      <ul>
        {skills.map(skill => <li key={skill.id}>{skill.points} {skill.name}</li>)}
      </ul>
    </div>
  );
};

export default Skills;
