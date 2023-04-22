import React from 'react';
import Cube from './Cube';
import Equipped from './Equipped';
import Golem from './Golem';
import Inventory from './Inventory';
import Mercenary from './Mercenary';
import Stash from './Stash';
import './d2s-ui-react.css';
import './Text.css';

const Text = (props) => {

  const hero = props.hero;

  return (
    <div className={'d2s-hero__component' + (props.compact ? ' d2s-hero__component--compact' : '') + ' d2s-text'}>
      <Equipped hero={hero} text={true} />
      <Inventory hero={hero} text={true} />
      {hero.golem_item && <Golem hero={hero} text={true} />}
      <Stash hero={hero} text={true} />
      <Cube hero={hero} text={true} />
      {hero.header?.merc_id && <Mercenary hero={hero} text={true} />}
    </div>
  );
};

export default Text;
