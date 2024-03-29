import csv

# Define the input CSV file name
input_file = "file.csv"

# Define the output file names
german_output_file = "german.txt"
french_output_file = "french.txt"

# Open the CSV file and create the output files
with open(input_file, 'r', newline='', encoding='utf-8') as csvfile, \
     open(german_output_file, 'w', encoding='utf-8') as german_file, \
     open(french_output_file, 'w', encoding='utf-8') as french_file:
    
    # Create CSV reader
    reader = csv.reader(csvfile, delimiter=';')
    
    # Iterate over each row in the CSV file
    for row in reader:
        # Check if row has at least two columns
        if len(row) >= 2:
            # Write the first column to the German file
            german_file.write(row[0] + '\n')
            
            # Write the second column to the French file
            french_file.write(row[1] + '\n')

print("Files created successfully!")
