import { Drugs, Areas } from "../store/player/player.slice";

export const getDrugByKey = (key: string) => {
  if (key === "c") return Drugs.Cocaine;
  if (key === "h") return Drugs.Heroin;
  if (key === "a") return Drugs.Acid;
  if (key === "w") return Drugs.Weed;
  if (key === "s") return Drugs.Speed;
  if (key === "l") return Drugs.Ludes;
  return undefined;
};

export const getAreaByKey = (key: string) => {
  if (key === "1") return Areas.Bronx;
  if (key === "2") return Areas.Ghetto;
  if (key === "3") return Areas.CentralPark;
  if (key === "4") return Areas.Manhattan;
  if (key === "5") return Areas.ConeyIsland;
  if (key === "6") return Areas.Brooklyn;
  return undefined;
};
