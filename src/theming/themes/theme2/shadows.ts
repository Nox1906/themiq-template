import primitives from "../primitives";

const shadows = [
  "none", // 0
  "0px 1px 2px 0px rgba(21, 21, 21, 0.08)", // 1 xs
  "0px 1px 2px 0px rgba(21, 21, 21, 0.08), 0px 2px 4px 0px rgba(21, 21, 21, 0.08)", // 2 sm
  "0px 2px 8px -2px rgba(21, 21, 21, 0.08), 0px 6px 12px -2px rgba(21, 21, 21, 0.08)", // 3 md
  "0px 2px 8px -2px rgba(21, 21, 21, 0.08), 0px 12px 16px -4px rgba(21, 21, 21, 0.08)", // 4 lg
  "0px 2px 8px -2px rgba(21, 21, 21, 0.08), 0px 20px 24px -4px rgba(21, 21, 21, 0.08);", // 5 xl
  "0px 0px 4px 0px #0343B1", // 6 - focus
  `0px 0px 8px 0px ${primitives.blue[100]}`, // 7 - aiFocus
  `0px 0px 8px 0px ${primitives.stone[300]}`, // 8 - aiRevertFocus
  `0px 4px 8px -1px ${primitives.blackOpacity} inset`, // 9 - inset
  "0px 3px 0px 0px", // 10 - primaryPressShadow
  "0px -4px 0px 0px", // 11 - selectedTabShadow
  "0px 3px 0px 0px", // 12 - primaryGhostPressShadow
  "0px -4px 0px 0px", // 13 - selectedSecondaryTabShadow
];

export default shadows;
