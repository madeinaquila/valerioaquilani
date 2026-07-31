"""
addfile.py
==========
Interfaccia a linea di comando (CLI) per spostare un singolo file dalla
cartella files/ alla sua sottocartella di competenza (audio, docs, images),
aggiornando il file recap.csv.

Uso da terminale:
    python addfile.py <nome_file>

Esempio:
    python addfile.py trump.jpeg
"""

import argparse
import os
import shutil
import csv

CARTELLA_FILES = "files"
RECAP_PATH = os.path.join(CARTELLA_FILES, "recap.csv")

# Stessa mappa estensione -> (tipo, sottocartella) usata nel notebook (Step 1)
MAPPA_TIPI = {
    ".mp3": ("audio", "audio"),
    ".txt": ("doc", "docs"),
    ".odt": ("doc", "docs"),
    ".jpg": ("image", "images"),
    ".jpeg": ("image", "images"),
    ".png": ("image", "images"),
}


def get_tipo_e_sottocartella(nome_file):
    """Restituisce la tupla (tipo, sottocartella) corrispondente all'estensione del file."""
    _, estensione = os.path.splitext(nome_file)
    return MAPPA_TIPI.get(estensione.lower(), ("other", "others"))


def aggiungi_a_recap(riga):
    """Aggiunge una riga al file recap.csv, creandolo con intestazione se non esiste.
    La riga viene sempre aggiunta (append), senza mai sovrascrivere il recap esistente."""
    file_esiste = os.path.isfile(RECAP_PATH)
    with open(RECAP_PATH, "a", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        if not file_esiste:
            writer.writerow(["name", "type", "size(B)"])
        writer.writerow(riga)


def sposta_file(nome_file):
    """Sposta il singolo file `nome_file` (che deve trovarsi in files/) nella
    sottocartella di competenza, aggiornando il recap. Se il file non esiste,
    lo comunica all'utente senza sollevare un errore."""
    percorso_sorgente = os.path.join(CARTELLA_FILES, nome_file)

    if not os.path.isfile(percorso_sorgente):
        print(f"Il file '{nome_file}' non esiste nella cartella '{CARTELLA_FILES}/'.")
        return

    nome_senza_estensione, _ = os.path.splitext(nome_file)
    dimensione = os.path.getsize(percorso_sorgente)
    tipo, sottocartella = get_tipo_e_sottocartella(nome_file)

    print(f"{nome_senza_estensione} type:{tipo} size:{dimensione}B")

    cartella_destinazione = os.path.join(CARTELLA_FILES, sottocartella)
    os.makedirs(cartella_destinazione, exist_ok=True)
    shutil.move(percorso_sorgente, os.path.join(cartella_destinazione, nome_file))

    aggiungi_a_recap([nome_senza_estensione, tipo, dimensione])


def parse_args():
    parser = argparse.ArgumentParser(
        description="Sposta un singolo file dalla cartella files/ alla sua sottocartella di competenza."
    )
    parser.add_argument(
        "nome_file",
        help="Nome del file da spostare, comprensivo di estensione (es: trump.jpeg)."
    )
    return parser.parse_args()


if __name__ == "__main__":
    args = parse_args()
    sposta_file(args.nome_file)
