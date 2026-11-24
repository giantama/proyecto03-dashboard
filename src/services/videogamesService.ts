import { get, ref } from 'firebase/database';
import { db } from '../firebase/config';
import type { VideoGame } from '../types/VideoGame';

/** Ruta del nodo donde se importó el JSON del Sprint 1. */
const VIDEOGAMES_PATH = 'videogames';

/**
 * Consulta asíncrona: recupera todos los registros del nodo /videogames.
 * Firebase puede devolver un arreglo o un objeto indexado; ambos casos se normalizan a VideoGame[].
 */
export async function fetchVideoGames(): Promise<VideoGame[]> {
  const snapshot = await get(ref(db, VIDEOGAMES_PATH));
  if (!snapshot.exists()) return [];
  const value = snapshot.val() as VideoGame[] | Record<string, VideoGame>;
  const list = Array.isArray(value) ? value : Object.values(value);
  return list.filter(Boolean).sort((a, b) => b.Global_Sales - a.Global_Sales);
}
