import os
import shutil

def extract_questions_answers(filename):
    with open(filename, 'r', encoding='utf-8-sig') as file:  # Using utf-8-sig to handle BOM
        lines = file.readlines()
        
        questions = []
        current_question = ''
        for line in lines:
            if line.strip() and line.strip()[0].isdigit():
                if current_question:
                    questions.append(current_question.strip())
                current_question = line
            else:
                current_question += line
        if current_question:
            questions.append(current_question.strip())
            
        return questions

def create_question_files(questions, language):
    for idx, question in enumerate(questions, start=1):
        question_text = question.split('\n')[0].strip()
        language = language.removesuffix('.txt')
        with open(f'{language}_Question_{idx}.txt', 'w', encoding='utf-8') as file:
            file.write(question)

def move_files_to_folder():
    folder_name = 'german_french_all'
    if not os.path.exists(folder_name):
        os.makedirs(folder_name)
    
    for filename in ['german.txt', 'french.txt']:
        if os.path.exists(filename):
            shutil.move(filename, os.path.join(folder_name, filename))
            print(f"File '{filename}' moved to '{folder_name}' folder.")
        else:
            print(f"File '{filename}' not found.")

if __name__ == "__main__":
    move_files_to_folder()
    
    for filename in os.listdir('german_french_all'):
        if filename.endswith('.txt'):
            language = filename.split('_')[0].capitalize()
            questions = extract_questions_answers(os.path.join('german_french_all', filename))
            create_question_files(questions, language)
            print(f"Text files for each question in {language} have been created successfully.")
