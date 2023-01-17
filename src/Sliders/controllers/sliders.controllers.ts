import {
  borrarSlider,
  crearSlider,
  modificarSlider,
  obtenerSliders,
} from "../services/sliders.services.js";
import { Request, Response } from "express";
import { OK } from "../../httpCodes.js";
import ErrorHandler from "../../utils/ErrorHandler.js";
const { handleHttpError } = ErrorHandler;

export const obtenerTodosLosSliders = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;
    const sliders = await obtenerSliders(token);
    res.status(OK).json(sliders);
  } catch (error) {
    handleHttpError(error as Error, res);
  }
};

export const crearUnSlider = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const slider = await crearSlider(req.body, user.id);
    res.status(OK).json(slider);
  } catch (error) {
    handleHttpError(error as Error, res);
  }
};

export const modificarUnSlider = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const { id } = req.params;
    const slider = await modificarSlider(id, req.body, user.id);
    res.status(OK).json(slider);
  } catch (error) {
    handleHttpError(error as Error, res);
  }
};

export const borrarUnSlider = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const { id } = req.params;
    const borrado = await borrarSlider(id, user.id);
    res.status(OK).json(borrado);
  } catch (error) {
    handleHttpError(error as Error, res);
  }
};
