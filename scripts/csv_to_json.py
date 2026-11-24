"""
Sprint 1 - Transformación de datos CSV a JSON
Dataset: Video Game Sales (Kaggle) - data/vgsales.csv
Salida:  data/vgsales.json  (estructura lista para importar en Firebase Realtime Database)

Uso:
    python scripts/csv_to_json.py
Solo usa la librería estándar de Python (csv, json), no requiere instalar nada.
"""
import csv
import json
import os

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CSV_PATH = os.path.join(BASE, "data", "vgsales.csv")
JSON_PATH = os.path.join(BASE, "data", "vgsales.json")

CATEGORICAS = ["Name", "Platform", "Genre", "Publisher"]
NUMERICAS = ["NA_Sales", "EU_Sales", "JP_Sales", "Other_Sales", "Global_Sales"]
VALORES_FALTANTES = {"", "N/A", "NA", "null", "None"}


def limpiar_texto(valor):
    """Quita espacios en blanco al inicio/fin y espacios dobles internos."""
    return " ".join(valor.split()) if valor is not None else ""


def a_numero(valor):
    """Convierte ventas a float (2 decimales). Valores inválidos -> 0.0."""
    try:
        return round(float(limpiar_texto(valor)), 2)
    except ValueError:
        return 0.0


def transformar():
    registros, descartados = [], []
    stats = {"leidos": 0, "publisher_faltante": 0, "year_faltante": 0, "textos_recortados": 0}

    with open(CSV_PATH, newline="", encoding="utf-8") as f:
        for fila in csv.DictReader(f):
            stats["leidos"] += 1

            # Variables categóricas -> cadenas sin espacios sobrantes
            reg = {}
            for col in CATEGORICAS:
                original = fila.get(col) or ""
                limpio = limpiar_texto(original)
                if limpio != original:
                    stats["textos_recortados"] += 1
                if limpio in VALORES_FALTANTES:
                    if col == "Publisher":
                        stats["publisher_faltante"] += 1
                    limpio = "Unknown"
                reg[col] = limpio

            # Variable temporal -> año entero + fecha ISO 8601 consistente (YYYY-MM-DD)
            year_txt = limpiar_texto(fila.get("Year"))
            if year_txt in VALORES_FALTANTES:
                stats["year_faltante"] += 1
                descartados.append(fila.get("Name"))
                continue  # sin año no se puede ubicar en la serie temporal
            year = int(float(year_txt))
            reg["Year"] = year
            reg["Release_Date"] = f"{year:04d}-01-01"

            # Variables numéricas -> number
            for col in NUMERICAS:
                reg[col] = a_numero(fila.get(col))

            reg["Rank"] = int(fila["Rank"])
            registros.append(reg)

    # Id secuencial para Firebase y orden por ranking
    registros.sort(key=lambda r: r["Rank"])
    for i, r in enumerate(registros):
        r["id"] = i

    salida = {"videogames": registros}
    with open(JSON_PATH, "w", encoding="utf-8") as f:
        json.dump(salida, f, ensure_ascii=False, indent=2)

    return registros, descartados, stats


def validar(registros):
    """Valida estructura y tipos del JSON generado."""
    with open(JSON_PATH, encoding="utf-8") as f:
        data = json.load(f)  # falla si el JSON no es válido
    items = data["videogames"]
    assert len(items) == len(registros), "Cantidad de registros no coincide"
    claves = set(CATEGORICAS + NUMERICAS + ["Year", "Release_Date", "Rank", "id"])
    for r in items:
        assert set(r.keys()) == claves, f"Claves inesperadas en {r}"
        for c in CATEGORICAS:
            assert isinstance(r[c], str) and r[c] and r[c] == r[c].strip()
        for c in NUMERICAS:
            assert isinstance(r[c], (int, float)) and r[c] >= 0
        assert isinstance(r["Year"], int) and 1970 <= r["Year"] <= 2025
        assert r["Release_Date"] == f"{r['Year']}-01-01"
    return len(items)


if __name__ == "__main__":
    registros, descartados, stats = transformar()
    total = validar(registros)
    print("=== Transformación CSV -> JSON ===")
    print(f"Registros leídos del CSV:        {stats['leidos']}")
    print(f"Registros sin año (descartados): {stats['year_faltante']}")
    print(f"Publisher faltante -> 'Unknown': {stats['publisher_faltante']}")
    print(f"Textos con espacios corregidos:  {stats['textos_recortados']}")
    print(f"Registros escritos en el JSON:   {total}")
    print(f"Ventas globales totales:         {sum(r['Global_Sales'] for r in registros):.2f} M")
    print(f"Archivo generado: {JSON_PATH}")
    print("Validación: OK (JSON válido, tipos y claves correctos)")
