import random

def improve_password(password):

    replacements = {
        "a": "@",
        "o": "0",
        "i": "1",
        "e": "3",
        "s": "$"
    }

    improved = ""

    for char in password:

        if char.lower() in replacements:
            improved += replacements[char.lower()]
        else:
            improved += char

    improved += str(random.randint(100,999))
    improved += "!"

    return improved