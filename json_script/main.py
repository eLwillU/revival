import subprocess

def run_command(command):
    try:
        subprocess.run(command, shell=True, check=True)
    except subprocess.CalledProcessError as e:
        print(f"Error running command: {e}")

def main():
    commands_to_run = [
        "python script.py",     # Python command
        "python script2.py",    # Python command
        "node readtxt.js",     # Node command
        "node parsejson.js"     # Node comman
    ]
    
    for command in commands_to_run:
        print(f"Running command: {command}")
        run_command(command)

if __name__ == "__main__":
    main()
