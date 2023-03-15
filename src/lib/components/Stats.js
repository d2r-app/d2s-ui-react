import React, { useEffect, useState } from 'react';
import './Stats.css';

const Stats = (props) => {

  const hero = props.hero;
  const { attributes, header, skills } = { ...hero };
  const [sections, setSections] = useState([]);


  // On load
  useEffect(() => {

    // Define helper functions
    const getValue = (key) => overrides[key] || attributes[key] || bonuses[key] || 0;
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

    // Get equipped hero items
    let items = (hero.is_dead ? hero.corpse_items : hero.items).filter(item => {
      if (item.location_id !== 1) {
        return false;
      }
      if ((item.equipped_id === 4 || item.equipped_id === 5) && props.altDisplayed) {
        return false;
      }
      if ((item.equipped_id === 11 || item.equipped_id === 12) && !props.altDisplayed) {
        return false;
      }
      return true;
    });

    // Include charms from inventory
    items = [...items, ...hero.items.filter(item => /^cm(1|2|3)$/.test(item.type))];

    // Total bonuses, build lookup
    // NOTE:
    //  Totaling values from hero.item_bonuses directly provides incorrect results (e.g. resists, item_magicbonus, item_goldbonus)
    //  Instead, use values from each item's displayed_combined_magic_attributes
    const bonuses = { strength: 0, dexterity: 0, vitality: 0, energy: 0, item_allskills: 0 };
    const getBonusFromDescription = (desc = '', regex) => {
      const matches = desc.toString().match(regex);
      if (matches && matches[1]) {
        return parseInt(matches);
      }
      return 0;
    };
    items.forEach(item => {
      item.displayed_combined_magic_attributes.forEach(bonus => {
        let name, value = getBonusFromDescription(bonus.description, /^(\d+)% Better Chance of Getting Magic Items$/);
        if (value) {
          name = 'item_magicbonus';
        }
        else {
          value = getBonusFromDescription(bonus.description, /^(\d+)% Extra Gold from Monsters$/);
          if (value) {
            name = 'item_goldbonus';
          }
        }
        // Generic values, calculated OP value takes precedence
        if (!name) {
          name = bonus.name;
          if (bonus.op_value) {
            value = bonus.op_value;
          }
          else if (Array.isArray(bonus.values) && bonus.values.length) {
            // Values are either [singular] or [min, max]
            value = bonus.values[bonus.values.length - 1];
          }
        }
        // Add value to bonus lookup
        bonuses[name] = (bonuses[name] || 0) + value;
      });
    });

    // Total max HP and MP
    // NOTE: Existing attributes for max_hp/max_mana are not correct
    const overrides = { max_hp: 0, max_mana: 0 };
    const classes = {
      Amazon: {
        max_hp: { start: 50, startPoints: 20, perPoint: 3, perLevel: 2 },
        max_mana: { start: 15, startPoints: 15, perPoint: 1.5, perLevel: 1.5 }
      },
      Assassin: {
        max_hp: { start: 50, startPoints: 20, perPoint: 3, perLevel: 2 },
        max_mana: { start: 25, startPoints: 25, perPoint: 1.75, perLevel: 1.5 }
      },
      Barbarian: {
        max_hp: { start: 55, startPoints: 25, perPoint: 4, perLevel: 2 },
        max_mana: { start: 10, startPoints: 10, perPoint: 1, perLevel: 1 }
      },
      Druid: {
        max_hp: { start: 55, startPoints: 25, perPoint: 2, perLevel: 1.5 },
        max_mana: { start: 20, startPoints: 20, perPoint: 2, perLevel: 2 }
      },
      Necromancer: {
        max_hp: { start: 45, startPoints: 15, perPoint: 2, perLevel: 1.5 },
        max_mana: { start: 25, startPoints: 25, perPoint: 2, perLevel: 2 }
      },
      Paladin: {
        max_hp: { start: 55, startPoints: 25, perPoint: 3, perLevel: 2 },
        max_mana: { start: 15, startPoints: 15, perPoint: 1.5, perLevel: 1.5 }
      },
      Sorceress: {
        max_hp: { start: 40, startPoints: 10, perPoint: 2, perLevel: 1 },
        max_mana: { start: 35, startPoints: 35, perPoint: 2, perLevel: 2 }
      }
    };
    [
      { key: 'max_hp', attrKey: 'vitality', bonusKey: 'maxhp' },
      { key: 'max_mana', attrKey: 'energy', bonusKey: 'maxmana' }
    ].forEach(override => {
      const { key, attrKey, bonusKey } = { ...override };
      const info = classes[header.class] ? classes[header.class][key] : null;
      if (info) {
        overrides[key] = info.start;
        overrides[key] += info.perLevel * (header.level - 1);
        overrides[key] += info.perPoint * (attributes[attrKey] + bonuses[attrKey] - info.startPoints);
        overrides[key] += (bonuses[bonusKey] || 0);
        if (key === 'max_hp') {
          if (header.quests_normal?.act_iii?.the_golden_bird?.is_completed) {
            overrides[key] += 20;
          }
          if (header.quests_nm?.act_iii?.the_golden_bird?.is_completed) {
            overrides[key] += 20;
          }
          if (header.quests_hell?.act_iii?.the_golden_bird?.is_completed) {
            overrides[key] += 20;
          }
        }
        overrides[key] = Math.floor(overrides[key]);
      }
    });

    // Total defenses
    overrides.defense = (getValue('dexterity') + bonuses.dexterity) / 4;
    items.filter(item => item.equipped_id).forEach(item => {
      let defense = item.defense_rating;
      if (!defense) {
        return;
      }
      const edPct = item.displayed_combined_magic_attributes.filter(attr => attr.name === 'item_armor_percent')[0];
      if (edPct) {
        defense *= (edPct.values[0] / 100 + 1);
      }
      const ed = item.displayed_combined_magic_attributes.filter(attr => attr.name === 'armorclass')[0];
      if (ed) {
        defense += ed.values[0];
      }
      overrides.defense += defense;
    });
    overrides.defense = Math.floor(overrides.defense);

    // Total increased elemental damage/pierce
    overrides.passive_fire_mastery = bonuses.passive_fire_mastery || 0;
    overrides.passive_ltng_mastery = bonuses.passive_ltng_mastery || 0;
    overrides.passive_cold_mastery = bonuses.passive_cold_mastery || 0;
    overrides.passive_pois_mastery = bonuses.passive_pois_mastery || 0;
    overrides.passive_fire_pierce = bonuses.passive_fire_pierce || 0;
    overrides.passive_ltng_pierce = bonuses.passive_ltng_pierce || 0;
    overrides.passive_cold_pierce = bonuses.passive_cold_pierce || 0;
    overrides.passive_pois_pierce = bonuses.passive_pois_pierce || 0;
    if (header.class === 'Sorceress') {
      let skill = skills.filter(skill => skill.name === 'Fire Mastery')[0];
      if (skill && skill.points) {
        overrides.passive_fire_mastery += (skill.points + bonuses.item_allskills +  - 1) * 7 + 30;
      }
      skill = skills.filter(skill => skill.name === 'Lightning Mastery')[0];
      if (skill && skill.points) {
        overrides.passive_ltng_mastery += (skill.points + bonuses.item_allskills +  - 1) * 12 + 50;
      }
      skill = skills.filter(skill => skill.name === 'Cold Mastery')[0];
      if (skill && skill.points) {
        overrides.passive_cold_pierce += (skill.points + bonuses.item_allskills +  - 1) * 5 + 20;
      }
    }

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
          newItem(7, {
            label: 'Strength',
            value: getValue('strength') + bonuses.strength,
            value2: bonuses.strength ? ` (${getValue('strength')})` : '',
            cls2: 'd2s-stats__item__paren'
          }),
          newItem(5, {
            label: 'Health',
            value: getValue('current_hp'),
            value2: getValue('current_hp') !== getValue('max_hp') ? ' (' + getValue('max_hp')  + ')' : '',
            cls2: 'd2s-stats__item__paren'
          })
        ],
        [
          newItem(7, {
            label: 'Dexterity',
            value: getValue('dexterity') + bonuses.dexterity,
            value2: bonuses.dexterity ? ` (${getValue('dexterity')})` : '',
            cls2: 'd2s-stats__item__paren'
          }),
          newItem(5, {
            label: 'Mana',
            value: getValue('current_mana'),
            value2: getValue('current_mana') !== getValue('max_mana') ? ' (' + getValue('max_mana') + ')' : '',
            cls2: 'd2s-stats__item__paren'
          })
        ],
        [
          newItem(7, {
            label: 'Vitality',
            value: getValue('vitality') + bonuses.vitality,
            value2: bonuses.vitality ? ` (${getValue('vitality')})`: '',
            cls2: 'd2s-stats__item__paren'
          }),
          newItem(5, { label: 'Damage to Mana', value: getValue('item_damagetomana'), units: '%' })
        ],
        [
          newItem(7, {
            label: 'Energy',
            value: getValue('energy') + bonuses.energy,
            value2: bonuses.energy ? ` (${getValue('energy')})` : '',
            cls2: 'd2s-stats__item__paren'
          }),
          newItem(5, { label: 'Defense', value: getValue('defense').toLocaleString() })
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
          newItem(7, { label: 'Experience', value: getValue('experience').toLocaleString() }),
          newItem(5, { label: 'Gold Find', value: getValue('item_goldbonus') })
        ],
        [
          newItem(7, { label: 'Updated', value: new Date(header.last_played * 1000).toLocaleString() }),
          newItem(5, { label: 'Magic Find', value: getValue('item_magicbonus') })
        ]
      ]
    ]);
  }, [hero, attributes, header, skills, props.altDisplayed]);

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
