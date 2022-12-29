import React, { useState } from 'react';
import Cube from './Cube';
import Equipped from './Equipped';
import Golem from './Golem';
import Inventory from './Inventory';
import Mercenary from './Mercenary';
import Stash from './Stash';
import Stats from './Stats';
import Text from './Text';
import './Hero.css';

const Hero = (props) => {

  const hero = props.hero || {};
  const api = props.api;
  const handleImgReq = props.handleImgReq;
  const showImages = api || handleImgReq;
  const [section, setSection] = useState(showImages ? 'hero' : 'text');
  const sectionAttrs = { hero, api, handleImgReq };

  return (
    <div className="d2s-hero">
      {hero.err && <div className="red d2s-hero__err">{hero.err}</div>}
      {hero.msg && <div className="d2s-hero__msg">{hero.msg}</div>}
      {hero.header?.name && <div>
        <div className="d2s-hero__section">
          <Stats hero={hero} />
        </div>
        <div className="d2s-hero__section">
          <div className="d2s-hero__menu">
            {showImages && <button className="d2s-hero__menu__btn" onClick={() => setSection('hero')}>Hero</button>}
            {showImages && <button className="d2s-hero__menu__btn" onClick={() => setSection('storage')}>Storage</button>}
            {showImages && <button className="d2s-hero__menu__btn" onClick={() => setSection('merc')}>Mercenary</button>}
            <button className="d2s-hero__menu__btn" onClick={() => setSection('text')}>{showImages ? 'Text' : 'Items'}</button>
            {props.onClose && <button className="d2s-hero__menu__btn d2s-hero__menu__close" onClick={props.onClose}>x</button>}
          </div>
          {section === 'hero' && <div>
            <Equipped {...sectionAttrs} />
            <Inventory {...sectionAttrs} />
            {hero.golem_item && <Golem {...sectionAttrs} />}
          </div>}
          {section === 'storage' && <div>
            <Stash {...sectionAttrs} />
            <Cube {...sectionAttrs} />
          </div>}
          {section === 'merc' && <div>
            <Mercenary {...sectionAttrs} />
          </div>}
          {section === 'text' && <div>
            <Text hero={hero} />
          </div>}
        </div>
      </div>}
    </div>
  );
};

export default Hero;
