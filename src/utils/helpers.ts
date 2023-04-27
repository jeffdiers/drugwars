import { Drugs, Areas } from "../store/player/player.types";

const getFirstLetter = (string: string) => Array.from(string)[0];

export const getDrugByKey = (key: string) => {
  if (key === getFirstLetter(Drugs.One)) return Drugs.One;
  if (key === getFirstLetter(Drugs.Two)) return Drugs.Two;
  if (key === getFirstLetter(Drugs.Three)) return Drugs.Three;
  if (key === getFirstLetter(Drugs.Four)) return Drugs.Four;
  if (key === getFirstLetter(Drugs.Five)) return Drugs.Five;
  if (key === getFirstLetter(Drugs.Six)) return Drugs.Six;
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

export const randomInteger = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
