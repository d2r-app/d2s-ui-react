import React, { useEffect, useState } from 'react';
import Items from './Items';
import './d2s-ui.css';
import './d2s-ui-react.css';

const Golem = (props) => {

  const item = props.hero.golem_item;
  const [detailed, setDetailed] = useState(false);

  useEffect(() => {
    document.addEventListener('keydown', detailChange);
    document.addEventListener('keyup', detailChange);
    return () => {
      document.removeEventListener('keydown', detailChange);
      document.removeEventListener('keyup', detailChange);
    }
  }, []);

  const detailChange = (e) => setDetailed(e.ctrlKey);
  const lu = [
    null, 'head', null, 'torso',
    'right_hand', 'left_hand',
  ];
  if (lu[item.equipped_id] ) {
    lu[lu[item.equipped_id]] = item;
  }
  const attrs = { detailed, compact: props.compact };
  const textAttrs = { ...attrs, text: true, items: [item] };
  const imgAttrs = { ...attrs, api: props.api, handleImgReq: props.handleImgReq };

	return (
		<div className={'d2s-hero__component' + (props.compact ? ' d2s-hero__component--compact' : '') + ' d2s-golem'}>
      {props.headerLabel && <div className="d2s-hero__component__name">
        {props.headerLabel}
      </div>}
      {props.text && <div key={item.id}>
        Golem
        <Items {...textAttrs} />
      </div>}
      {!props.text && <div className="inventory">
        <span className="head">
          {lu.head && <Items items={[lu.head]} {...imgAttrs} />}
        </span>
        <span className="torso">
          {lu.torso && <Items items={[lu.torso]} {...imgAttrs} />}
        </span>
        <span className="right-hand weapon">
          {lu.right_hand && <Items items={[lu.right_hand]} {...imgAttrs} />}
        </span>
        <span className="left-hand weapon">
          {lu.left_hand && <Items items={[lu.left_hand]} {...imgAttrs} />}
        </span>
      </div>}
		</div>
	);
};

export default Golem;
