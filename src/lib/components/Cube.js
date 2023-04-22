import React, { useEffect, useState } from 'react';
import Grid from './Grid';
import Items from './Items';
import './d2s-ui.css';
import './d2s-ui-react.css';

const Cube = (props) => {

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
  const items = props.hero.items.filter(item => item.location_id === 0 && item.alt_position_id === 4);
  const attrs = { items, detailed, compact: props.compact };
  const textAttrs = { ...attrs, text: true };
  const imgAttrs = { ...attrs, api: props.api, handleImgReq: props.handleImgReq };

  return (
    <div className={'d2s-hero__component' + (props.compact ? ' d2s-hero__component--compact' : '') + ' d2s-cube'}>
      {props.headerLabel && <div className="d2s-hero__component__name">
        {props.headerLabel}
      </div>}
      {props.text && <div>
        Cube
        <Items {...textAttrs} />
      </div>}
      {!props.text && <Grid width="3" height="4" {...imgAttrs} />}
    </div>
  );
};

export default Cube;
