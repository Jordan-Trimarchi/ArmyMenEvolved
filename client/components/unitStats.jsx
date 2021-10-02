const unitStats = {
  "Captain": {
    "name": "Captain",
    "Movement Range": 12,
    "Inches To Roll": 0.9,
    "Save Requirement": -2,
    "Template": 3,
    "Unit Class": "Infantry",
    "Call to Arms": "Passive boost for units within template #3: -2 to Save Req for all types, -2 to Roll To Hit for infantry, -1 to RTH for heavy weapons(Bazooka, Mortar)."
  },
  "Sergeant": {
    "name": "Sergeant",
    "Movement Range": 15,
    "Inches To Roll": 0.47,
    "Save Requirement": -1,
    "Template": 2,
    "Unit Class": "Infantry",
    "Rally": "Passive boost for units within template #2: -1 to SR for all types, -1 to RTH for infantry",
    "Melee": "Sergeant performs a Melee attack with his bayonet.  The range is 0-5in. Must roll a 3+ to hit"
  },
  "Flamer": {
    "name": "Flamer",
    "Movement Range": 7.5,
    "Sidearm Inches To Roll": 1,
    "Template": 4,
    "Unit Class": "Heavy Weapons",
    "Flame Thrower": "Roll to determine if a Critical Hit or Weapon Jam occurs(rolling 2-19 has no effect on attack). All units within line of sight and within template #4 must roll 16+ to survive."
  },
  "Mortar": {
    "name": "Mortar",
    "Movement Range": 5,
    "Mortar Inches To Roll": 0.8,
    "Sidearm Inches To Roll": 1,
    "Save Requirement": -1,
    "Offensive Save Requirement": 3,
    "Template": 2,
    "Minimum Range": 15,
    "Unit Class": "Heavy Weapons",
    "Usage": "Each point short of a direct hit is equal to one inch off target up to 8 inches. The direction off target is determined by a D12 roll (or use D20 disregarding rolls over 12).  The roll represents the position on a clock, with the firing unit at 6 o'clock, and the intended target at the center of the clock face.",
    "Ignores target cover": "Mortar fires downward onto a target. Overhead cover is considered as the mortar round will hit the cover instead of hitting the target, in which case, see 'Barrier Damage' below.",
    "Account for Elevation": "If firing at target on lower elevation, measure horizontally to airspace above target to determine range. If firing at target on higher elevation measure directly(diagonally) to determine range (This is to simulate range handicap when firing up-hill).",
    "Barrier Damage": "May destroy a full or partial barrier with a direct hit.  Units taking cover behind, in front of, or below the destroyed barrier, within template #2 of the impact point, gain a bonus of -5 to SR (for a total of -2 after Mortar's +3 OSR). Units taking cover on top of the barrier take full damage."
  },
  "Bazooka": {
    "name": "Bazooka",
    "Movement Range": 5,
    "Inches To Roll vs Infantry": 1,
    "Inches To Roll vs Vehicle/Structure": 0.8,
    "Sidearm Inches To Roll": 1,
    "Save Requirement": -1,
    "Offensive Save Requirement": 2,
    "Template": 3,
    "Unit Class": "Heavy Weapons",
    "Minimum Range": 10,
    "Account for Elevation": "If the Bazooka's elevation advantage is greater than half of the distance to target, each point short of a direct hit is equal to one inch off target up to 8 inches.",
    "Barrier Damage": "May destroy a full or partial barrier with a direct hit.  Units taking cover behind, on top of, or below the destroyed barrier, within template #3 of the impact point, gain a bonus of -5 to SR (for a total of -3 after Bazooka's +2 OSR) from the explosion. Units in front of the barrier within range take full damage."
  },
  "Recon Scout": {
    "name": "Recon Scout",
    "Movement Range": 15,
    "Inches To Roll": 1,
    "Save Requirement": -1,
    "Unit Class": "Infantry",
    "Recon": "Passive boost for units within template #2: -1 to RTH for all types.",
    "Spotter": "Using 2 actions, the Recon Scout may grant -3 RTH to a single unit within template #3 for its upcoming turn. (This bonus does not stack with the Recon Scout's passive RTH boost)."
  },
  "Engineer": {
    "name": "Engineer",
    "Movement Range": 7.5,
    "Inches To Roll": 1,
    "Unit Class": "Infantry",
    "Place Mine Strip": "May lay a mine strip anywhere touching the engineer.  Enemy units must roll a 6+ to pass through a mine strip. Each team may have 3 mine strips per game.",
    "Build Full Barrier": "May build one full barrier(square wooden block) up to 5in away. Each engineer may only build one full barrier every 15in.",
    "Build Partial Barrier": "May build one partial barrier (triangular wooden block) up to 5in away.  Each engineer may only build one partial barrier every 15 in.",
    "Relocate Full Barrier": "1 Engineer may use 2 actions or 2 engineers each using 1 action, may move a full barrier within 5in up to 5in from its current position.",
    "Relocate Partial Barrier": "An Engineer may use 1 action to move a partial barrier within 5in up to 5in from its current location.",
    "Disarm Mine Strip": "To disarm a mine strip touching the involved Engineer(s), 1 engineer may use 2 actions, or two engineers may use 1 action each.",
    "Zombie Mode": "In Zombie Survival, there is no limit to barrier construction location."
  },
  "Standing Rifleman": {
    "name": "Standing Rifleman",
    "Movement Range": 10,
    "Inches To Roll": 0.8,
    "Grenade Inches To Roll": 1,
    "Grenade OSR": 2, 
    "Unit Class": "Infantry",
    "Grenade": "Instead of firing, may  throw a grenade [ITR: 1.0].  Grenades use template #1, and has +2 Offensive Save Requirement.", 
    "Grenade Usage": "When throwing a grenade , each point short of a DH is equal to one point off target up to 5in.  Direction off target determined by D12 roll interpreted as position on a clock, with the Grenade thrower at 6 o’ clock.",
    "Uphill Explosive": "If throwing a grenade at target on lower elevation, measure horizontally to airspace above target to determine range, if throwing at target on higher elevation measure directly(diagonally) to determine range."
  },
  "Kneeling Rifleman": {
    "name": "Kneeling Rifleman",
    "Movement Range": 7.5,
    "Inches To Roll": 0.63,
    "Save Requirement": -1,
    "Unit Class": "Infantry",
    "Mount Up": "When firing over low cover (0.75-1.25 in) ITR becomes 0.53.",
  },
  "Prone Rifleman": {
    "name": "Prone Rifleman",
    "Movement Range": 5,
    "Inches To Roll": 0.53,
    "Save Requirement": -2,
    "Unit Class": "Infantry",
    "Sneak Attack": "Uses 2 actions. There must be no standing or kneeling units within 5 inches. This must be the first time the Prone Rifleman is attacking the target from its current location. Using Sneak Attack causes any Hit to become a Critical Hit."
  }, 
  "Zombie": {
    "name": "Zombie",
    "Movement Range": 10,
    "Actions Per Turn": 1,
    "Actions Per Turn When Raged": 2,
    "Max Range": 5,
    "Inches To Roll": 1,
    "Rage": "Zombie will become enraged when it attacks or if it, or another zombie within 5in is attacked (successfully or not).",
    "Jump": "Zombies can jump as far/high as their move distance (into high windows, over obstacles, etc).",
  },
  "Zombie (Crippled)": {
    "name": "Zombie (Crippled)",
    "Movement Range": 5,
    "Save Requirement": -2,
    "Actions": "2 actions per turn.",
    Attack: "Must be within 1in to attack, roll for critical and for defender's SR.",
    Jump: "Cannot climb or jump."
  },
};

export default unitStats;