const unitStats = {
  "Captain": {
    "Unit Class": "Infantry",
    "Movement Range": 12,
    "Inches To Roll": 0.9,
    "Save Requirement": -2,
    "Template": 3,
    "Call to Arms": "Passive boost for units within template #3: -2 to Save Req for all types, -2 to Roll To Hit for infantry, -1 to RTH for heavy weapons(Bazooka, Mortar)."
  },
  "Sergeant": {
    "Unit Class": "Infantry",
    "Movement Range": 15,
    "Inches To Roll": 0.47,
    "Save Requirement": -1,
    "Template": 2,
    "Rally": "Passive boost for units within template #2: -1 to SR for all types, -1 to RTH for infantry",
    "Melee": "Sergeant performs a Melee attack with his bayonet.  The range is 0-5in. Must roll a 3+ to hit"
  },
  "Flamer": {
    "Unit Class": "Infantry",
    "Movement Range": 7.5,
    "Sidearm Inches To Roll": 1,
    "Template": 4,
    "Flame Thrower": "Roll to determine if a Critical Hit or Weapon Jam occurs(rolling 2-19 has no effect on attack). All units within template #4 must roll 16+ to survive."
  },
  "Mortar": {
    "Unit Class": "Heavy Weapons",
    "Movement Range": 5,
    "Inches To Roll": 0.8,
    "Sidearm Inches To Roll": 1,
    "Save Requirement": -1,
    "Offensive Save Requirement": +3,
    "Template": 2,
    "Minimum Range": 15,
    "Minimum Range": "15 inches",
    "Usage": "Each point short of a direct hit is equal to one inch off target up to 8 inches. The direction off target is determined by a D12 roll (or use D20 disregarding rolls over 12).  The roll represents the position on a clock, with the firing unit at 6 o'clock, and the intended target at the center of the clock face.",
    "Uphill Explosive": "If firing at target on lower elevation, measure horizontally to airspace above target to determine range. If firing at target on higher elevation measure directly(diagonally) to determine range (This is to simulate range handicap when firing up-hill).",
    "Barrier Damage": "May destroy a full or partial barrier with a direct hit.  Units taking cover behind or in front of the destroyed barrier, hit by the explosion, gain a bonus of -5 to SR."
  },
  "Bazooka": {
    "Unit Class": "Heavy Weapons",
    "Movement Range": 5,
    "Inches To Roll vs Infantry": 1,
    "Inches To Roll vs Vehicle/Structure": 0.8,
    "Sidearm Inches To Roll": 1,
    "Save Requirement": -1,
    "Offensive Save Requirement": +2,
    "Template": 3,
    "Minimum Range": 10,
    "Minimum Range": "10 inches",
    "Usage": "If firing at target 8 or more inches lower in elevation, each point short of a direct hit is equal to one inch off target up to 8 inches.",
    "Barrier Damage": "-May destroy a full or partial barrier with a DH.  Units taking cover behind the destroyed barrier, within template #3 of the impact point, gain a bonus of -5 to SR from the explosion. Units in front of the barrier within range take full damage."
  },
  "Recon Scout": {
    "Unit Class": "Infantry",
    "Movement Range": 15,
    "Inches To Roll": 1,
    "Save Requirement": -1,
    "Recon": "Passive boost for units within template #2: -1 to RTH for all types.",
    "Spotter": "Using both (2) actions during a turn, the Recon Scout may grant -3 RTH to a single unit within template #3 for it's turn. (This bonus does not stack with the Recon Scout's passive RTH boost)"
  },
  "Engineer": {
    "Unit Class": "Infantry",
    "Movement Range": 7.5,
    "Inches To Roll": 1,
    "Place Mine Strip": "May lay a mine strip anywhere touching the engineer.  Enemy units must roll a 6+ to pass through a mine strip. Each team may have 3 mine strips per game.",
    "Build Full Barrier": "May build one full barrier(square wooden block) up to 5in away. Each engineer may only build one full barrier every 15in.",
    "Build Partial Barrier": "May build one partial barrier (triangular wooden block) up to 5in away.  Each engineer may only build one partial barrier every 15 in.",
    "Relocate Full Barrier": "1 Engineer may use 2 actions or 2 engineers each using 1 action, may move a full barrier within 5in up to 5in from its current position.",
    "Relocate Partial Barrier": "An Engineer may use 1 action to move a partial barrier within 5in up to 5in from its current location",
    "Disarm Mine Strip": "To disarm a mine strip touching the involved Engineer(s), 1 engineer may use 2 actions, or two engineers may use 1 action each.",
    "Zombie Mode": "In Zombie Survival, there is no limit to barrier construction location"
  },
  "Standing Rifelman": {
    "Unit Class": "Infantry",
    "Movement Range": 10,
    "Inches To Roll": 0.8,
    "Grenade Inches To Roll": 0.8,
    "Grenade": "Instead of firing, May  throw a grenade [ITR: 1.0].  Grenades use template #1, and have +1-2 OSR depending on distance from blast point(see template)",
    "Grenade Usage": "When throwing a grenade , each point short of a DH is equal to one point off target up to 5in.  Direction off target determined by D12 roll interpreted as position on a clock, with the Grenade thrower at 6 o’ clock",
    "Uphill Explosive": "If throwing a grenade at target on lower elevation, measure horizontally to airspace above target to determine range, if throwing at target on higher elevation measure directly(diagonally) to determine range."
  },
  "Kneeling Rifleman": {
    "Unit Class": "Infantry",
    "Movement Range": 7.5,
    "Inches To Roll": 0.63,
    "Save Requirement": -1,
    "Mount Up": "When firing over low cover (0.75-1.25 in) ITR becomes 0.53.",
  },
  "Prone Rifleman": {
    "Unit Class": "Infantry",
    "Movement Range": 5,
    "Inches To Roll": 0.53,
    "Save Requirement": -2,
    "Sneak Attack": "Uses 2 actions. There must be no standing or kneeling units within 5 inches. This must be the first time the Prone Rifleman is attacking the target from its current location. Using Sneak Attack causes any Hit to become a Critical Hit."
  },
  "Zombie": {
    "Movement Range": 10,
    "Actions Per Turn": 1,
    "Actions Per Turn When Raged": 2,
    "Max Range": 5,
    "Inches To Roll": 1,
    "Rage": "Zombie will become enraged when it attacks or if it, or another zombie within 5in is attacked (successfully or not)",
    "Jump": "Zombies can jump as far/high as their move distance (into high windows, over obstacles, etc)",
  },
  "Zombie (Crippled)": {
    "Movement Range": 5,
    "Save Requirement": -2,
    "Actions": "2 actions per turn",
    attack: "Must be within 1in to attack, roll for critical and for defender's SR",
    jump: "Cannot climb or jump"
  },
};

export default unitStats;