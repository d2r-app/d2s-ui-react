import React, { useState } from 'react';
import Cube from './Cube';
import Equipped from './Equipped';
import Golem from './Golem';
import Inventory from './Inventory';
import Mercenary from './Mercenary';
import Skills from './Skills';
import Stash from './Stash';
import Stats from './Stats';
import Text from './Text';
import './d2s-ui-react.css';
import './Hero.css';

const Hero = (props) => {

  const hero = props.hero || {};
  const compact = props.compact;
  const api = props.api;
  const handleImgReq = props.handleImgReq;
  const showImages = api || handleImgReq;
  const [altDisplayed, setAltDisplayed] = useState(false);
  const [section, setSection] = useState(showImages ? 'hero' : 'text');
  const sectionAttrs = { hero, compact, api, handleImgReq, altDisplayed, setAltDisplayed };
  const changeSection = (section) => {
    setSection(section);
    if (props.onSectionChange) {
      props.onSectionChange(section);
    }
  };

  return (
    <div className={`d2s-hero` + (compact ? ' d2s-hero--compact' : '')}>
      {hero.err && <div className="red d2s-hero__err">{hero.err}</div>}
      {hero.msg && <div className="d2s-hero__msg">{hero.msg}</div>}
      {hero.header?.name && <div>
        {compact && <Stats {...sectionAttrs} filterFn={(id) => id === 'header'} />}
        {!compact && <div className="d2s-hero__section">
          <Stats {...sectionAttrs} />
        </div>}
        <div className="d2s-hero__section">
          <div className="d2s-hero__menu">
            {showImages && <button className="d2s-hero__menu__btn" onClick={() => changeSection('hero')}>Hero</button>}
            {showImages && <button className="d2s-hero__menu__btn" onClick={() => changeSection('storage')}>Storage</button>}
            {showImages && <button className="d2s-hero__menu__btn" onClick={() => changeSection('merc')}>Mercenary</button>}
            <button className="d2s-hero__menu__btn" onClick={() => changeSection('text')}>{showImages ? 'Text' : 'Items'}</button>
            {props.onClose && <button className="d2s-hero__menu__btn d2s-hero__menu__close" onClick={props.onClose}>x</button>}
          </div>
          {section === 'hero' && <div>
            <Equipped {...sectionAttrs} />
            <Inventory {...sectionAttrs} />
            {compact && <div>
              <Stats {...sectionAttrs} filterFn={(id) => id !== 'header'} />
            </div>}
            <Skills hero={hero} headerLabel="Skills" />
          </div>}
          {section === 'storage' && <div>
            <Stash {...sectionAttrs} />
            <Cube {...sectionAttrs} />
          </div>}
          {section === 'merc' && <div>
            <Mercenary {...sectionAttrs} />
            {hero.golem_item && <Golem {...sectionAttrs} headerLabel="Golem" />}
          </div>}
          {section === 'text' && <div>
            <Text {...sectionAttrs} />
          </div>}
        </div>
      </div>}
    </div>
  );
};

export default Hero;
