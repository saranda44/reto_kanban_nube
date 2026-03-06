//validar estatus y formato de fecha
import { Request, Response } from "express";
const VALID_STATUS = new Set(["backlog", "doing", "done"]);
const ISO_8601_UTC_REGEX = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/;

type CardStatus = "backlog" | "doing" | "done";

type Card = {
  id: string;
  titulo: string;
  descripcion: string;
  fecha_limite: string;
  fecha_creado: string;
  estado: CardStatus;
};

function isValidIso8601Utc(value: string) {
  if (!ISO_8601_UTC_REGEX.test(value)) {
    return false;
  }

  const date = new Date(value);
  return !Number.isNaN(date.getTime());
}

function validateCreateRequest(body: any) {
  const requiredFields = [
    "titulo",
    "descripcion",
    "fecha_limite",
    "fecha_creado",
    "estado",
  ];

  for (const field of requiredFields) {
    if (!(field in body)) {
      return `El campo '${field}' es obligatorio.`;
    }
  }

  const titulo = body.titulo;
  const descripcion = body.descripcion;
  const fechaLimite = body.fecha_limite;
  const fechaCreado = body.fecha_creado;
  const estado = body.estado;

  if (typeof titulo !== "string" || titulo.length === 0 || titulo.length > 50) {
    return "'titulo' debe ser un texto de 1 a 50 caracteres.";
  }

  if (
    typeof descripcion !== "string" ||
    descripcion.length === 0 ||
    descripcion.length > 500
  ) {
    return "'descripcion' debe ser un texto de 1 a 500 caracteres.";
  }

  if (!isValidIso8601Utc(fechaLimite)) {
    return "'fecha_limite' debe estar en formato ISO 8601 UTC (YYYY-MM-DDTHH:MM:SSZ).";
  }

  if (!isValidIso8601Utc(fechaCreado)) {
    return "'fecha_creado' debe estar en formato ISO 8601 UTC (YYYY-MM-DDTHH:MM:SSZ).";
  }

  if (typeof estado !== "string" || !VALID_STATUS.has(estado)) {
    return "'estado' debe ser uno de: backlog, doing, done.";
  }

  return null;
}

async function createCard(req: Request, res: Response): {

  let validationError = validateCreateRequest(req.body);
  if (validationError) {
    return res.status(400).json({ message: validationError });
  }

  const card: Card = {
    titulo: req.body.titulo as string,
    descripcion: req.body.descripcion as string,
    fecha_limite: req.body.fecha_limite as string,
    fecha_creado: req.body.fecha_creado as string,
    estado: req.body.estado as CardStatus,
  };

  return res.status(201).json({ message: "Card creada correctamente.", card });
}
