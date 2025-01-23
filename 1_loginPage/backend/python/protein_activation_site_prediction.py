import sys
from transformers import AutoTokenizer, AutoModel
from Bio import SeqIO
import torch
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report

# Load ProtBERT model and tokenizer
model_name = "Rostlab/prot_bert"
tokenizer = AutoTokenizer.from_pretrained(model_name, do_lower_case=False)
model = AutoModel.from_pretrained(model_name)

# Function to extract embeddings for each residue
def extract_residue_embeddings(sequence):
    # Tokenize the sequence
    inputs = tokenizer(sequence, return_tensors="pt", truncation=True, max_length=1024)
    with torch.no_grad():
        outputs = model(**inputs)
    # Extract embeddings for each residue (ignore [CLS] and [SEP] tokens)
    embeddings = outputs.last_hidden_state.squeeze(0)[1:-1].numpy()
    return embeddings

# Load protein sequences and labels
def load_data(fasta_file, labels_file):
    sequences = []
    labels = []

    # Load sequences from the FASTA file
    for record in SeqIO.parse(fasta_file, "fasta"):
        sequences.append(str(record.seq))

    # Load labels from the labels file
    with open(labels_file, "r") as f:
        for line in f:
            labels.append(list(map(int, line.strip().split())))

    # Validate sequence and label lengths
    for i, (seq, lbl) in enumerate(zip(sequences, labels)):
        if len(seq) != len(lbl):
            raise ValueError(
                f"Mismatch: Sequence {i+1} has length {len(seq)} but labels have length {len(lbl)}"
            )

    return sequences, labels


# Main function
def main(fasta_file, labels_file):
    # Load dataset
    sequences, labels = load_data(fasta_file, labels_file)

    # Extract features and prepare residue-level data
    X = []
    y = []
    for seq, lbl in zip(sequences, labels):
        embeddings = extract_residue_embeddings(seq)  # Shape: (length, embedding_dim)
        X.extend(embeddings)  # Add each residue's embedding
        y.extend(lbl)         # Add corresponding labels

    X = np.array(X)
    y = np.array(y)

    # Train-test split for residue-level data
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Train a Random Forest classifier
    clf = RandomForestClassifier(n_estimators=100, random_state=42)
    clf.fit(X_train, y_train)

    # Evaluate the model
    y_pred = clf.predict(X_test)
    print(classification_report(y_test, y_pred, target_names=["Non-active site", "Active site"]))

    # Prediction on a new protein sequence
    test_sequence = "MKTLLILAVVLLLQHLLLTLPLALFSP"  # Example sequence
    active_site_predictions = predict_active_sites(test_sequence, clf)
    print(f"Active site predictions for the test sequence: {active_site_predictions}")

# Prediction function
def predict_active_sites(sequence, clf):
    embeddings = extract_residue_embeddings(sequence)
    predictions = clf.predict(embeddings)
    return predictions

# Run the script with command-line arguments
if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python script_name.py <FASTA_FILE> <LABELS_FILE>")
        sys.exit(1)

    fasta_file = sys.argv[1]  # First argument: FASTA file
    labels_file = sys.argv[2]  # Second argument: Labels file

    main(fasta_file, labels_file)
