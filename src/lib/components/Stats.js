import React, { useEffect, useState } from 'react';
import './Stats.css';

const Stats = (props) => {

  const hero = props.hero;
  const { attributes, header, item_bonuses, items } = { ...hero };
  const [sections, setSections] = useState([]);

  // On load
  useEffect(() => {

    // Total bonuses, build lookup
    const bonuses = {};
    item_bonuses.forEach(bonus => {
      let value = 0;
      bonus.values.forEach(v => value += v);
      bonuses[bonus.name] = value;
    });
    bonuses.strength = bonuses.strength || 0;
    bonuses.dexterity = bonuses.dexterity || 0;
    bonuses.vitality = bonuses.vitality || 0;
    bonuses.energy = bonuses.energy || 0;

    // Total defenses
    let defense = 0;
    let altDefense = 0;
    items.filter(item => item.equipped_id).forEach(item => {
      if (item.equipped_id === 4 || item.equipped_id === 5) {
        defense += item.defense_rating || 0;
      }
      else if (item.equipped_id === 11 || item.equipped_id === 12) {
        altDefense += item.defense_rating || 0;
      }
      else {
        defense += item.defense_rating || 0;
        altDefense += item.defense_rating || 0;
      }
    });

    // Define helper functions
    const getValue = (key) => attributes[key] || bonuses[key] || 0;
    const getResist = (key, difficulty) => {
      let val = bonuses[`${key}resist`] || 0;
      if (header.quests_normal?.act_v?.prison_of_ice?.consumed_scroll) {
        val += 10;
      }
      if (header.quests_nm?.act_v?.prison_of_ice?.consumed_scroll) {
        val += 10;
      }
      if (header.quests_hell?.act_v?.prison_of_ice?.consumed_scroll) {
        val += 10;
      }
      const exp = header.status.expansion;
      if (difficulty === 'hell') {
        return val - (exp ? 100 : 50);
      }
      else if (difficulty === 'nm') {
        return val - (exp ? 40 : 20);
      }
      return val;
    }
    const getMaxResist = (key) => 75 + (bonuses[`max${key}resist`] || 0);
    const getAbsorb = (key, pct) => bonuses[`item_absorb${key}` + (pct ? '_percent' : '')] || 0;

    // Dynamic info items are type/mod/status, e.g. LoD hardcore/A Mod/Alive, but only show when necessary and are bottom justified
    const getInfoItem = (num) => {
      let item = newItem(5);
      if (!header.status) {
        return item;
      }
      const hardcore = header.status.hardcore;
      const type = {
        value: (header.status.expansion ? 'LoD' : 'Classic') + (hardcore ? ' hardcore' : ' softcore'),
        cls: 'd2s-stats__item__label'
      };
      const mod = { label: 'Mod', value: hero.mod };
      const status = { label: 'Status', value: hero.is_dead ? 'Dead' : 'Alive' };
      if (num === 1) {
        if (hero.mod && hardcore) {
          item = { ...item, ...type };
        }
      }
      else if (num === 2) {
        if (hero.mod && hardcore) {
          item = { ...item, ...mod };
        }
        else if (hero.mod || hardcore) {
          item = { ...item, ...type };
        }
      }
      else if (num === 3) {
        if (hardcore) {
          item = { ...item, ...status };
        }
        else if (hero.mod) {
          item = { ...item, ...mod };
        }
        else {
          item = { ...item, ...type };
        }
      }
      return item;
    };

    // Build sections
    const newItem = (flex, item = {}) => ({ style: { flex: flex }, ...item });
    setSections([
      // Character info, dynamic items are type/mod/status
      [
        [newItem(7, { label: 'Name', value: header.name }), getInfoItem(1)],
        [newItem(7, { label: 'Level', value: header.level }), getInfoItem(2)],
        [newItem(7, { label: 'Class', value: header.class }), getInfoItem(3)]
      ],
      // Base stats
      [
        [
          newItem(7, { label: 'Strength', value: getValue('strength'), value2: ` (${bonuses.strength})`, cls2: 'd2s-stats__item__paren' }),
          newItem(5, { label: 'Health', value: getValue('max_hp') || 0, value2: ' (' + getValue('current_hp')  + ')', cls2: 'd2s-stats__item__paren' })
        ],
        [
          newItem(7, { label: 'Dexterity', value: getValue('dexterity'), value2: ` (${bonuses.dexterity})`, cls2: 'd2s-stats__item__paren' }),
          newItem(5, { label: 'Mana', value: getValue('max_mana') || 0, value2: ' (' + getValue('current_mana') + ')', cls2: 'd2s-stats__item__paren' })
        ],
        [
          newItem(7, { label: 'Vitality', value: getValue('vitality'), value2: ` (${bonuses.vitality})`, cls2: 'd2s-stats__item__paren' }),
          newItem(5, { label: 'Damage to Mana', value: getValue('item_damagetomana'), units: '%' })
        ],
        [
          newItem(7, { label: 'Energy', value: getValue('energy'), value2: ` (${bonuses.energy})`, cls2: 'd2s-stats__item__paren' }),
          newItem(5, { label: 'Defense', value: defense, value2: `, ${altDefense}` })
        ]
      ],
      // Resist/absorb/dr
      [
        [
          newItem(7, {
            label: 'Fire Resist',
            value: getResist('fire'), cls: 'red', divider: ' / ',
            value2: getResist('fire', 'nm'), cls2: 'red', divider2: ' / ',
            value3: getResist('fire', 'hell'), cls3: 'red', divider3: ' ',
            value4: '(' + getMaxResist('fire') + ')', cls4: 'd2s-stats__item__paren'
          }),
          newItem(5, {
            label: 'Fire Absorb',
            value: getAbsorb('fire'), cls: 'red', divider: ', ',
            value2: getAbsorb('fire', true), cls2: 'red', units2: '%'
          })
        ],
        [
          newItem(7, {
            label: 'Cold Resist',
            value: getResist('cold'), cls: 'blue', divider: ' / ',
            value2: getResist('cold', 'nm'), cls2: 'blue', divider2: ' / ',
            value3: getResist('cold', 'hell'), cls3: 'blue', divider3: ' ',
            value4: '(' + getMaxResist('cold') + ')', cls4: 'd2s-stats__item__paren'
          }),
          newItem(5, {
            label: 'Cold Absorb',
            value: getAbsorb('cold'), cls: 'blue', divider: ', ',
            value2: getAbsorb('cold', true), cls2: 'blue', units2: '%'
          })
        ],
        [
          newItem(7, {
            label: 'Lightning Resist',
            value: getResist('light'), cls: 'yellow', divider: ' / ',
            value2: getResist('light', 'nm'), cls2: 'yellow', divider2: ' / ',
            value3: getResist('light', 'hell'), cls3: 'yellow', divider3: ' ',
            value4: '(' + getMaxResist('light') + ')', cls4: 'd2s-stats__item__paren'
          }),
          newItem(5, {
            label: 'Lightning Absorb',
            value: getAbsorb('light'), cls: 'yellow', divider: ', ',
            value2: getAbsorb('light', true), cls2: 'yellow', units2: '%'
          })
        ],
        [
          newItem(7, {
            label: 'Poison Resist',
            value: getResist('poison'), cls: 'green', divider: ' / ',
            value2: getResist('poison', 'nm'), cls2: 'green', divider2: ' / ',
            value3: getResist('poison', 'hell'), cls3: 'green', divider3: ' ',
            value4: '(' + getMaxResist('poison') + ')', cls4: 'd2s-stats__item__paren'
          }),
          newItem(5)
        ],
        [
          newItem(7, { label: 'Magic Resist', value: getResist('magic'), cls: 'orange' }),
          newItem(5, { label: 'Magic Absorb', value: getAbsorb('magic'), cls: 'orange' })
        ],
        [
          newItem(7, { label: 'Magic Damage Reduction', value: getValue('magic_damage_reduction') }),
          newItem(5, {
            label: 'Damage Reduction',
            value: bonuses.normal_damage_reduction || 0,
            divider: ', ',
            value2: bonuses.damageresist || 0,
            units2: '%'
          })
        ]
      ],
      // Offense/breakpoints
      [
        [
          newItem(7, { label: 'Faster Cast Rate', value: getValue('item_fastercastrate') }),
          newItem(5, { label: 'Pierce Chance', value: getValue('item_pierce') })
        ],
        [
          newItem(7, { label: 'Faster Block Rate', value: getValue('item_fasterblockrate') }),
          newItem(5, { label: 'Crushing Blow', value: getValue('item_crushingblow') })
        ],
        [
          newItem(7, { label: 'Faster Hit Recovery', value: getValue('item_fastergethitrate') }),
          newItem(5, { label: 'Deadly Strike', value: getValue('item_deadlystrike') })
        ],
        [
          newItem(7, { label: 'Faster Run/Walk', value: getValue('item_fastermovevelocity') }),
          newItem(5, { label: 'Critical Strike', value: getValue('item_criticalstrike') })
        ],
        [
          newItem(7, { label: 'Increased Attack Speed', value: getValue('item_fasterattackrate') }),
          newItem(5, { label: 'Open Wounds', value: getValue('item_openwounds') })
        ]
      ],
      // Sustain
      [
        [
          newItem(7, { label: 'Life Leech', value: getValue('lifedrainmindam') }),
          newItem(5, { label: 'Mana Leech', value: getValue('manadrainmindam') })
        ]
      ],
      // Elemental
      [
        [
          newItem(7, { label: 'Inc. Fire Damage', value: getValue('passive_fire_mastery'), units: '%', cls: 'red' }),
          newItem(5, { label: 'Fire Pierce', value: getValue('passive_fire_pierce'), units: '%', cls: 'red' })
        ],
        [
          newItem(7, { label: 'Inc. Cold Damage', value: getValue('passive_cold_mastery'), units: '%', cls: 'blue' }),
          newItem(5, { label: 'Cold Pierce', value: getValue('passive_cold_pierce'), units: '%', cls: 'blue' })
        ],
        [
          newItem(7, { label: 'Inc. Lightning Damage', value: getValue('passive_ltng_mastery'), units: '%', cls: 'yellow' }),
          newItem(5, { label: 'Lightning Pierce', value: getValue('passive_ltng_pierce'), units: '%', cls: 'yellow' })
        ],
        [
          newItem(7, { label: 'Inc. Poison Damage', value: getValue('passive_poison_mastery'), units: '%', cls: 'green' }),
          newItem(5, { label: 'Poison Pierce', value: getValue('passive_poison_pierce'), units: '%', cls: 'green' })
        ]
      ],
      // Adventure
      [
        [
          newItem(7, { label: 'Experience', value: getValue('experience') }),
          newItem(5, { label: 'Gold Find', value: getValue('item_goldbonus') })
        ],
        [
          newItem(7, { label: 'Updated', value: new Date(header.last_played * 1000).toLocaleString() }),
          newItem(5, { label: 'Magic Find', value: getValue('item_magicbonus') })
        ]
      ]
    ]);
  }, [
      attributes, header.class, header.last_played, header.level, header.name, header.status, hero.is_dead, hero.mod, item_bonuses, items,
      header.quests_normal?.act_v?.prison_of_ice?.consumed_scroll,
      header.quests_nm?.act_v?.prison_of_ice?.consumed_scroll,
      header.quests_hell?.act_v?.prison_of_ice?.consumed_scroll
  ]);

	return (
		<div className="d2s-hero__component d2s-stats">
      {sections.map((rows, index) => <div key={index} className="d2s-stats__section">
        {rows.map((items, index) => <div key={index} className="d2s-stats__row">
          {items.map((item, index) => <div key={index}  className="d2s-stats__item" style={item.style || {}}>
            {item.label && <span className="d2s-stats__item__label">{item.label}:&nbsp;</span>}
            {typeof item.value !== 'undefined' && <span>
              <span className={'d2s-stats__item__value' + item.cls ? ` ${item.cls}` : ''}>{item.value}</span>
              <span className="d2s-stats__item__units">{item.units}</span>
            </span>}
            {item.divider && <span>{item.divider}</span>}
            {typeof item.value2 !== 'undefined' && <span>
              <span className={'d2s-stats__item__value' + item.cls2 ? ` ${item.cls2}` : ''}>{item.value2}</span>
              <span className="d2s-stats__item__units">{item.units2}</span>
            </span>}
            {item.divider2 && <span>{item.divider2}</span>}
            {typeof item.value3 !== 'undefined' && <span>
              <span className={'d2s-stats__item__value' + item.cls3 ? ` ${item.cls3}` : ''}>{item.value3}</span>
              <span className="d2s-stats__item__units">{item.units3}</span>
            </span>}
            {item.divider3 && <span>{item.divider3}</span>}
            {typeof item.value4 !== 'undefined' && <span>
              <span className={'d2s-stats__item__value' + item.cls4 ? ` ${item.cls4}` : ''}>{item.value4}</span>
              <span className="d2s-stats__item__units">{item.units4}</span>
            </span>}
          </div>)}
        </div>)}
      </div>)}
		</div>
	);
};

export default Stats;
