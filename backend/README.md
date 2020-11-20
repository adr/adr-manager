# Backend server
### Virtualenv/Pipenv
- Get pipenv: `pip3 install --user pipenv` possibly replace `pip3` with `pip`
- Clone this repo and install dependencies.

```console
git clone [this_repo]
# cd into the repo
# cd into the backend folder
pipenv install
# open a shell with pipenv
pipenv shell
```

### Run server
```
# Still in backend folder
python main.py
```

### Deactivate virtual environment and server
1. ` exit` or CTRL-d to deactivate the virtual environment
2. CTRL-c to close the server

### Install library 
```
pipenv install <libraryName>
```
