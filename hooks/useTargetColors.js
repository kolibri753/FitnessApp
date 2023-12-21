import { targetColors} from "../styles/colors";

export const useTargetColors = () => {

  const getColorForTarget = (target) => {
    return targetColors[target] || "yellow";
  };

  return { getColorForTarget };
};
